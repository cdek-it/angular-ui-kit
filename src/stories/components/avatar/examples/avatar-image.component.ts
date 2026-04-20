import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { AvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <avatar image="assets/images/avatar/amyelsner.png"></avatar>
    <avatar image="assets/images/avatar/asiyajavayant.png" size="large"></avatar>
    <avatar image="assets/images/avatar/xuxuefeng.png" size="xlarge"></avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template,
  styles,
})
export class AvatarImageComponent {}

export const Image: StoryObj = {
  render: () => ({
    template: `<app-avatar-image></app-avatar-image>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с изображением разных размеров.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { AvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template: \`
    <div class="flex items-center gap-4">
      <avatar image="assets/images/avatar/amyelsner.png"></avatar>
      <avatar image="assets/images/avatar/asiyajavayant.png" size="large"></avatar>
      <avatar image="assets/images/avatar/xuxuefeng.png" size="xlarge"></avatar>
    </div>
  \`,
})
export class AvatarImageComponent {}
        `,
      },
    },
  },
};
