import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ExtraStepperComponent } from '../../../../lib/components/stepper/stepper.component';
import { ExtraStepperItemComponent } from '../../../../lib/components/stepper/stepper-item.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

@Component({
  selector: 'app-stepper-default',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraStepperComponent, ExtraStepperItemComponent, ExtraButtonComponent],
  template: `
    <extra-stepper #stepper="extraStepper" [orientation]="orientation" [line]="line" [linear]="linear">
      <extra-stepper-item name="Получатель" caption="данные">
        <p class="m-0">Шаг 1</p>
        <div class="flex pt-4">
          <extra-button label="Вперёд" variant="secondary" (click)="stepper.next()"></extra-button>
        </div>
      </extra-stepper-item>
      <extra-stepper-item name="Адрес" caption="доставки">
        <p class="m-0">Шаг 2</p>
        <div class="flex gap-2 pt-4">
          <extra-button label="Назад" variant="tertiary" (click)="stepper.prev()"></extra-button>
          <extra-button label="Вперёд" variant="secondary" (click)="stepper.next()"></extra-button>
        </div>
      </extra-stepper-item>
      <extra-stepper-item name="Оплата" caption="способ">
        <p class="m-0">Шаг 3</p>
        <div class="flex pt-4">
          <extra-button label="Назад" variant="tertiary" (click)="stepper.prev()"></extra-button>
        </div>
      </extra-stepper-item>
    </extra-stepper>
  `
})
export class StepperDefaultComponent {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() line = true;
  @Input() linear = false;
}
