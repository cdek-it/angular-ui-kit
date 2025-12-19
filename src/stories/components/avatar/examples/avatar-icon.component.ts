import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-avatar icon="ti ti-user" />
    <p-avatar icon="ti ti-user" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" />
    <p-avatar icon="ti ti-user" [style]="{ 'background-color': '#673ab7', color: '#ffffff' }" shape="circle" />
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-avatar-icon',
  standalone: true,
  imports: [Avatar],
  template,
  styles
})
export class AvatarIconComponent {}

export const Icon: StoryObj = {
  render: () => ({
    template: `<app-avatar-icon></app-avatar-icon>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Аватары с иконками'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-avatar-icon',
  standalone: true,
  imports: [Avatar],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class AvatarIconComponent {}
        `
      }
    }
  }
};
