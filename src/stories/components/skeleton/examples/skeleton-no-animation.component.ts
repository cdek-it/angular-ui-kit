import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraSkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex flex-col gap-3">
    <extra-skeleton animation="none" height="1rem"></extra-skeleton>
    <extra-skeleton animation="none" height="1rem" width="75%"></extra-skeleton>
    <extra-skeleton animation="none" shape="circle" size="4rem"></extra-skeleton>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-no-animation',
  standalone: true,
  imports: [ExtraSkeletonComponent],
  template,
  styles,
})
export class SkeletonNoAnimationComponent {}

export const NoAnimation: StoryObj = {
  render: () => ({
    template: `<app-skeleton-no-animation></app-skeleton-no-animation>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Скелетон без волновой анимации — статичная заглушка для состояния ожидания.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-no-animation',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex flex-col gap-3">
      <extra-skeleton animation="none" height="1rem"></extra-skeleton>
      <extra-skeleton animation="none" height="1rem" width="75%"></extra-skeleton>
      <extra-skeleton animation="none" shape="circle" size="4rem"></extra-skeleton>
    </div>
  \`,
})
export class SkeletonNoAnimationComponent {}
        `,
      },
    },
  },
};
