import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { OverlayBadge } from 'primeng/overlaybadge';
import { ExtraAvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <p-overlay-badge value="8" severity="success">
      <extra-avatar icon="ti ti-user" size="xlarge"></extra-avatar>
    </p-overlay-badge>
    <p-overlay-badge value="8" severity="warn">
      <extra-avatar icon="ti ti-bell" size="large"></extra-avatar>
    </p-overlay-badge>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-icon-badge',
  standalone: true,
    imports: [ExtraAvatarComponent, OverlayBadge],
  template,
  styles,
})
export class AvatarIconBadgeComponent {}

export const IconWithBadge: StoryObj = {
  render: () => ({
    template: `<app-avatar-icon-badge></app-avatar-icon-badge>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с иконкой и бейджем через OverlayBadge.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { OverlayBadge } from 'primeng/overlaybadge';
import { ExtraAvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-icon-badge',
  standalone: true,
  imports: [ExtraAvatarComponent, OverlayBadge],
  template: \`
    <div class="flex items-center gap-4">
      <p-overlay-badge value="8" severity="success">
        <extra-avatar icon="ti ti-user" size="xlarge"></extra-avatar>
      </p-overlay-badge>
      <p-overlay-badge value="8" severity="warn">
        <extra-avatar icon="ti ti-bell" size="large"></extra-avatar>
      </p-overlay-badge>
    </div>
  \`,
})
export class AvatarIconBadgeComponent {}
        `,
      },
    },
  },
};
