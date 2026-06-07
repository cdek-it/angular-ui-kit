import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective,
  GalleriaItem
} from '../../../../lib/components/galleria/galleria.component';

export const GALLERIA_IMAGES: GalleriaItem[] = [
  {
    itemImageSrc: '/assets/images/galleria/01.png',
    thumbnailImageSrc: '/assets/images/galleria/01.png',
    alt: 'СДЭК 1',
    title: 'Доставка',
    description: 'Надёжная доставка по всей России'
  },
  {
    itemImageSrc: '/assets/images/galleria/02.png',
    thumbnailImageSrc: '/assets/images/galleria/02.png',
    alt: 'СДЭК 2',
    title: 'Логистика',
    description: 'Современные логистические решения'
  },
  {
    itemImageSrc: '/assets/images/galleria/03.png',
    thumbnailImageSrc: '/assets/images/galleria/03.png',
    alt: 'СДЭК 3',
    title: 'Сервис',
    description: 'Качественный клиентский сервис'
  },
  {
    itemImageSrc: '/assets/images/galleria/04.png',
    thumbnailImageSrc: '/assets/images/galleria/04.png',
    alt: 'СДЭК 4',
    title: 'Технологии',
    description: 'Инновационные технологии доставки'
  }
];

@Component({
  selector: 'app-galleria-default',
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
      [containerStyle]="{ 'max-width': '800px' }"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
    </extra-galleria>
  `
})
export class GalleriaDefaultComponent {
  readonly images = GALLERIA_IMAGES;
}
