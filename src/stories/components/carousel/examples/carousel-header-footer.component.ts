import { Component } from '@angular/core';
import {
  ExtraCarouselComponent,
  ExtraCarouselFooterDirective,
  ExtraCarouselHeaderDirective,
  ExtraCarouselItemDirective
} from '../../../../lib/components/carousel/carousel.component';

const SLIDES = Array.from({ length: 6 }, (_, i) => ({
  title: `Слайд ${i + 1}`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
}));

export const template = `
<div style="max-width: 800px;">
  <extra-carousel [value]="slides" [numVisible]="3" [circular]="true">
    <ng-template extraCarouselHeader>
      <div class="flex items-center justify-between px-3 py-2">
        <span class="font-bold">Заголовок карусели</span>
        <span class="text-surface-400 text-sm">всего: {{ slides.length }}</span>
      </div>
    </ng-template>

    <ng-template extraCarouselItem let-item>
      <div class="flex flex-col gap-2 px-3 py-3 border rounded min-w-0 overflow-hidden">
        <span class="font-bold truncate">{{ item.title }}</span>
        <span class="text-sm">{{ item.subtitle }}</span>
      </div>
    </ng-template>

    <ng-template extraCarouselFooter>
      <div class="px-3 py-2 text-surface-400 text-sm text-center">
        Листайте стрелками или индикаторами
      </div>
    </ng-template>
  </extra-carousel>
</div>
`;

const styles = '';

@Component({
  selector: 'app-carousel-header-footer',
  standalone: true,
  imports: [
    ExtraCarouselComponent,
    ExtraCarouselItemDirective,
    ExtraCarouselHeaderDirective,
    ExtraCarouselFooterDirective
  ],
  template,
  styles
})
export class CarouselHeaderFooterComponent {
  slides = SLIDES;
}

export const HeaderAndFooter = {
  render: () => ({
    template: `<app-carousel-header-footer></app-carousel-header-footer>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Шапка и подвал карусели через директивы `extraCarouselHeader` и `extraCarouselFooter`. Шаблон элемента — `extraCarouselItem` (получает `let-item`).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraCarouselComponent,
  ExtraCarouselItemDirective,
  ExtraCarouselHeaderDirective,
  ExtraCarouselFooterDirective,
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-carousel-header-footer',
  standalone: true,
  imports: [
    ExtraCarouselComponent,
    ExtraCarouselItemDirective,
    ExtraCarouselHeaderDirective,
    ExtraCarouselFooterDirective,
  ],
  template: \`
    <extra-carousel [value]="slides" [numVisible]="3" [circular]="true">
      <ng-template extraCarouselHeader>
        <div class="flex items-center justify-between px-3 py-2">
          <span class="font-bold">Заголовок карусели</span>
          <span class="text-surface-400 text-sm">всего: {{ slides.length }}</span>
        </div>
      </ng-template>

      <ng-template extraCarouselItem let-item>
        <div class="flex flex-col gap-2 px-3 py-3 border rounded min-w-0 overflow-hidden">
          <span class="font-bold truncate">{{ item.title }}</span>
          <span class="text-sm">{{ item.subtitle }}</span>
        </div>
      </ng-template>

      <ng-template extraCarouselFooter>
        <div class="px-3 py-2 text-surface-400 text-sm text-center">Листайте стрелками</div>
      </ng-template>
    </extra-carousel>
  \`,
})
export class CarouselHeaderFooterComponent {
  slides = [ /* ... */ ];
}
        `
      }
    }
  }
};
