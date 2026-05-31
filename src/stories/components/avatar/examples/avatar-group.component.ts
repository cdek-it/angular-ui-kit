import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAvatarComponent, ExtraAvatarGroupComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-avatar-group>
    <extra-avatar image="assets/images/avatar/amyelsner.png" shape="circle"></extra-avatar>
    <extra-avatar image="assets/images/avatar/asiyajavayant.png" shape="circle"></extra-avatar>
    <extra-avatar image="assets/images/avatar/xuxuefeng.png" shape="circle"></extra-avatar>
    <extra-avatar image="assets/images/avatar/ionibowcher.png" shape="circle"></extra-avatar>
    <extra-avatar image="assets/images/avatar/stephenshaw.png" shape="circle"></extra-avatar>
    <extra-avatar label="+2" shape="circle"></extra-avatar>
  </extra-avatar-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent, ExtraAvatarGroupComponent],
  template,
  styles
})
export class AvatarGroupExampleComponent {}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-avatar-group></app-avatar-group>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Группа аватаров с перекрытием.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAvatarComponent, ExtraAvatarGroupComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent, ExtraAvatarGroupComponent],
  template: \`
    <extra-avatar-group>
      <extra-avatar image="assets/images/avatar/amyelsner.png" shape="circle"></extra-avatar>
      <extra-avatar image="assets/images/avatar/asiyajavayant.png" shape="circle"></extra-avatar>
      <extra-avatar image="assets/images/avatar/xuxuefeng.png" shape="circle"></extra-avatar>
      <extra-avatar label="+2" shape="circle"></extra-avatar>
    </extra-avatar-group>
  \`,
})
export class AvatarGroupExampleComponent {}
        `
      }
    }
  }
};
