import { Component } from '@angular/core';
import { Divider } from 'primeng/divider';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-4">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    
    <p-divider />
    
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
    
    <p-divider align="center">
      <span class="text-sm">ИЛИ</span>
    </p-divider>
    
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-divider-base',
  standalone: true,
  imports: [Divider],
  template,
  styles
})
export class DividerBaseComponent {}

export const Base: StoryObj = {
  render: () => ({
    template: `<app-divider-base></app-divider-base>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый разделитель с текстом и без'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-divider-base',
  standalone: true,
  imports: [Divider],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class DividerBaseComponent {}
        `
      }
    }
  }
};
