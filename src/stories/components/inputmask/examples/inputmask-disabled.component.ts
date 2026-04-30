import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const styles = '';

@Component({
  selector: 'app-inputmask-disabled',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskComponent, ReactiveFormsModule],
  template: `
    <input-mask
      mask="99-99-99"
      placeholder="99-99-99"
      [formControl]="control"
    ></input-mask>
  `,
  styles,
})
class InputMaskDisabledComponent {
  readonly control = new FormControl({ value: '12-34-56', disabled: true });
}

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: () => ({
    template: `<app-inputmask-disabled></app-inputmask-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Отключённое состояние — управляется через `FormControl`.',
      },
      source: {
        language: 'ts',
        code: `
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// В компоненте:
readonly control = new FormControl({ value: '12-34-56', disabled: true });

// template:
// <input-mask mask="99-99-99" [formControl]="control"></input-mask>
        `,
      },
    },
  },
};
