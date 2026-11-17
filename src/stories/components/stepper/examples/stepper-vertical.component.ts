import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraStepperComponent } from '../../../../lib/components/stepper/stepper.component';
import { ExtraStepperItemComponent } from '../../../../lib/components/stepper/stepper-item.component';

@Component({
  selector: 'app-stepper-vertical',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent],
  template: `
    <extra-stepper orientation="vertical">
      <extra-stepper-item name="Получатель" caption="данные">Шаг 1</extra-stepper-item>
      <extra-stepper-item name="Адрес" caption="доставки">Шаг 2</extra-stepper-item>
      <extra-stepper-item name="Оплата" caption="способ">Шаг 3</extra-stepper-item>
    </extra-stepper>
  `
})
export class StepperVerticalComponent {}

export const Vertical: StoryObj = {
  render: () => ({
    template: `<app-stepper-vertical></app-stepper-vertical>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Вертикальная ориентация степпера.' },
      source: { language: 'html', type: 'code', code: '<extra-stepper orientation="vertical"></extra-stepper>' }
    }
  }
};
