import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

@Component({
  selector: 'app-inputtext-float-label-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraInputTextComponent, FloatLabel, ReactiveFormsModule],
  template: `
    <div class="pt-6 w-64">
      <p-floatlabel variant="in">
        <extra-input-text id="fl-invalid" [formControl]="control"></extra-input-text>
        <label for="fl-invalid"
          >Обязательное поле
          @if (required) {
            <span class="text-red-500 ml-0.5">*</span>
          }
        </label>
      </p-floatlabel>
    </div>
  `
})
export class InputTextFloatLabelInvalidComponent {
  control = new FormControl('', Validators.required);
  @Input() required = false;
}

export const FloatLabelInvalid: StoryObj = {
  name: 'FloatLabel + Invalid',
  render: (args) => ({
    template: `<app-inputtext-float-label-invalid [required]="required"></app-inputtext-float-label-invalid>`,
    props: { required: args['required'] },
  }),
  args: { required: true },
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Показывает маркер обязательного поля `*` рядом с меткой',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'FloatLabel с невалидным состоянием — демонстрирует стилизацию ошибки в комбинации с плавающей меткой.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  standalone: true,
  imports: [InputTextComponent, FloatLabel, ReactiveFormsModule],
  template: \`
    <p-floatlabel variant="in">
      <extra-input-text id="fl-invalid" [formControl]="control"></extra-input-text>
      <label for="fl-invalid">Обязательное поле<span class="text-red-500 ml-0.5">*</span></label>
    </p-floatlabel>
  \`,
})
export class FloatLabelInvalidExample {
  control = new FormControl('', Validators.required);
}
        `,
      },
    },
  },
};
