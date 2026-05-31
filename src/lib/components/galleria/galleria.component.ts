import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { Galleria, GalleriaModule } from 'primeng/galleria';
import { PrimeTemplate } from 'primeng/api';

export interface GalleriaItem {
  itemImageSrc: string;
  thumbnailImageSrc?: string;
  alt?: string;
  title?: string;
  description?: string;
}

@Component({
  selector: 'galleria',
  standalone: true,
  imports: [GalleriaModule],
  host: { style: 'display: contents' },
  template: `
    <p-galleria
      [value]="value"
      [numVisible]="numVisible"
      [showItemNavigators]="showItemNavigators"
      [showItemNavigatorsOnHover]="showItemNavigatorsOnHover"
      [showThumbnails]="showThumbnails"
      [showThumbnailNavigators]="showThumbnailNavigators"
      [showIndicators]="showIndicators"
      [showIndicatorsOnItem]="showIndicatorsOnItem"
      [circular]="circular"
      [autoPlay]="autoPlay"
      [transitionInterval]="transitionInterval"
      [fullScreen]="fullScreen"
      [visible]="visible"
      [containerClass]="containerClass"
      [containerStyle]="containerStyle"
      [responsiveOptions]="responsiveOptions"
      (activeIndexChange)="activeIndexChange.emit($event)"
      (visibleChange)="visibleChange.emit($event)"
    ></p-galleria>
  `
})
export class GalleriaComponent implements AfterContentInit {
  @ViewChild(Galleria, { static: true }) private galleriaRef!: Galleria;
  @ContentChildren(PrimeTemplate) private userTemplates!: QueryList<PrimeTemplate>;

  @Input() value: GalleriaItem[] = [];
  @Input() numVisible = 3;
  @Input() showItemNavigators = false;
  @Input() showItemNavigatorsOnHover = false;
  @Input() showThumbnails = true;
  @Input() showThumbnailNavigators = true;
  @Input() showIndicators = false;
  @Input() showIndicatorsOnItem = false;
  @Input() circular = false;
  @Input() autoPlay = false;
  @Input() transitionInterval = 4000;
  @Input() fullScreen = false;
  @Input() visible = false;
  @Input() containerClass: string | undefined = undefined;
  @Input() containerStyle: Record<string, string> | undefined = undefined;
  @Input() responsiveOptions: any[] | undefined = undefined;

  @Output() activeIndexChange = new EventEmitter<number>();
  @Output() visibleChange = new EventEmitter<boolean>();

  ngAfterContentInit(): void {
    this.syncTemplates();
    this.userTemplates.changes.subscribe(() => this.syncTemplates());
  }

  private syncTemplates(): void {
    const ref = this.galleriaRef as any;
    this.userTemplates.forEach((tpl) => {
      switch (tpl.getType()) {
        case 'item':
          ref._itemTemplate = tpl.template;
          break;
        case 'thumbnail':
          ref._thumbnailTemplate = tpl.template;
          break;
        case 'caption':
          ref.captionTemplate = tpl.template;
          break;
        case 'header':
          ref.headerTemplate = tpl.template;
          break;
        case 'footer':
          ref.footerTemplate = tpl.template;
          break;
        case 'indicator':
          ref.indicatorTemplate = tpl.template;
          break;
      }
    });
  }
}
