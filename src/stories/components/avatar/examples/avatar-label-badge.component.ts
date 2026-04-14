import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { OverlayBadge } from 'primeng/overlaybadge';
import { AvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <p-overlay-badge value="4" severity="danger">
      <avatar label="U" size="xlarge"></avatar>
    </p-overlay-badge>
    <p-overlay-badge value="new" severity="info">
      <avatar label="A" size="large"></avatar>
    </p-overlay-badge>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-label-badge',
  standalone: true,
  imports: [AvatarComponent, OverlayBadge],
  template,
  styles,
})
export class AvatarLabelBadgeComponent {}

export const LabelWithBadge: StoryObj = {
  render: () => ({
    template: `<app-avatar-label-badge></app-avatar-label-badge>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с текстом и бейджем через OverlayBadge.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { OverlayBadge } from 'primeng/overlaybadge';
import { AvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-label-badge',
  standalone: true,
  imports: [AvatarComponent, OverlayBadge],
  template: \`
    <div class="flex items-center gap-4">
      <p-overlay-badge value="4" severity="danger">
        <avatar label="U" size="xlarge"></avatar>
      </p-overlay-badge>
      <p-overlay-badge value="new" severity="info">
        <avatar label="A" size="large"></avatar>
      </p-overlay-badge>
    </div>
  \`,
})
export class AvatarLabelBadgeComponent {}
        `,
      },
    },
  },
};
