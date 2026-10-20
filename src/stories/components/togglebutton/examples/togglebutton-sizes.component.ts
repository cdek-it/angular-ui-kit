import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<div class="flex gap-3 items-center">
  <extra-togglebutton label="Small" size="small" [formControl]="small"></extra-togglebutton>
  <extra-togglebutton label="Base" [formControl]="base"></extra-togglebutton>
  <extra-togglebutton label="Large" size="large" [formControl]="large"></extra-togglebutton>
  <extra-togglebutton label="XLarge" size="xlarge" [formControl]="xlarge"></extra-togglebutton>
</div>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-sizes',
  standalone: true,
  imports: [ExtraToggleButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ToggleButtonSizesComponent {
  small = new FormControl(false);
  base = new FormControl(true);
  large = new FormControl(false);
  xlarge = new FormControl(true);
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-sizes></app-togglebutton-sizes>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Размеры кнопки: высота 32 / 40 / 56 / 64px.' },
      source: {
        language: 'html',
        code: `<extra-togglebutton label="Small" size="small" [formControl]="small"></extra-togglebutton>
<extra-togglebutton label="Base" [formControl]="base"></extra-togglebutton>
<extra-togglebutton label="Large" size="large" [formControl]="large"></extra-togglebutton>
<extra-togglebutton label="XLarge" size="xlarge" [formControl]="xlarge"></extra-togglebutton>`
      }
    }
  }
};
