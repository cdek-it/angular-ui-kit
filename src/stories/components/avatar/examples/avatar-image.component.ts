import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <extra-avatar image="assets/images/avatar/amyelsner.png"></extra-avatar>
    <extra-avatar image="assets/images/avatar/asiyajavayant.png" size="large"></extra-avatar>
    <extra-avatar image="assets/images/avatar/xuxuefeng.png" size="xlarge"></extra-avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent],
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
import { ExtraAvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-image',
  standalone: true,
  imports: [ExtraAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="flex items-center gap-4">
      <extra-avatar image="assets/images/avatar/amyelsner.png"></extra-avatar>
      <extra-avatar image="assets/images/avatar/asiyajavayant.png" size="large"></extra-avatar>
      <extra-avatar image="assets/images/avatar/xuxuefeng.png" size="xlarge"></extra-avatar>
    </div>
  \`,
})
export class AvatarImageComponent {}
        `,
      },
    },
  },
};
