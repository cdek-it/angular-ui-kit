import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAccordionComponent, ExtraAccordionItem } from '../../../../lib/components/accordion/accordion.component';

const template = `
<div class="bg-surface-ground">
  <extra-accordion [items]="items" [multiple]="true" activeValue="0"></extra-accordion>
</div>
`;

@Component({
  selector: 'app-accordion-multiple',
  standalone: true,
  imports: [ExtraAccordionComponent],
  template
})
export class AccordionMultipleComponent {
  items: ExtraAccordionItem[] = [
    {
      value: '0',
      header: 'Данные отправления',
      icon: 'ti ti-package',
      content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»'
    },
    {
      value: '1',
      header: 'Маршрут доставки',
      icon: 'ti ti-map-pin',
      content:
        'Принят в Москве 14 апр 09:15 → Сортировочный центр 14 апр 14:30 → Передан перевозчику → Прибыл в Новосибирск 15 апр 08:00 → Доставлен 15 апр 14:20'
    },
    {
      value: '2',
      header: 'Стоимость отправления',
      icon: 'ti ti-receipt',
      content: 'Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321'
    }
  ];
}

export const Multiple: StoryObj = {
  render: () => ({
    template: `<app-accordion-multiple></app-accordion-multiple>`
  }),
  parameters: {
    docs: {
      description: { story: 'Режим множественного раскрытия — несколько панелей могут быть открыты одновременно.' },
      source: {
        language: 'ts',
        code: `
import { ExtraAccordionComponent, ExtraAccordionItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-multiple',
  standalone: true,
  imports: [ExtraAccordionComponent],
  template: \`
  <extra-accordion [items]="items" [multiple]="true" activeValue="0"></extra-accordion>
  \`,
})
export class AccordionMultipleComponent {
  items: ExtraAccordionItem[] = [
    {
      value: '0',
      header: 'Данные отправления',
      icon: 'ti ti-package',
      content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места',
    },
    {
      value: '1',
      header: 'Маршрут доставки',
      icon: 'ti ti-map-pin',
      content: 'Принят в Москве 14 апр 09:15 → Доставлен 15 апр 14:20',
    },
    {
      value: '2',
      header: 'Стоимость отправления',
      icon: 'ti ti-receipt',
      content: 'Итого: 525 ₽ · Оплачено: карта *4321',
    },
  ];
}
        `
      }
    }
  }
};
