import { Component, Input } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

export type AvatarSize = 'normal' | 'large' | 'xlarge';
export type AvatarShape = 'square' | 'circle';

@Component({
  selector: 'avatar',
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
export class AvatarComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() image = '';
  @Input() size: AvatarSize = 'normal';
  @Input() shape: AvatarShape = 'square';

  get primeSize(): 'normal' | 'large' | 'xlarge' | undefined {
    return this.size === 'normal' ? undefined : this.size;
  }
}

@Component({
  selector: 'avatar-group',
  standalone: true,
  imports: [AvatarGroup],
  template: `
    <p-avatar-group>
      <ng-content></ng-content>
    </p-avatar-group>
  `,
})
export class AvatarGroupComponent { }
