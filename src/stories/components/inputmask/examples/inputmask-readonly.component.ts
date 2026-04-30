import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const styles = '';

@Component({
  selector: 'app-inputmask-readonly',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskComponent, ReactiveFormsModule],
  template: `
    <input-mask
      mask="99-99-99"
      placeholder="99-99-99"
      [readonly]="true"
      [formControl]="control"
    ></input-mask>
  `,
  styles,
})
class InputMaskReadonlyComponent {
  readonly control = new FormControl('12-34-56');
}

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: () => ({
    template: `<app-inputmask-readonly></app-inputmask-readonly>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Режим только для чтения — поле отображает значение, но недоступно для редактирования.',
      },
      source: {
        language: 'ts',
        code: `
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// В компоненте:
readonly control = new FormControl('12-34-56');

// template:
// <input-mask mask="99-99-99" [readonly]="true" [formControl]="control"></input-mask>
        `,
      },
    },
  },
};
