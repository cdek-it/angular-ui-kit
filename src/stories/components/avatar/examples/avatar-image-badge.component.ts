import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { OverlayBadge } from 'primeng/overlaybadge';
import { AvatarComponent } from '../../../../lib/components/avatar/avatar.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex items-center gap-4">
    <p-overlay-badge value="8" severity="success">
      <avatar image="assets/images/avatar/amyelsner.png" size="xlarge" shape="circle"></avatar>
    </p-overlay-badge>
    <p-overlay-badge value="8" severity="success">
      <avatar image="assets/images/avatar/asiyajavayant.png" size="large"></avatar>
    </p-overlay-badge>
  </div>
</div>
`;
const styles = '';

@Component({
  selector: 'app-avatar-image-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, OverlayBadge],
  template,
  styles,
})
export class AvatarImageBadgeComponent {}

export const ImageWithBadge: StoryObj = {
  render: () => ({
    template: `<app-avatar-image-badge></app-avatar-image-badge>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с изображением и бейджем через OverlayBadge.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { OverlayBadge } from 'primeng/overlaybadge';
import { AvatarComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-avatar-image-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarComponent, OverlayBadge],
  template: \`
    <div class="flex items-center gap-4">
      <p-overlay-badge value="8" severity="success">
        <avatar image="assets/images/avatar/amyelsner.png" size="xlarge" shape="circle"></avatar>
      </p-overlay-badge>
      <p-overlay-badge value="8" severity="success">
        <avatar image="assets/images/avatar/asiyajavayant.png" size="large"></avatar>
      </p-overlay-badge>
    </div>
  \`,
})
export class AvatarImageBadgeComponent {}
        `,
      },
    },
  },
};
