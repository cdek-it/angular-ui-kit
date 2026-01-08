import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-avatarGroup>
    <p-avatar label="P" />
    <p-avatar label="V" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" />
    <p-avatar label="U" [style]="{ 'background-color': '#673ab7', color: '#ffffff' }" />
    <p-avatar label="+2" [style]="{ 'background-color': '#607d8b', color: '#ffffff' }" />
  </p-avatarGroup>
</div>
`;

const styles = '';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  imports: [Avatar, AvatarGroup],
  template,
  styles
})
export class AvatarGroupComponent {}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-avatar-group></app-avatar-group>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Группа аватаров'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  imports: [Avatar, AvatarGroup],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class AvatarGroupComponent {}
        `
      }
    }
  }
};
