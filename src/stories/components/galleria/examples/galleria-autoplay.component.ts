import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { PrimeTemplate } from 'primeng/api';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-autoplay',
  standalone: true,
  imports: [GalleriaModule, PrimeTemplate],
  template: `
    <p-galleria
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
      <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
    </p-galleria>
  `,
})
export class GalleriaAutoplayComponent {
  readonly images = GALLERIA_IMAGES;
}
