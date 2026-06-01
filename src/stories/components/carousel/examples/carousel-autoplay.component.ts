import { Component } from '@angular/core';
import { CarouselComponent } from '../../../../lib/components/carousel/carousel.component';

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
<carousel
  [value]="slides"
  [numVisible]="3"
  [numScroll]="1"
  [circular]="true"
  [autoplayInterval]="3000"
  [itemTemplate]="itemTpl"
></carousel>
`;
const styles = '';

@Component({
  selector: 'app-carousel-autoplay',
  standalone: true,
  imports: [CarouselComponent],
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
import { CarouselComponent } from '@cdek-it/angular-ui-kit';

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  title: \`Lorem Ipsum \${i + 1}\`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
}));

@Component({
  selector: 'app-carousel-autoplay',
  standalone: true,
  imports: [CarouselComponent],
  template: \`
    <ng-template #itemTpl let-item>
      <div class="flex flex-col gap-3 px-3 py-3 border rounded min-w-0 overflow-hidden">
        <span class="font-bold truncate">{{ item.title }}</span>
        <span>{{ item.subtitle }}</span>
      </div>
    </ng-template>
    <carousel
      [value]="slides"
      [numVisible]="3"
      [numScroll]="1"
      [circular]="true"
      [autoplayInterval]="3000"
      [itemTemplate]="itemTpl"
    ></carousel>
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
