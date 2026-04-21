import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

export const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <input pInputText id="fl-invalid" class="p-invalid" [(ngModel)]="value" />
    <label for="fl-invalid">Обязательное поле</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputtext-float-label-invalid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputText, FloatLabel, FormsModule],
  template,
  styles,
})
export class InputTextFloatLabelInvalidComponent {
  value = '';
}

export const FloatLabelInvalid: StoryObj = {
  name: 'FloatLabel + Invalid',
  render: () => ({
    template: `<app-inputtext-float-label-invalid></app-inputtext-float-label-invalid>`,
  }),
  parameters: {
    controls: { disable: true },
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
  selector: 'app-inputtext-float-label-invalid',
  standalone: true,
  imports: [InputText, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <input pInputText id="fl-invalid" class="p-invalid" [(ngModel)]="value" />
      <label for="fl-invalid">Обязательное поле</label>
    </p-floatlabel>
  \`,
})
export class InputTextFloatLabelInvalidComponent {
  value = '';
}
        `,
      },
    },
  },
};
