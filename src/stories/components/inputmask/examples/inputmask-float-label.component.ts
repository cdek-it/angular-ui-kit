import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMask } from 'primeng/inputmask';
import { FloatLabel } from 'primeng/floatlabel';

export const template = `
<div class="pt-6 w-64">
  <p-floatlabel variant="in">
    <p-inputmask id="fl-mask" mask="99-99-99" [(ngModel)]="value"></p-inputmask>
    <label for="fl-mask">Дата</label>
  </p-floatlabel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputmask-float-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMask, FloatLabel, FormsModule],
  template,
  styles,
})
export class InputMaskFloatLabelComponent {
  value = '';
}

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: () => ({
    template: `<app-inputmask-float-label></app-inputmask-float-label>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Интеграция с `p-floatlabel` — плавающая метка внутри поля. Кликните на поле чтобы увидеть анимацию. Требует нативный `<p-inputmask>` как прямой дочерний элемент `p-floatlabel`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { InputMask } from 'primeng/inputmask';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputmask-float-label',
  standalone: true,
  imports: [InputMask, FloatLabel, FormsModule],
  template: \`
    <p-floatlabel variant="in">
      <p-inputmask id="fl-mask" mask="99-99-99" [(ngModel)]="value"></p-inputmask>
      <label for="fl-mask">Дата</label>
    </p-floatlabel>
  \`,
})
export class InputMaskFloatLabelComponent {
  value = '';
}
        `,
      },
    },
  },
};
