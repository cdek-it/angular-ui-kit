import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaFooterDirective,
  ExtraGalleriaHeaderDirective,
  ExtraGalleriaIndicatorDirective,
  ExtraGalleriaItemDirective
} from '../../../../lib/components/galleria/galleria.component';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-indicator',
  standalone: true,
  imports: [
    ExtraGalleriaComponent,
    ExtraGalleriaItemDirective,
    ExtraGalleriaIndicatorDirective,
    ExtraGalleriaHeaderDirective,
    ExtraGalleriaFooterDirective
  ],
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
      <ng-template extraGalleriaHeader>
        <div class="flex items-center justify-between p-3">
          <span class="font-bold">Галерея СДЭК</span>
        </div>
      </ng-template>

      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>

      <ng-template extraGalleriaIndicator let-index>
        <span
          style="display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff;"
        ></span>
      </ng-template>

      <ng-template extraGalleriaFooter>
        <div class="p-3 text-center text-sm" style="color: #fff;">Переключайте изображения стрелками навигации</div>
      </ng-template>
    </extra-galleria>
  `
})
export class GalleriaIndicatorComponent {
  readonly images = GALLERIA_IMAGES;
}
