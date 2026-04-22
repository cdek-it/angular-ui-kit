import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

export interface GalleriaItem {
  itemImageSrc: string;
  thumbnailImageSrc?: string;
  alt?: string;
  title?: string;
  description?: string;
}

@Component({
  selector: 'galleria',
  standalone: true,
  imports: [GalleriaModule],
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
      <ng-content></ng-content>
    </p-galleria>
  `,
})
export class GalleriaComponent {
  @Input() value: GalleriaItem[] = [];
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

  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() visibleChange = new EventEmitter<boolean>();
}
