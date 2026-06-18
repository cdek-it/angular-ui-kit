import { Component, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { PrimeTemplate } from 'primeng/api';

export interface ExtraGalleriaItem {
  itemImageSrc: string;
  thumbnailImageSrc?: string;
  alt?: string;
  title?: string;
  description?: string;
}

@Directive({ selector: '[extraGalleriaItem]', standalone: true })
export class ExtraGalleriaItemDirective {}

@Directive({ selector: '[extraGalleriaThumbnail]', standalone: true })
export class ExtraGalleriaThumbnailDirective {}

@Directive({ selector: '[extraGalleriaCaption]', standalone: true })
export class ExtraGalleriaCaptionDirective {}

@Directive({ selector: '[extraGalleriaIndicator]', standalone: true })
export class ExtraGalleriaIndicatorDirective {}

@Directive({ selector: '[extraGalleriaHeader]', standalone: true })
export class ExtraGalleriaHeaderDirective {}

@Directive({ selector: '[extraGalleriaFooter]', standalone: true })
export class ExtraGalleriaFooterDirective {}

@Component({
  selector: 'extra-galleria',
  standalone: true,
  imports: [CommonModule, GalleriaModule, PrimeTemplate],
  host: { style: 'display: contents' },
  template: `
    <p-galleria
      [value]="value"
      [numVisible]="numVisible"
      [showItemNavigators]="showItemNavigators"
      [showItemNavigatorsOnHover]="showItemNavigatorsOnHover"
      [showThumbnails]="showThumbnails"
      [showThumbnailNavigators]="showThumbnailNavigators"
      [showIndicators]="showIndicators"
      [showIndicatorsOnItem]="showIndicatorsOnItem"
      [circular]="circular"
      [autoPlay]="autoPlay"
      [transitionInterval]="transitionInterval"
      [fullScreen]="fullScreen"
      [visible]="visible"
      [containerClass]="containerClass"
      [containerStyle]="containerStyle"
      [responsiveOptions]="responsiveOptions"
      (activeIndexChange)="activeIndexChange.emit($event)"
      (visibleChange)="visibleChange.emit($event)"
    >
      <ng-template pTemplate="item" let-item>
        @if (itemTemplate) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        }
      </ng-template>
      <ng-template pTemplate="thumbnail" let-item>
        @if (thumbnailTemplate) {
          <ng-container
            [ngTemplateOutlet]="thumbnailTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        }
      </ng-template>
      <ng-template pTemplate="caption" let-item>
        @if (captionTemplate) {
          <ng-container
            [ngTemplateOutlet]="captionTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        }
      </ng-template>
      <ng-template pTemplate="indicator" let-item>
        @if (indicatorTemplate) {
          <ng-container
            [ngTemplateOutlet]="indicatorTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        }
      </ng-template>
      <ng-template pTemplate="header">
        @if (headerTemplate) {
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        }
      </ng-template>
      <ng-template pTemplate="footer">
        @if (footerTemplate) {
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        }
      </ng-template>
    </p-galleria>
  `
})
export class ExtraGalleriaComponent {
  @Input() value: ExtraGalleriaItem[] = [];
  @Input() numVisible = 3;
  @Input() showItemNavigators = false;
  @Input() showItemNavigatorsOnHover = false;
  @Input() showThumbnails = true;
  @Input() showThumbnailNavigators = true;
  @Input() showIndicators = false;
  @Input() showIndicatorsOnItem = false;
  @Input() circular = false;
  @Input() autoPlay = false;
  @Input() transitionInterval = 4000;
  @Input() fullScreen = false;
  @Input() visible = false;
  @Input() containerClass: string | undefined = undefined;
  @Input() containerStyle: Record<string, string> | undefined = undefined;
  @Input() responsiveOptions: any[] | undefined = undefined;

  @ContentChild(ExtraGalleriaItemDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraGalleriaThumbnailDirective, { read: TemplateRef }) thumbnailTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraGalleriaCaptionDirective, { read: TemplateRef }) captionTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraGalleriaIndicatorDirective, { read: TemplateRef }) indicatorTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraGalleriaHeaderDirective, { read: TemplateRef }) headerTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraGalleriaFooterDirective, { read: TemplateRef }) footerTemplate: TemplateRef<any> | null = null;

  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() visibleChange = new EventEmitter<boolean>();
}
