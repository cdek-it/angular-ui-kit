import { Component, HostBinding, Input } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

export type AvatarSize = 'normal' | 'large' | 'xlarge';
export type AvatarShape = 'square' | 'circle';

@Component({
  selector: 'extra-avatar',
  standalone: true,
  imports: [Avatar],
  template: `
    <p-avatar
      [label]="label || undefined"
      [icon]="icon || undefined"
      [image]="image || undefined"
      [size]="primeSize"
      [shape]="shape"
    ></p-avatar>
  `,
})
export class ExtraAvatarComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() image = '';
  @Input() size: AvatarSize = 'normal';
  @Input() shape: AvatarShape = 'square';

  @HostBinding('class') get hostClass(): string {
    const classes = ['ui-avatar'];
    if (this.size === 'large') classes.push('ui-avatar-lg');
    if (this.size === 'xlarge') classes.push('ui-avatar-xl');
    return classes.join(' ');
  }

  get primeSize(): 'normal' | 'large' | 'xlarge' | undefined {
    return this.size === 'normal' ? undefined : this.size;
  }
}

@Component({
  selector: 'extra-avatar-group',
  standalone: true,
  imports: [AvatarGroup],
  template: `
    <p-avatar-group>
      <ng-content></ng-content>
    </p-avatar-group>
  `,
})
export class ExtraAvatarGroupComponent { }
