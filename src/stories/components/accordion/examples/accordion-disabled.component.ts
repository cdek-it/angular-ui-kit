import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import {
  ExtraAccordionComponent,
  ExtraAccordionPanelComponent
} from '../../../../lib/components/accordion/accordion.component';
import { ExtraAccordionPanelTemplateDirective } from '../../../../lib/components/accordion/accordion-panel-template.directive';

const template = `
<div class="bg-surface-ground">
  <extra-accordion>
    <extra-accordion-panel icon="ti ti-package" [expanded]="true">
      <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
      Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»
    </extra-accordion-panel>
    <extra-accordion-panel icon="ti ti-file-description" [disabled]="true">
      <ng-template extraAccordionPanelTemplate="header">Документы (недоступно)</ng-template>
      Документация по отправлению временно недоступна.
    </extra-accordion-panel>
    <extra-accordion-panel icon="ti ti-receipt">
      <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
      Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321
    </extra-accordion-panel>
  </extra-accordion>
</div>
`;

@Component({
  selector: 'app-accordion-disabled',
  standalone: true,
  imports: [ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective],
  template
})
export class AccordionDisabledComponent {}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-accordion-disabled></app-accordion-disabled>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Заблокированная панель (`[disabled]="true"`) — недоступна для раскрытия.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-disabled',
  standalone: true,
  imports: [ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective],
  template: \`
    <extra-accordion>
      <extra-accordion-panel icon="ti ti-package" [expanded]="true">
        <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
        Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места
      </extra-accordion-panel>
      <extra-accordion-panel icon="ti ti-file-description" [disabled]="true">
        <ng-template extraAccordionPanelTemplate="header">Документы (недоступно)</ng-template>
        Документация по отправлению временно недоступна.
      </extra-accordion-panel>
    </extra-accordion>
  \`,
})
export class AccordionDisabledComponent {}
        `
      }
    }
  }
};
