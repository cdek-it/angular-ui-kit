import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import {
  ExtraAccordionComponent,
  ExtraAccordionPanelComponent
} from '../../../../lib/components/accordion/accordion.component';
import { ExtraAccordionPanelTemplateDirective } from '../../../../lib/components/accordion/accordion-panel-template.directive';

const template = `
<div class="bg-surface-ground">
  <extra-accordion [multiple]="true">
    <extra-accordion-panel icon="ti ti-package" [expanded]="true">
      <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
      Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»
    </extra-accordion-panel>
    <extra-accordion-panel icon="ti ti-map-pin">
      <ng-template extraAccordionPanelTemplate="header">Маршрут доставки</ng-template>
      Принят в Москве 14 апр 09:15 → Сортировочный центр 14 апр 14:30 → Передан перевозчику → Прибыл в Новосибирск 15
      апр 08:00 → Доставлен 15 апр 14:20
    </extra-accordion-panel>
    <extra-accordion-panel icon="ti ti-receipt" [expanded]="true">
      <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
      Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321
    </extra-accordion-panel>
  </extra-accordion>
</div>
`;

@Component({
  selector: 'app-accordion-multiple',
  standalone: true,
  imports: [ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective],
  template
})
export class AccordionMultipleComponent {}

export const Multiple: StoryObj = {
  render: () => ({
    template: `<app-accordion-multiple></app-accordion-multiple>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Режим множественного раскрытия — несколько панелей могут быть открыты одновременно.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-multiple',
  standalone: true,
  imports: [ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective],
  template: \`
    <extra-accordion [multiple]="true">
      <extra-accordion-panel icon="ti ti-package" [expanded]="true">
        <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
        Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места
      </extra-accordion-panel>
      <extra-accordion-panel icon="ti ti-receipt" [expanded]="true">
        <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
        Итого: 525 ₽ · Оплачено: карта *4321
      </extra-accordion-panel>
    </extra-accordion>
  \`,
})
export class AccordionMultipleComponent {}
        `
      }
    }
  }
};
