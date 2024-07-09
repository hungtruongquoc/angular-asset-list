import {Directive, ElementRef, Input, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appToggleIcon]',
  standalone: true
})
export class ToggleIconDirective {
  @Input() isShow: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isShow']) {
      this.updateVisibility();
    }
  }

  private updateVisibility(): void {
    if (this.isShow) {
      this.renderer.removeClass(this.el.nativeElement, 'hidden-icon');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'hidden-icon');
    }
  }
}
