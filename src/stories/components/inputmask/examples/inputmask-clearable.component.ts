import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

const template = `
<div class="flex flex-col gap-4">
  <extra-input-mask
    [formControl]="filled"
    mask="9999 9999 9999 9999"
    clearable
    label="С очисткой"
    placeholder="Номер карты"
    caption="Иконка × появляется при наличии значения"
  ></extra-input-mask>
  <extra-input-mask
    [formControl]="empty"
    mask="9999 9999 9999 9999"
    clearable
    label="С очисткой (пустое)"
    placeholder="Номер карты"
  ></extra-input-mask>
</div>
`;

@Component({
  selector: 'app-inputmask-clearable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template
})
export class InputMaskClearableComponent {
  filled = new FormControl('4276 3800 1234 5678');
  empty = new FormControl('');
}

export const Clearable: StoryObj = {
  render: () => ({
    template: `<app-inputmask-clearable></app-inputmask-clearable>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable). Иконка × появляется только при заполненном значении; по клику значение сбрасывается и срабатывает `(onClear)`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputmask-clearable',
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`
    <extra-input-mask
      [formControl]="control"
      mask="9999 9999 9999 9999"
      clearable
      label="С очисткой"
      placeholder="Номер карты"
    ></extra-input-mask>
  \`,
})
export class InputMaskClearableComponent {
  control = new FormControl('4276 3800 1234 5678');
}
        `
      }
    }
  }
};
