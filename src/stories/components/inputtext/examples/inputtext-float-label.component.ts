import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [InputText, FloatLabel, FormsModule, NgIf],
  template: `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <input pInputText id="fl-name" [(ngModel)]="value" />
    <label for="fl-name">Имя<span *ngIf="required" class="text-red-500 ml-0.5">*</span></label>
  </p-floatlabel>
</div>
`,
})
export class InputTextFloatLabelComponent {
  value = '';
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
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля. Кликните на поле чтобы увидеть анимацию. Требует нативный `<input pInputText>` как прямой дочерний элемент `p-floatlabel`.',
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
      <input pInputText id="fl-name" [(ngModel)]="value" />
      <label for="fl-name">Имя<span class="text-red-500 ml-0.5">*</span></label>
    </p-floatlabel>
  \`,
})
export class FloatLabelExample {
  value = '';
}
        `,
      },
    },
  },
};
