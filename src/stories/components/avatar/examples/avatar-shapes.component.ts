import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <extra-avatar label="S"></extra-avatar>
    <extra-avatar label="C" shape="circle"></extra-avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-shapes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent],
  template,
  styles
})
export class AvatarShapesComponent {}

export const Shapes: StoryObj = {
  render: () => ({
    template: `<app-avatar-shapes></app-avatar-shapes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Формы аватара: square (по умолчанию) и circle.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-shapes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent],
  template: \`
    <div class="flex items-center gap-4">
      <extra-avatar label="S"></extra-avatar>
      <extra-avatar label="C" shape="circle"></extra-avatar>
    </div>
  \`,
})
export class AvatarShapesComponent {}
        `
      }
    }
  }
};
