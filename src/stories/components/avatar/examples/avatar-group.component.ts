import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { AvatarComponent, AvatarGroupComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <avatar-group>
    <avatar image="assets/images/avatar/amyelsner.png" shape="circle"></avatar>
    <avatar image="assets/images/avatar/asiyajavayant.png" shape="circle"></avatar>
    <avatar image="assets/images/avatar/xuxuefeng.png" shape="circle"></avatar>
    <avatar image="assets/images/avatar/ionibowcher.png" shape="circle"></avatar>
    <avatar image="assets/images/avatar/stephenshaw.png" shape="circle"></avatar>
    <avatar label="+2" shape="circle"></avatar>
  </avatar-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, AvatarGroupComponent],
  template,
  styles,
})
export class AvatarGroupExampleComponent {}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-avatar-group></app-avatar-group>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Группа аватаров с перекрытием.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { AvatarComponent, AvatarGroupComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, AvatarGroupComponent],
  template: \`
    <avatar-group>
      <avatar image="assets/images/avatar/amyelsner.png" shape="circle"></avatar>
      <avatar image="assets/images/avatar/asiyajavayant.png" shape="circle"></avatar>
      <avatar image="assets/images/avatar/xuxuefeng.png" shape="circle"></avatar>
      <avatar label="+2" shape="circle"></avatar>
    </avatar-group>
  \`,
})
export class AvatarGroupExampleComponent {}
        `,
      },
    },
  },
};
