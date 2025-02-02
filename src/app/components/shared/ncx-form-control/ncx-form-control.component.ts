import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'ncx-form-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ncx-form-control.component.html',
  styleUrl: './ncx-form-control.component.scss',
})
export class NcxFormControlComponent {
  @Input({ required: true }) countdownControl: FormControl = new FormControl()
  @Input() placeholder?: string = ''
  @Input() label?: string
  @Input() type?: 'text' | 'date' = 'text'
  @Input() min?: string
}
