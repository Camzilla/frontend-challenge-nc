import { AfterViewInit, Directive, ElementRef, HostBinding, NgZone, Renderer2 } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'

@Directive({
  selector: '[dynamicFontSize]',
  standalone: true,
})
export class DynamicFontSizeDirective implements AfterViewInit {
  @HostBinding('class') elementClass = 'dynamic-font-size__text'

  parentEl: HTMLElement | null
  textEl: HTMLElement
  wrapperElement!: HTMLElement

  public constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
  ) {
    this.textEl = this.elementRef.nativeElement
    this.parentEl = this.textEl.parentElement

    // setup wrapper and add classes
    this.setupDynamicFontSizeDirective()
  }

  ngAfterViewInit() {
    const initialFont = parseInt(this.textEl.style.fontSize)
    let i = 0

    combineLatest([
      this.createResizeListener(this.textEl),
      this.createResizeListener(this.wrapperElement),
    ]).subscribe(([text, parent]) => {
      window.requestAnimationFrame(() => {
        this.ngZone.run(() => {
          const textWidth = Math.round(text.contentRect.width)
          const tolerance = 20
          const fontSize = initialFont + i

          textWidth + tolerance < parent.contentRect.width ? i++ : i--

          this.textEl.style.fontSize = `${fontSize - 1}px`
        })
      })
    })
  }

  setupDynamicFontSizeDirective() {
    this.wrapperElement = this.renderer.createElement('div')
    this.renderer.setStyle(this.textEl, 'fontSize', '30px')
    this.renderer.appendChild(this.textEl, this.wrapperElement)
    this.renderer.addClass(this.wrapperElement, 'dynamic-font-size')
    this.renderer.insertBefore(this.parentEl, this.wrapperElement, this.textEl)
    this.renderer.appendChild(this.wrapperElement, this.textEl)
  }

  createResizeListener(element: HTMLElement): Observable<ResizeObserverEntry> {
    return new Observable<ResizeObserverEntry>(subscriber => {
      var elementResizeListener = new ResizeObserver(entries => {
        subscriber.next(entries[0])
      })

      return elementResizeListener.observe(element)
    })
  }
}
