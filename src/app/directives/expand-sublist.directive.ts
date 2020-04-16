import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appExpandSublist]'
})
export class ExpandSublistDirective implements OnInit {
  private subList: HTMLElement;
  @HostListener('mouseenter') expandSublist() {
    this.subList.classList.add('expand');
  }

  @HostListener('mouseleave') retractSublist() {
    this.subList.classList.remove('expand');
  }
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.subList = this.elementRef.nativeElement.querySelector('.sublist');
  }

}
