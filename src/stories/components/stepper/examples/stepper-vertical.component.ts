import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraStepperComponent } from '../../../../lib/components/stepper/stepper.component';
import { ExtraStepperItemComponent } from '../../../../lib/components/stepper/stepper-item.component';

@Component({
  selector: 'app-stepper-vertical',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-stepper orientation="vertical">
        <extra-stepper-item name="Получатель" caption="данные">Шаг 1</extra-stepper-item>
        <extra-stepper-item name="Адрес" caption="доставки">Шаг 2</extra-stepper-item>
        <extra-stepper-item name="Оплата" caption="способ">Шаг 3</extra-stepper-item>
      </extra-stepper>
    </div>
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
      source: {
        language: 'ts',
        code: `
import { ExtraStepperComponent, ExtraStepperItemComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-vertical',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent],
  template: \`
    <extra-stepper orientation="vertical">
      <extra-stepper-item name="Получатель" caption="данные">Шаг 1</extra-stepper-item>
      <extra-stepper-item name="Адрес" caption="доставки">Шаг 2</extra-stepper-item>
      <extra-stepper-item name="Оплата" caption="способ">Шаг 3</extra-stepper-item>
    </extra-stepper>
  \`,
})
export class StepperVerticalComponent {}
        `
      }
    }
  }
};
