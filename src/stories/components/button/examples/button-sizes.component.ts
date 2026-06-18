import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3 items-end">
    <extra-button label="Small" icon="ti ti-check" size="small" />
    <extra-button label="Normal" icon="ti ti-check" />
    <extra-button label="Large" icon="ti ti-check" size="large" />
    <extra-button label="xLarge" icon="pi pi-check" size="xlarge" />
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-button-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template,
  styles
})
export class ButtonSizesComponent {}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-button-sizes></app-button-sizes>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Кнопки разных размеров'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-button-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExtraButtonComponent
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonSizesComponent {}
        `
      }
    }
  }
};
