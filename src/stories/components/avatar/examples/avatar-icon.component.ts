import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { AvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <avatar icon="ti ti-user"></avatar>
    <avatar icon="ti ti-search" size="large"></avatar>
    <avatar icon="ti ti-check" size="xlarge"></avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template,
  styles,
})
export class AvatarIconComponent {}

export const Icon: StoryObj = {
  render: () => ({
    template: `<app-avatar-icon></app-avatar-icon>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с иконкой разных размеров.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { AvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template: \`
    <div class="flex items-center gap-4">
      <avatar icon="ti ti-user"></avatar>
      <avatar icon="ti ti-search" size="large"></avatar>
      <avatar icon="ti ti-check" size="xlarge"></avatar>
    </div>
  \`,
})
export class AvatarIconComponent {}
        `,
      },
    },
  },
};
