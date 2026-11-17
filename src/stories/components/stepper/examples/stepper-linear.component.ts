import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraStepperComponent } from '../../../../lib/components/stepper/stepper.component';
import { ExtraStepperItemComponent } from '../../../../lib/components/stepper/stepper-item.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

@Component({
  selector: 'app-stepper-linear',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent, ExtraButtonComponent],
  template: `
    <extra-stepper #stepper="extraStepper" [linear]="true">
      <extra-stepper-item name="Получатель" caption="данные">
        <p class="m-0">Шаг 1</p>
        <extra-button
          class="mt-4 inline-block"
          label="Вперёд"
          variant="secondary"
          (click)="stepper.next()"
        ></extra-button>
      </extra-stepper-item>
      <extra-stepper-item name="Адрес" caption="доставки">
        <p class="m-0">Шаг 2</p>
        <extra-button
          class="mt-4 inline-block"
          label="Вперёд"
          variant="secondary"
          (click)="stepper.next()"
        ></extra-button>
      </extra-stepper-item>
      <extra-stepper-item name="Оплата" caption="способ">Шаг 3</extra-stepper-item>
    </extra-stepper>
  `
})
export class StepperLinearComponent {}

export const Linear: StoryObj = {
  render: () => ({
    template: `<app-stepper-linear></app-stepper-linear>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Линейный режим — переход к следующему шагу только после завершения текущего (клик по заголовку будущего шага игнорируется, нужна кнопка «Вперёд»).'
      },
      source: { language: 'html', type: 'code', code: '<extra-stepper [linear]="true"></extra-stepper>' }
    }
  }
};
