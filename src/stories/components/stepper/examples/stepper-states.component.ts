import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraStepperComponent } from '../../../../lib/components/stepper/stepper.component';
import { ExtraStepperItemComponent } from '../../../../lib/components/stepper/stepper-item.component';

@Component({
  selector: 'app-stepper-states',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-stepper [value]="2">
        <extra-stepper-item name="Получатель" caption="готово" state="success">Шаг 1 — завершён</extra-stepper-item>
        <extra-stepper-item name="Адрес" caption="ошибка" state="danger">Шаг 2 — ошибка в адресе</extra-stepper-item>
        <extra-stepper-item name="Оплата" caption="недоступно" [disabled]="true">Шаг 3 — недоступен</extra-stepper-item>
      </extra-stepper>
    </div>
  `
})
export class StepperStatesComponent {}

export const States: StoryObj = {
  name: 'States (success / danger / disabled)',
  render: () => ({
    template: `<app-stepper-states></app-stepper-states>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: '`state="success"`/`state="danger"` — визуальные состояния шага; `[disabled]="true"` блокирует переход.' },
      source: {
        language: 'ts',
        code: `
import { ExtraStepperComponent, ExtraStepperItemComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-stepper-states',
  standalone: true,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent],
  template: \`
    <extra-stepper [value]="2">
      <extra-stepper-item name="Получатель" state="success">Шаг 1 — завершён</extra-stepper-item>
      <extra-stepper-item name="Адрес" state="danger">Шаг 2 — ошибка в адресе</extra-stepper-item>
      <extra-stepper-item name="Оплата" [disabled]="true">Шаг 3 — недоступен</extra-stepper-item>
    </extra-stepper>
  \`,
})
export class StepperStatesComponent {}
        `
      }
    }
  }
};
