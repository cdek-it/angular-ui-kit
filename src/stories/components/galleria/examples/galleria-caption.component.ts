import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PrimeTemplate } from 'primeng/api';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-caption',
  standalone: true,
  imports: [GalleriaModule, PrimeTemplate],
  template: `
    <p-galleria
      [value]="images"
      [numVisible]="4"
      [showItemNavigators]="true"
      [showThumbnails]="false"
      [showIndicators]="true"
      [circular]="true"
      [containerStyle]="{ 'max-width': '800px' }"
    >
      <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template pTemplate="caption" let-item>
        <div style="padding: 12px 16px;">
          <h4 style="margin: 0 0 4px; color: inherit;">{{ item.title }}</h4>
          <p style="margin: 0; opacity: 0.8; font-size: 0.875rem;">{{ item.description }}</p>
        </div>
      </ng-template>
    </p-galleria>
  `,
})
export class GalleriaCaptionComponent {
  readonly images = GALLERIA_IMAGES;
}
