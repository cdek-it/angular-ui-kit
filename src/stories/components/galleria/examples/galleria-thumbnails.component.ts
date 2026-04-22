import { Component } from '@angular/core';
import { GalleriaComponent } from '../../../../lib/components/galleria/galleria.component';
import { PrimeTemplate } from 'primeng/api';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-thumbnails',
  standalone: true,
  imports: [GalleriaComponent, PrimeTemplate],
  template: `
    <galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showThumbnails]="true"
      [showIndicators]="false"
      [circular]="true"
      style="max-width: 800px; display: block;"
    >
      <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template pTemplate="thumbnail" let-item>
        <img [src]="item.thumbnailImageSrc" [alt]="item.alt" style="display: block;" />
      </ng-template>
    </galleria>
  `,
})
export class GalleriaThumbnailsComponent {
  readonly images = GALLERIA_IMAGES;
}
