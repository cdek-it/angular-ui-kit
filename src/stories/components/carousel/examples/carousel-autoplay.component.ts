import { Component } from '@angular/core';
import { ExtraCarouselComponent } from '../../../../lib/components/carousel/carousel.component';

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  title: `Lorem Ipsum ${i + 1}`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, saepe.'
}));

const template = `
<ng-template #itemTpl let-item>
  <div class="flex flex-col gap-3 px-3 py-3 border rounded min-w-0 overflow-hidden">
    <span class="font-bold truncate">{{ item.title }}</span>
    <span>{{ item.subtitle }}</span>
  </div>
</ng-template>
<extra-carousel
  [value]="slides"
  [numVisible]="3"
  [numScroll]="1"
  [circular]="true"
  [autoplayInterval]="3000"
  [itemTemplate]="itemTpl"
></extra-carousel>
`;
const styles = '';

@Component({
  selector: 'app-carousel-autoplay',
  standalone: true,
  imports: [ExtraCarouselComponent],
  template,
  styles
})
export class CarouselAutoplayComponent {
  slides = SLIDES;
}

export const Autoplay = {
  render: () => ({
    template: `<app-carousel-autoplay></app-carousel-autoplay>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Карусель с автоматической прокруткой слайдов каждые 3 секунды (`autoplayInterval`, `circular`).'
      },
      source: {
        language: 'ts',
        code: `
import { ExtraCarouselComponent } from '@cdek-it/angular-ui-kit';

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  title: \`Lorem Ipsum \${i + 1}\`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
}));

@Component({
  selector: 'app-carousel-autoplay',
  standalone: true,
  imports: [ExtraCarouselComponent],
  template: \`
    <ng-template #itemTpl let-item>
      <div class="flex flex-col gap-3 px-3 py-3 border rounded min-w-0 overflow-hidden">
        <span class="font-bold truncate">{{ item.title }}</span>
        <span>{{ item.subtitle }}</span>
      </div>
    </ng-template>
    <extra-carousel
      [value]="slides"
      [numVisible]="3"
      [numScroll]="1"
      [circular]="true"
      [autoplayInterval]="3000"
      [itemTemplate]="itemTpl"
    ></extra-carousel>
  \`,
})
export class CarouselAutoplayComponent {
  slides = SLIDES;
}
        `
      }
    }
  }
};
