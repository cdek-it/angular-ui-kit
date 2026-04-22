import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { PrimeTemplate } from 'primeng/api';
import { GALLERIA_IMAGES } from './galleria-default.component';

@Component({
  selector: 'app-galleria-fullscreen',
  standalone: true,
  imports: [GalleriaModule, ButtonComponent, PrimeTemplate],
  template: `
    <button label="Открыть галерею" (click)="visible = true"></button>

    <p-galleria
      [value]="images"
      [numVisible]="4"
      [showItemNavigators]="true"
      [showThumbnails]="true"
      [circular]="true"
      [fullScreen]="true"
      [visible]="visible"
      (visibleChange)="visible = $event"
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
export class GalleriaFullscreenComponent {
  readonly images = GALLERIA_IMAGES;
  visible = false;
}
