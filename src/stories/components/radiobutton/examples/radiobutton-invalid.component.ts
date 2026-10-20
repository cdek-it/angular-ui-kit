import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraRadiobuttonComponent } from '../../../../lib/components/radiobutton/radiobutton.component';

/** Форсированная ошибка для демонстрации invalid-стиля независимо от того, выбран пункт или нет. */
const alwaysInvalid: ValidatorFn = () => ({ invalid: true });

const template = `
<div class="flex flex-col gap-3">
  <extra-radiobutton [formControl]="control" name="delivery-invalid" value="pickup" label="Самовывоз"></extra-radiobutton>
  <extra-radiobutton [formControl]="control" name="delivery-invalid" value="courier" [label]="label"></extra-radiobutton>
</div>
`;

@Component({
  selector: 'app-radiobutton-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template
})
export class RadiobuttonInvalidComponent implements OnChanges {
  @Input() label = 'Курьером';
  @Input() invalid = true;

  /** Один FormControl на всю группу; ошибка форсирована, чтобы invalid не зависел от выбора. */
  control = new FormControl('pickup', this.invalid ? [alwaysInvalid] : []);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invalid']) {
      this.control.setValidators(this.invalid ? [alwaysInvalid] : []);
      this.control.updateValueAndValidity();
    }
  }
}

export const Invalid: StoryObj<{ label: string; invalid: boolean }> = {
  name: 'Invalid',
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст названия',
      table: { category: 'Свойства', type: { summary: 'string' } }
    },
    invalid: {
      control: 'boolean',
      description: 'Невалидное состояние — вычисляется из NgControl (Validators.required)',
      table: { category: 'Состояния', type: { summary: 'boolean' } }
    }
  },
  args: { label: 'Курьером', invalid: true },
  render: (args) => ({
    props: args,
    template: `<app-radiobutton-invalid [label]="label" [invalid]="invalid"></app-radiobutton-invalid>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Невалидная группа — вычисляется из `NgControl` автоматически, переключите control «invalid» в панели Controls. Ошибка форсирована искусственным валидатором, поэтому не зависит от того, выбран пункт или нет — оба пункта на одном FormControl.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { ExtraRadiobuttonComponent } from '@cdek-it/angular-ui-kit';

const alwaysInvalid: ValidatorFn = () => ({ invalid: true });

@Component({
  selector: 'app-radiobutton-invalid',
  standalone: true,
  imports: [ExtraRadiobuttonComponent, ReactiveFormsModule],
  template: \`
    <extra-radiobutton [formControl]="control" name="delivery-invalid" value="pickup" label="Самовывоз"></extra-radiobutton>
    <extra-radiobutton [formControl]="control" name="delivery-invalid" value="courier" [label]="label"></extra-radiobutton>
  \`,
})
export class RadiobuttonInvalidComponent implements OnChanges {
  @Input() label = 'Курьером';
  @Input() invalid = true;

  control = new FormControl('pickup', this.invalid ? [alwaysInvalid] : []);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invalid']) {
      this.control.setValidators(this.invalid ? [alwaysInvalid] : []);
      this.control.updateValueAndValidity();
    }
  }
}
        `
      }
    }
  }
};
