import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-end gap-4">
    <extra-avatar label="M"></extra-avatar>
    <extra-avatar label="L" size="large"></extra-avatar>
    <extra-avatar label="XL" size="xlarge"></extra-avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent],
  template,
  styles
})
export class AvatarSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-avatar-sizes></app-avatar-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры аватара: normal, large, xlarge.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent],
  template: \`
    <div class="flex items-end gap-4">
      <extra-avatar label="M"></extra-avatar>
      <extra-avatar label="L" size="large"></extra-avatar>
      <extra-avatar label="XL" size="xlarge"></extra-avatar>
    </div>
  \`,
})
export class AvatarSizesComponent {}
        `
      }
    }
  }
};
