import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { OverlayBadge } from 'primeng/overlaybadge';
import { ExtraBadgeSeverity } from '@cdek-it/angular-ui-kit/components/badge';

export type ExtraAvatarSize = 'base' | 'large' | 'xlarge';
export type ExtraAvatarShape = 'square' | 'circle';

type PrimeOverlayBadgeSeverity = 'secondary' | 'info' | 'success' | 'warn' | 'danger' | 'contrast' | null | undefined;

@Component({
  selector: 'extra-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Avatar, OverlayBadge, NgTemplateOutlet],
  template: `
    @if (badge) {
      <p-overlay-badge [value]="badge" [severity]="primeSeverity" [size]="primeSize">
        <ng-container [ngTemplateOutlet]="avatarTpl" />
      </p-overlay-badge>
    } @else {
      <ng-container [ngTemplateOutlet]="avatarTpl" />
    }

    <ng-template #avatarTpl>
      <p-avatar
        [label]="label || undefined"
        [icon]="icon || undefined"
        [image]="image || undefined"
        [size]="primeSize"
        [shape]="shape"
      ></p-avatar>
    </ng-template>
  `
})
export class ExtraAvatarComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() image = '';
  @Input() size: ExtraAvatarSize = 'base';
  @Input() shape: ExtraAvatarShape = 'square';
  @Input() badge: string | undefined;
  @Input() severity: ExtraBadgeSeverity = 'primary';

  @HostBinding('class') get hostClass(): string {
    const classes = ['ui-avatar'];
    if (this.size === 'large') classes.push('ui-avatar-lg');
    if (this.size === 'xlarge') classes.push('ui-avatar-xl');
    return classes.join(' ');
  }

  get primeSize(): 'large' | 'xlarge' | undefined {
    return this.size === 'base' ? undefined : this.size;
  }

  get primeSeverity(): PrimeOverlayBadgeSeverity {
    if (this.severity === 'primary') return null;
    if (this.severity === 'warning') return 'warn';
    return this.severity as Exclude<PrimeOverlayBadgeSeverity, null | undefined | 'warn'>;
  }
}

@Component({
  selector: 'extra-avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AvatarGroup],
  template: `
    <p-avatar-group>
      <ng-content></ng-content>
    </p-avatar-group>
  `
})
export class ExtraAvatarGroupComponent {}
