import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraSkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex items-center gap-4">
    <extra-skeleton shape="circle" size="3rem"></extra-skeleton>
    <extra-skeleton shape="circle" size="4rem"></extra-skeleton>
    <extra-skeleton shape="circle" size="6rem"></extra-skeleton>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-circle',
  standalone: true,
  imports: [ExtraSkeletonComponent],
  template,
  styles,
})
export class SkeletonCircleComponent {}

export const Circle: StoryObj = {
  render: () => ({
    template: `<app-skeleton-circle></app-skeleton-circle>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Круглые заглушки для аватаров и иконок — например, фото курьера или транспортного средства.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-circle',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
      <div class="flex items-center gap-4">
      <extra-skeleton shape="circle" size="3rem"></extra-skeleton>
      <extra-skeleton shape="circle" size="4rem"></extra-skeleton>
      <extra-skeleton shape="circle" size="6rem"></extra-skeleton>
    </div>
  \`,
})
export class SkeletonCircleComponent {}
        `,
      },
    },
  },
};
