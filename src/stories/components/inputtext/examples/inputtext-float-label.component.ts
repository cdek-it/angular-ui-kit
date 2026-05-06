import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [InputText, FloatLabel, ReactiveFormsModule, NgIf],
  template: `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <input pInputText id="fl-name" [formControl]="control" />
    <label for="fl-name">Имя<span *ngIf="required" class="text-red-500 ml-0.5">*</span></label>
  </p-floatlabel>
</div>
`,
})
export class InputTextFloatLabelComponent {
  control = new FormControl('');
  @Input() required = false;
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: (args) => ({
    template: `<app-inputtext-float-label [required]="required"></app-inputtext-float-label>`,
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
        story:
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля. `p-floatlabel` требует нативный `<input pInputText>` как прямой дочерний элемент.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  standalone: true,
  imports: [InputText, FloatLabel, ReactiveFormsModule],
  template: \`
    <p-floatlabel variant="in">
      <input pInputText id="fl-name" [formControl]="control" />
      <label for="fl-name">Имя<span class="text-red-500 ml-0.5">*</span></label>
    </p-floatlabel>
  \`,
})
export class FloatLabelExample {
  control = new FormControl('');
}
        `,
      },
    },
  },
};
