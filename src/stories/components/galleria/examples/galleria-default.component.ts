import { Component } from '@angular/core';
import { GalleriaComponent, GalleriaItem } from '../../../../lib/components/galleria/galleria.component';
import { PrimeTemplate } from 'primeng/api';

export const GALLERIA_IMAGES: GalleriaItem[] = [
  { itemImageSrc: 'assets/images/galleria/01.png', thumbnailImageSrc: 'assets/images/galleria/01.png', alt: 'СДЭК 1', title: 'Доставка', description: 'Надёжная доставка по всей России' },
  { itemImageSrc: 'assets/images/galleria/02.png', thumbnailImageSrc: 'assets/images/galleria/02.png', alt: 'СДЭК 2', title: 'Логистика', description: 'Современные логистические решения' },
  { itemImageSrc: 'assets/images/galleria/03.png', thumbnailImageSrc: 'assets/images/galleria/03.png', alt: 'СДЭК 3', title: 'Сервис', description: 'Качественный клиентский сервис' },
  { itemImageSrc: 'assets/images/galleria/04.png', thumbnailImageSrc: 'assets/images/galleria/04.png', alt: 'СДЭК 4', title: 'Технологии', description: 'Инновационные технологии доставки' },
];

@Component({
  selector: 'app-galleria-default',
  standalone: true,
  imports: [GalleriaComponent, PrimeTemplate],
  template: `
    <galleria
      [value]="images"
      [numVisible]="5"
      [showItemNavigators]="true"
      [showIndicators]="true"
      [showThumbnails]="false"
      [circular]="true"
      style="max-width: 800px; display: block;"
    >
      <ng-template pTemplate="item" let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
    </galleria>
  `,
})
export class GalleriaDefaultComponent {
  readonly images = GALLERIA_IMAGES;
}
