import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

const template = `
<div class="flex flex-col gap-6 w-64 pt-4">
  <p-floatlabel variant="in">
    <input pInputText id="fl-name" [(ngModel)]="value1" />
    <label for="fl-name">Имя</label>
  </p-floatlabel>
  <p-floatlabel variant="in">
    <input pInputText pSize="large" id="fl-surname" [(ngModel)]="value2" />
    <label for="fl-surname">Фамилия (large)</label>
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
  value1 = '';
  value2 = '';
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
        story: 'Интеграция с `p-floatlabel` — плавающая метка внутри поля. Требует нативный `<input pInputText>` как прямой дочерний элемент `p-floatlabel`.',
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
      <label for="fl-name">Имя</label>
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
