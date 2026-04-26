import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <extra-avatar label="P"></extra-avatar>
    <extra-avatar label="V" size="large"></extra-avatar>
    <extra-avatar label="U" size="xlarge"></extra-avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-label',
  standalone: true,
    imports: [ExtraAvatarComponent],
  template,
  styles,
})
export class AvatarLabelComponent {}

export const Label: StoryObj = {
  render: () => ({
    template: `<app-avatar-label></app-avatar-label>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с текстовой меткой разных размеров.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-label',
  standalone: true,
  imports: [ExtraAvatarComponent],
  template: \`
    <div class="flex items-center gap-4">
      <extra-avatar label="P"></extra-avatar>
      <extra-avatar label="V" size="large"></extra-avatar>
      <extra-avatar label="U" size="xlarge"></extra-avatar>
    </div>
  \`,
})
export class AvatarLabelComponent {}
        `,
      },
    },
  },
};
