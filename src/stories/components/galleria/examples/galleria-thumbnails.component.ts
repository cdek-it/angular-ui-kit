import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PrimeTemplate } from 'primeng/api';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-thumbnails',
  standalone: true,
  imports: [GalleriaModule, PrimeTemplate],
  template: `
    <p-galleria
      [value]="images"
      [numVisible]="4"
      [showItemNavigators]="true"
      [showThumbnails]="true"
      [showIndicators]="false"
      [circular]="true"
      [containerStyle]="{ 'max-width': '800px' }"
    >
      <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template pTemplate="thumbnail" let-item>
        <img [src]="item.thumbnailImageSrc" [alt]="item.alt" style="display: block;" />
      </ng-template>
    </p-galleria>
  `,
})
export class GalleriaThumbnailsComponent {
  readonly images = GALLERIA_IMAGES;
}
