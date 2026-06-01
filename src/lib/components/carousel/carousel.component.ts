import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import type { CarouselPageEvent, CarouselResponsiveOptions } from 'primeng/types/carousel';

export type CarouselOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [Carousel, NgTemplateOutlet, PrimeTemplate],
  template: `
    <p-carousel
      [value]="value"
      [numVisible]="numVisible"
      [numScroll]="numScroll"
      [circular]="circular"
      [orientation]="orientation"
      [autoplayInterval]="autoplayInterval"
      [showIndicators]="showIndicators"
      [showNavigators]="showNavigators"
      [page]="page"
      [responsiveOptions]="responsiveOptions"
      [verticalViewPortHeight]="verticalViewPortHeight"
      (onPage)="onPage.emit($event)"
    >
      @if (itemTemplate) {
        <ng-template pTemplate="item" let-data>
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: data }"
          ></ng-container>
        </ng-template>
      }
      @if (headerTemplate) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        </ng-template>
      }
      @if (footerTemplate) {
        <ng-template pTemplate="footer">
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        </ng-template>
      }
    </p-carousel>
  `
})
export class CarouselComponent {
  @Input() value: any[] = [];
  @Input() numVisible = 1;
  @Input() numScroll = 1;
  @Input() circular = false;
  @Input() orientation: CarouselOrientation = 'horizontal';
  @Input() autoplayInterval = 0;
  @Input() showIndicators = true;
  @Input() showNavigators = true;
  @Input() page = 0;
  @Input() responsiveOptions: CarouselResponsiveOptions[] | undefined;
  @Input() verticalViewPortHeight = '300px';
  @Input() itemTemplate: TemplateRef<any> | null = null;
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() footerTemplate: TemplateRef<any> | null = null;
  @Output() onPage = new EventEmitter<CarouselPageEvent>();
}
