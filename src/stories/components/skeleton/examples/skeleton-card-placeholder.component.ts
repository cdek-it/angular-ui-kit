import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { SkeletonComponent } from '../../../../lib/components/skeleton/skeleton.component';

const template = `
<div class="bg-surface-ground">
  <div class="flex gap-4">
    <skeleton shape="circle" size="4rem"></skeleton>
    <div class="flex flex-col gap-2 flex-1">
      <skeleton height="1rem" width="60%"></skeleton>
      <skeleton height="0.75rem" width="40%"></skeleton>
      <skeleton height="0.75rem"></skeleton>
    </div>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-skeleton-card-placeholder',
  standalone: true,
  imports: [SkeletonComponent],
  template,
  styles,
})
export class SkeletonCardPlaceholderComponent {}

export const CardPlaceholder: StoryObj = {
  render: () => ({
    template: `<app-skeleton-card-placeholder></app-skeleton-card-placeholder>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Составная заглушка карточки отправления: аватар курьера и строки с информацией.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-card-placeholder',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex gap-4">
      <skeleton shape="circle" size="4rem"></skeleton>
      <div class="flex flex-col gap-2 flex-1">
        <skeleton height="1rem" width="60%"></skeleton>
        <skeleton height="0.75rem" width="40%"></skeleton>
        <skeleton height="0.75rem"></skeleton>
      </div>
    </div>
  \`,
})
export class SkeletonCardPlaceholderComponent {}
        `,
      },
    },
  },
};
