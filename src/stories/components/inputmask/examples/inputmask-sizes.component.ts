import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

export const template = `
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
  <input-mask mask="99-99-99" size="small" placeholder="Small" [(ngModel)]="s"></input-mask>
  <input-mask mask="99-99-99" size="base" placeholder="Base" [(ngModel)]="b"></input-mask>
  <input-mask mask="99-99-99" size="large" placeholder="Large" [(ngModel)]="l"></input-mask>
  <input-mask mask="99-99-99" size="xlarge" placeholder="XLarge" [(ngModel)]="xl"></input-mask>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputmask-sizes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskComponent, FormsModule],
  template,
  styles,
})
export class InputMaskSizesComponent {
  s = '';
  b = '';
  l = '';
  xl = '';
}

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: () => ({
    template: `<app-inputmask-sizes></app-inputmask-sizes>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Четыре размера поля: small, base, large, xlarge.',
      },
      source: {
        language: 'ts',
        code: `@Component({
  template: \`${template}\`,
})`,
      },
    },
  },
};
