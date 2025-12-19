import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3">
    <p-badge value="2" />
    <p-badge value="8" severity="success" />
    <p-badge value="4" severity="info" />
    <p-badge value="12" severity="warn" />
    <p-badge value="3" severity="danger" />
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-badge-base',
  standalone: true,
  imports: [Badge],
  template,
  styles
})
export class BadgeBaseComponent {}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-badge-base></app-badge-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовые бейджи с различными severity'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Badge } from 'primeng/badge';

@Component({
  selector: 'app-badge-base',
  standalone: true,
  imports: [Badge],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class BadgeBaseComponent {}
        `
      }
    }
  }
};
