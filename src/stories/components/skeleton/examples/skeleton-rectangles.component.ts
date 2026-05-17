import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraSkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex flex-col gap-3">
    <extra-skeleton height="1rem"></extra-skeleton>
    <extra-skeleton height="1rem" width="75%"></extra-skeleton>
    <extra-skeleton height="1rem" width="50%"></extra-skeleton>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-rectangles',
  standalone: true,
  imports: [ExtraSkeletonComponent],
  template,
  styles,
})
export class SkeletonRectanglesComponent {}

export const Rectangles: StoryObj = {
  render: () => ({
    template: `<app-skeleton-rectangles></app-skeleton-rectangles>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Прямоугольные строки-заглушки разной ширины — паттерн для списка отправлений или текстового контента.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-rectangles',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex flex-col gap-3">
      <extra-skeleton height="1rem"></extra-skeleton>
      <extra-skeleton height="1rem" width="75%"></extra-skeleton>
      <extra-skeleton height="1rem" width="50%"></extra-skeleton>
    </div>
  \`,
})
export class SkeletonRectanglesComponent {}
        `,
      },
    },
  },
};
