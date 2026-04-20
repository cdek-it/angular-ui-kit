import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { AvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <avatar label="S"></avatar>
    <avatar label="C" shape="circle"></avatar>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-shapes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template,
  styles,
})
export class AvatarShapesComponent {}

export const Shapes: StoryObj = {
  render: () => ({
    template: `<app-avatar-shapes></app-avatar-shapes>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Формы аватара: square (по умолчанию) и circle.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { AvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-shapes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent],
  template: \`
    <div class="flex items-center gap-4">
      <avatar label="S"></avatar>
      <avatar label="C" shape="circle"></avatar>
    </div>
  \`,
})
export class AvatarShapesComponent {}
        `,
      },
    },
  },
};
