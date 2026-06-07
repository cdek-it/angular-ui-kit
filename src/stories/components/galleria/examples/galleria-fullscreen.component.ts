import { Component } from '@angular/core';
import {
  ExtraGalleriaComponent,
  ExtraGalleriaItemDirective,
  ExtraGalleriaThumbnailDirective
} from '../../../../lib/components/galleria/galleria.component';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-fullscreen',
  standalone: true,
  imports: [ExtraGalleriaComponent, ExtraGalleriaItemDirective, ExtraGalleriaThumbnailDirective],
  template: `
    <button label="Открыть галерею" (click)="visible = true"></button>

    <extra-galleria
      [value]="images"
      [numVisible]="4"
      [showItemNavigators]="true"
      [showThumbnails]="true"
      [circular]="true"
      [fullScreen]="true"
      [visible]="visible"
      (visibleChange)="visible = $event"
    >
      <ng-template extraGalleriaItem let-item>
        <img [src]="item.itemImageSrc" [alt]="item.alt" style="width: 100%; display: block;" />
      </ng-template>
      <ng-template extraGalleriaThumbnail let-item>
        <img [src]="item.thumbnailImageSrc" [alt]="item.alt" style="display: block;" />
      </ng-template>
    </extra-galleria>
  `
})
export class GalleriaFullscreenComponent {
  readonly images = GALLERIA_IMAGES;
  visible = false;
}
