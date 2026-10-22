import { booleanAttribute, ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

export type ExtraStepperItemState = 'default' | 'success' | 'danger';

/**
 * Данные и проекция контента одного шага. Не рендерит p-step/p-step-panel/p-step-item сам —
 * PrimeNG-теги внедряют родителя через DI (pcStepper), поэтому их обязан объявлять
 * ExtraStepperComponent в своём собственном шаблоне (та же ловушка, что у ExtraTabs/ExtraAccordion,
 * см. CLAUDE.md, «Ловушка: PrimeNG-компонент с DI-зависимостью от родителя внутри слота»).
 */
@Component({
  selector: 'extra-stepper-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: contents' },
  template: `<ng-template #bodyTpl><ng-content /></ng-template>`
})
export class ExtraStepperItemComponent {
  @Input({ required: true }) name!: string;
  @Input() caption = '';
  @Input() state: ExtraStepperItemState = 'default';
  /** Иконка-стрелка вместо номера шага. */
  @Input({ transform: booleanAttribute }) icon = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  @ViewChild('bodyTpl', { static: true }) bodyTpl!: TemplateRef<unknown>;
}
