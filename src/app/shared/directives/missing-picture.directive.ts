import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'img[appMissingPicture]',
  standalone: true,
})
export class ImgMissingDirective {
  private el = inject<ElementRef<HTMLImageElement>>(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('error')
  private onError(): void {
    this.renderer.removeAttribute(this.el.nativeElement, 'srcset');
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      './assets/images/not-image.png'
    );
  }
}
