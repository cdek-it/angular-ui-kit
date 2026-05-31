import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { OverlayBadge } from 'primeng/overlaybadge';
import { ExtraAvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <p-overlay-badge value="4" severity="danger">
      <extra-avatar label="U" size="xlarge"></extra-avatar>
    </p-overlay-badge>
    <p-overlay-badge value="new" severity="info">
      <extra-avatar label="A" size="large"></extra-avatar>
    </p-overlay-badge>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-label-badge',
  standalone: true,
  imports: [ExtraAvatarComponent, OverlayBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles,
})
export class AvatarLabelBadgeComponent {}
// todo разобраться со стори, почему primeng здесь
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
import { ExtraAvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-label-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAvatarComponent, OverlayBadge],
  template: \`
    <div class="flex items-center gap-4">
        <p-overlay-badge value="4" severity="danger">
          <extra-avatar label="U" size="xlarge"></extra-avatar>
        </p-overlay-badge>
        <p-overlay-badge value="new" severity="info">
          <extra-avatar label="A" size="large"></extra-avatar>
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
