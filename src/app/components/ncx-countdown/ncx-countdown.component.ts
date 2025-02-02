import { Component, signal, WritableSignal } from '@angular/core'
import { NcxFormControlComponent } from '../shared/ncx-form-control/ncx-form-control.component'
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, filter, map, startWith, takeUntil } from 'rxjs/operators'
import { CommonModule, formatDate } from '@angular/common'
import { interval, Subject } from 'rxjs'

import { TimeConverterService } from '../../services/time-converter.service'
import { LocalStorageService } from './../../services/local-storage.service'
import { DynamicFontSizeDirective } from '../../utils/dynamic-font-size.directive'

export interface CountdownData {
  title?: string
  countdownDate?: string
}

@Component({
  selector: 'ncx-countdown',
  standalone: true,
  imports: [CommonModule, NcxFormControlComponent, ReactiveFormsModule, DynamicFontSizeDirective],
  templateUrl: './ncx-countdown.component.html',
  styleUrl: './ncx-countdown.component.scss',
})
export class NcxCountdownComponent {
  timerTitle$: WritableSignal<string | undefined> = signal(undefined)
  timerText$: WritableSignal<string | undefined> = signal(undefined)

  resetCountdown$ = new Subject<void>()

  defaultTitle = 'Midsummer eve'
  defaultTimerDate = new Date('2025-6-21')

  savedCountdownData: CountdownData
  currentDateTime = Date.now()
  currentCountdownTarget!: Date

  countdownForm = new FormGroup({
    title: new FormControl<string | undefined>(undefined),
    date: new FormControl<Date | undefined>(undefined),
  })

  constructor(
    private ls: LocalStorageService,
    private timeConverterService: TimeConverterService,
  ) {
    this.savedCountdownData = {
      title: this.ls.getItem(this.ls.countdownTitleKey) || undefined,
      countdownDate: this.ls.getItem(this.ls.countdownDateKey) || undefined,
    }

    this.setupFromSavedValues()
    this.startCountDown(this.currentCountdownTarget)
  }

  ngOnInit(): void {
    // watch title input changes
    this.titleFormControl.valueChanges.pipe(debounceTime(100)).subscribe(title => {
      const tTitle = title.trim()
      this.timerTitle$.set(tTitle ? tTitle : this.defaultTitle)
      this.titleFormControl.setValue(tTitle)
      this.ls.setItem(this.ls.countdownTitleKey, tTitle)
    })

    // watch date input changes
    this.dateFormControl.valueChanges
      .pipe(
        debounceTime(700),
        map(date => new Date(date)),
        filter(date => date.getTime() !== this.currentCountdownTarget.getTime()),
      )
      .subscribe(date => {
        const validDate = !isNaN(date.getTime())
        this.ls.setItem(
          this.ls.countdownDateKey,
          validDate ? formatDate(date, 'yyyy-MM-dd', 'en') : '',
        )
        this.updateCountdown(validDate ? date : this.defaultTimerDate)
      })
  }

  get titleFormControl() {
    return this.countdownForm.get('title') as FormControl
  }

  get dateFormControl() {
    return this.countdownForm.get('date') as FormControl
  }

  setupFromSavedValues(): void {
    // setup title
    this.titleFormControl.setValue(this.savedCountdownData.title)
    this.timerTitle$.set(this.savedCountdownData.title || this.defaultTitle)

    // setup date
    if (this.savedCountdownData.countdownDate) {
      const formControlDate = formatDate(this.savedCountdownData.countdownDate, 'yyyy-MM-dd', 'en')
      this.currentCountdownTarget = new Date(formControlDate)
      this.dateFormControl.setValue(formControlDate)
    } else {
      this.currentCountdownTarget = this.defaultTimerDate
    }
  }

  startCountDown(targetDate: Date): void {
    interval(1000)
      .pipe(startWith(0), takeUntil(this.resetCountdown$))
      .subscribe(() => {
        const now = Date.now()
        const timeDiffFuture = targetDate.getTime() - now
        const timeDiffPast = targetDate.getTime() + now
        const isFuture = targetDate.getTime() > now
        this.timerText$.set(
          this.timeConverterService.toPrettyDisplayString(isFuture ? timeDiffFuture : timeDiffPast),
        )
      })
  }

  updateCountdown(updatedDate: Date): void {
    this.resetCountdown$.next()
    this.startCountDown(updatedDate)
  }
}
