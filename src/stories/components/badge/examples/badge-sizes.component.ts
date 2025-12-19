import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3 items-center">
    <p-badge value="2" size="xlarge" />
    <p-badge value="4" size="large" />
    <p-badge value="6" />
    <p-badge value="8" size="small" />
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-sizes',
  standalone: true,
  imports: [Badge],
  template,
  styles
})
export class BadgeSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-badge-sizes></app-badge-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Различные размеры бейджей'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';

@Component({
  selector: 'app-badge-sizes',
  standalone: true,
  imports: [Badge],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class BadgeSizesComponent {}
        `
      }
    }
  }
};
