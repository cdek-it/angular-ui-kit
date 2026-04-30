import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const styles = '';

@Component({
  selector: 'app-inputmask-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskComponent, ReactiveFormsModule],
  template: `
    <input-mask
      mask="99-99-99"
      placeholder="Обязательное поле"
      [formControl]="control"
    ></input-mask>
  `,
  styles,
})
class InputMaskInvalidComponent {
  readonly control = new FormControl('', Validators.required);

  constructor() {
    this.control.markAsTouched();
  }
}

export const Invalid: StoryObj = {
  name: 'Invalid',
  render: () => ({
    template: `<app-inputmask-invalid></app-inputmask-invalid>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Невалидное состояние — определяется через валидаторы `FormControl`.',
      },
      source: {
        language: 'ts',
        code: `
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

// В компоненте:
readonly control = new FormControl('', Validators.required);

// template:
// <input-mask mask="99-99-99" [formControl]="control"></input-mask>
        `,
      },
    },
  },
};
