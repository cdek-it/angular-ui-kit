import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective,
  ExtraGalleriaCaptionDirective
} from '../../../../lib/components/galleria/galleria.component';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-caption',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective, ExtraGalleriaCaptionDirective],
  template: `
    <extra-galleria
      [value]="images"
      [numVisible]="4"
      [showItemNavigators]="true"
      [showThumbnails]="false"
      [showIndicators]="true"
      [circular]="true"
      [containerStyle]="{ 'max-width': '800px' }"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template extraGalleriaCaption let-item>
        <div style="padding: 12px 16px;">
          <h4 style="margin: 0 0 4px; color: inherit;">{{ item.title }}</h4>
          <p style="margin: 0; opacity: 0.8; font-size: 0.875rem;">{{ item.description }}</p>
        </div>
      </ng-template>
    </extra-galleria>
  `
})
export class GalleriaCaptionComponent {
  readonly images = GALLERIA_IMAGES;
}
