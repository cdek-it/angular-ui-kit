import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective
} from '../../../../lib/components/galleria/galleria.component';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-autoplay',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective],
  template: `
    <extra-galleria
      [value]="images"
      [numVisible]="4"
      [showItemNavigators]="true"
      [showIndicators]="true"
      [showThumbnails]="false"
      [circular]="true"
      [autoPlay]="true"
      [transitionInterval]="3000"
      [containerStyle]="{ 'max-width': '800px' }"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
    </extra-galleria>
  `
})
export class GalleriaAutoplayComponent {
  readonly images = GALLERIA_IMAGES;
}
