import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <input pInputText id="fl-name" [(ngModel)]="value" />
    <label for="fl-name">Имя<span class="text-red-500 ml-0.5">*</span></label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [InputText, FloatLabel, FormsModule],
  template,
  styles,
})
export class InputTextFloatLabelComponent {
  value = '';
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-inputtext-float-label></app-inputtext-float-label>`,
  }),
  parameters: {
    controls: { disable: true },
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
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [InputText, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <input pInputText id="fl-name" [(ngModel)]="value" />
      <label for="fl-name">Имя<span class="text-red-500 ml-0.5">*</span></label>
    </p-floatlabel>
  \`,
})
export class InputTextFloatLabelComponent {
  value = '';
}
        `,
      },
    },
  },
};
