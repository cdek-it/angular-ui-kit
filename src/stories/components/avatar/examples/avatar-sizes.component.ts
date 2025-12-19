import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3 items-end">
    <p-avatar label="XL" size="xlarge" />
    <p-avatar label="L" size="large" />
    <p-avatar label="N" />
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-avatar-sizes',
  standalone: true,
  imports: [Avatar],
  template,
  styles
})
export class AvatarSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-avatar-sizes></app-avatar-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные размеры аватаров'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-avatar-sizes',
  standalone: true,
  imports: [Avatar],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class AvatarSizesComponent {}
        `
      }
    }
  }
};
