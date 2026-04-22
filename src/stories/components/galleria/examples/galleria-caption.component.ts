import { Component } from '@angular/core';
import { GalleriaComponent } from '../../../../lib/components/galleria/galleria.component';
import { PrimeTemplate } from 'primeng/api';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-caption',
  standalone: true,
  imports: [GalleriaComponent, PrimeTemplate],
  template: `
    <galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showThumbnails]="false"
      [showIndicators]="true"
      [circular]="true"
      style="max-width: 800px; display: block;"
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
    </galleria>
  `,
})
export class GalleriaCaptionComponent {
  readonly images = GALLERIA_IMAGES;
}
