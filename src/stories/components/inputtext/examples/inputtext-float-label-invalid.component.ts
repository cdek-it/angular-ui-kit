import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-inputtext-float-label-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, FloatLabel, FormsModule, NgIf],
  template: `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <input pInputText id="fl-invalid" class="p-invalid" [(ngModel)]="value" />
    <label for="fl-invalid">Обязательное поле<span *ngIf="required" class="text-red-500 ml-0.5">*</span></label>
  </p-floatlabel>
</div>
`,
})
export class InputTextFloatLabelInvalidComponent {
  value = '';
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
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [InputText, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <input pInputText id="fl-invalid" class="p-invalid" [(ngModel)]="value" />
      <label for="fl-invalid">Обязательное поле<span class="text-red-500 ml-0.5">*</span></label>
    </p-floatlabel>
  \`,
})
export class FloatLabelInvalidExample {
  value = '';
}
        `,
      },
    },
  },
};
