import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-avatar label="P" />
    <p-avatar label="V" [style]="{ 'background-color': '#9c27b0', color: '#ffffff' }" />
    <p-avatar label="U" [style]="{ 'background-color': '#673ab7', color: '#ffffff' }" />
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-avatar-base',
  standalone: true,
  imports: [Avatar],
  template,
  styles
})
export class AvatarBaseComponent {}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-avatar-base></app-avatar-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовые аватары с буквами'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-avatar-base',
  standalone: true,
  imports: [Avatar],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class AvatarBaseComponent {}
        `
      }
    }
  }
};
