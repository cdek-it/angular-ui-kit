import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { FloatLabel } from 'primeng/floatlabel';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

@Component({
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [ExtraInputTextComponent, FloatLabel, ReactiveFormsModule],
  template: `
    <div class="pt-6 w-64">
      <p-floatlabel variant="in">
        <extra-input-text id="fl-name" [formControl]="control"></extra-input-text>
        <label for="fl-name"
          >Имя
          @if (required) {
            <span class="text-red-500 ml-0.5">*</span>
          }
        </label>
      </p-floatlabel>
    </div>
  `
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
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputTextComponent, FloatLabel, ReactiveFormsModule],
  template: \`
    <p-floatlabel variant="in">
      <extra-input-text id="fl-name" [formControl]="control"></extra-input-text>
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
