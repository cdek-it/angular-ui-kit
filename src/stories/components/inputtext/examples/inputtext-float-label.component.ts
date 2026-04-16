import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="flex flex-col gap-6 w-64 pt-4">
  <p-floatlabel variant="in">
    <input-text
      placeholder=" "
      [(ngModel)]="value1"
    ></input-text>
    <label>Имя</label>
  </p-floatlabel>
  <p-floatlabel variant="in">
    <input-text
      size="large"
      placeholder=" "
      [(ngModel)]="value2"
    ></input-text>
    <label>Фамилия (large)</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [InputTextComponent, FloatLabel, FormsModule],
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
      description: { story: 'Интеграция с `p-floatlabel` — плавающая метка внутри поля.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputtext-float-label',
  standalone: true,
  imports: [InputTextComponent, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <input-text placeholder=" " [(ngModel)]="value"></input-text>
      <label>Имя</label>
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
