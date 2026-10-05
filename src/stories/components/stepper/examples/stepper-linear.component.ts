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
    <div class="bg-surface-ground">
      <extra-stepper #stepper="extraStepper" [linear]="true">
        <extra-stepper-item name="Получатель" caption="данные">
          <p class="m-0">Шаг 1</p>
          <extra-button class="mt-4 inline-block" label="Вперёд" variant="secondary" (click)="stepper.next()"></extra-button>
        </extra-stepper-item>
        <extra-stepper-item name="Адрес" caption="доставки">
          <p class="m-0">Шаг 2</p>
          <extra-button class="mt-4 inline-block" label="Вперёд" variant="secondary" (click)="stepper.next()"></extra-button>
        </extra-stepper-item>
        <extra-stepper-item name="Оплата" caption="способ">Шаг 3</extra-stepper-item>
      </extra-stepper>
    </div>
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
      description: { story: 'Линейный режим — переход к следующему шагу только после завершения текущего (клик по заголовку будущего шага игнорируется, нужна кнопка «Вперёд»).' },
      source: {
        language: 'ts',
        code: `
import { ExtraStepperComponent, ExtraStepperItemComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-linear',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent],
  template: \`
    <extra-stepper #stepper="extraStepper" [linear]="true">
      <extra-stepper-item name="Получатель">
        Шаг 1
        <extra-button label="Вперёд" (click)="stepper.next()"></extra-button>
      </extra-stepper-item>
      <extra-stepper-item name="Адрес">Шаг 2</extra-stepper-item>
    </extra-stepper>
  \`,
})
export class StepperLinearComponent {}
        `
      }
    }
  }
};
