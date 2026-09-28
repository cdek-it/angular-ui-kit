import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import {
  ExtraAccordionComponent,
  ExtraAccordionPanelComponent
} from '../../../../lib/components/accordion/accordion.component';
import { ExtraAccordionPanelTemplateDirective } from '../../../../lib/components/accordion/accordion-panel-template.directive';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-accordion>
    <extra-accordion-panel [expanded]="true">
      <ng-template extraAccordionPanelTemplate="header">
        <div class="flex items-center gap-2">
          <i class="ti ti-package text-primary text-xl"></i>
          <span class="font-semibold">Заказ №ЦД-00123456</span>
          <extra-tag severity="warning" value="в пути"></extra-tag>
        </div>
      </ng-template>

      <p>Слот content — основное содержимое панели: любые элементы, формы, списки.</p>
      <div class="flex gap-2 mt-3">
        <extra-button variant="text" label="Скачать накладную" icon="ti ti-download" size="small"></extra-button>
        <extra-button label="Отследить" icon="ti ti-map-pin" size="small"></extra-button>
      </div>
    </extra-accordion-panel>

    <extra-accordion-panel icon="ti ti-receipt">
      <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
      Итого: 525 ₽ · Оплачено: карта *4321
    </extra-accordion-panel>
  </extra-accordion>
</div>
`;

@Component({
  selector: 'app-accordion-slots',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExtraAccordionComponent,
    ExtraAccordionPanelComponent,
    ExtraAccordionPanelTemplateDirective,
    ExtraTagComponent,
    ExtraButtonComponent
  ],
  template
})
export class AccordionSlotsComponent {}

export const Slots: StoryObj = {
  render: () => ({
    template: `<app-accordion-slots></app-accordion-slots>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Оба слота панели: header — именованный шаблон extraAccordionPanelTemplate="header" (иконка, текст, тег), content — основное содержимое панели: любой проецируемый контент без обёртки (текст, кнопки).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-slots',
  standalone: true,
  imports: [ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective],
  template: \`
    <extra-accordion>
      <extra-accordion-panel [expanded]="true">
        <!-- header: именованный шаблон — можно вставить что угодно, не только текст -->
        <ng-template extraAccordionPanelTemplate="header">
          <div class="flex items-center gap-2">
            <i class="ti ti-package"></i>
            <span class="font-semibold">Заказ №ЦД-00123456</span>
            <extra-tag severity="warning" value="в пути"></extra-tag>
          </div>
        </ng-template>

        <!-- content: основное содержимое панели, без директивы -->
        <p>Слот content — основное содержимое панели.</p>
        <extra-button label="Отследить" icon="ti ti-map-pin" size="small"></extra-button>
      </extra-accordion-panel>
    </extra-accordion>
  \`,
})
export class AccordionSlotsComponent {}
        `
      }
    }
  }
};
