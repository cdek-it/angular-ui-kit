import { Component } from '@angular/core';
import { CarouselComponent } from '../../../../lib/components/carousel/carousel.component';

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  title: `Lorem Ipsum ${i + 1}`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, saepe.',
}));

const template = `
<div style="height: 400px;">
  <ng-template #itemTpl let-item>
    <div class="flex flex-col gap-3 px-3 py-3 border rounded min-w-0 overflow-hidden">
      <span class="font-bold truncate">{{ item.title }}</span>
      <span>{{ item.subtitle }}</span>
    </div>
  </ng-template>
  <carousel
    [value]="slides"
    orientation="vertical"
    [numVisible]="3"
    [numScroll]="1"
    [itemTemplate]="itemTpl"
  ></carousel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-carousel-vertical',
  standalone: true,
  imports: [CarouselComponent],
  template,
  styles,
})
export class CarouselVerticalComponent {
  slides = SLIDES;
}

export const Vertical = {
  render: () => ({
    template: `<app-carousel-vertical></app-carousel-vertical>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Карусель с вертикальной ориентацией.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { CarouselComponent } from '@cdek-it/angular-ui-kit';

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  title: \`Lorem Ipsum \${i + 1}\`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
}));

@Component({
  selector: 'app-carousel-vertical',
  standalone: true,
  imports: [CarouselComponent],
  template: \`
    <div style="height: 400px;">
      <ng-template #itemTpl let-item>
        <div class="flex flex-col gap-3 px-3 py-3 border rounded min-w-0 overflow-hidden">
          <span class="font-bold truncate">{{ item.title }}</span>
          <span>{{ item.subtitle }}</span>
        </div>
      </ng-template>
      <carousel
        [value]="slides"
        orientation="vertical"
        [numVisible]="3"
        [numScroll]="1"
        [itemTemplate]="itemTpl"
      ></carousel>
    </div>
  \`,
})
export class CarouselVerticalComponent {
  slides = SLIDES;
}
        `,
      },
    },
  },
};
