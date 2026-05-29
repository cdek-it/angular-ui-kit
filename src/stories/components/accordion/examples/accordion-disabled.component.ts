import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraAccordionComponent, ExtraAccordionItem } from '../../../../lib/components/accordion/accordion.component';

const template = `
<div class="bg-surface-ground">
  <extra-accordion [items]="items" activeValue="0"></extra-accordion>
</div>
`;

@Component({
  selector: 'app-accordion-disabled',
  standalone: true,
  imports: [ExtraAccordionComponent],
  template,
})
export class AccordionDisabledComponent {
  items: ExtraAccordionItem[] = [
    {
      value: '0',
      header: 'Данные отправления',
      icon: 'ti ti-package',
      content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»',
    },
    {
      value: '1',
      header: 'Документы (недоступно)',
      icon: 'ti ti-file-description',
      content: 'Документация по отправлению временно недоступна.',
      disabled: true,
    },
    {
      value: '2',
      header: 'Стоимость отправления',
      icon: 'ti ti-receipt',
      content: 'Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321',
    },
  ];
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-accordion-disabled></app-accordion-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Заблокированная панель — элемент недоступен для взаимодействия.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAccordionComponent, ExtraAccordionItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-disabled',
  standalone: true,
  imports: [ExtraAccordionComponent],
  template: \`
  <extra-accordion [items]="items" activeValue="0"></extra-accordion>
  \`,
})
export class AccordionDisabledComponent {
  items: ExtraAccordionItem[] = [
    {
      value: '0',
      header: 'Данные отправления',
      icon: 'ti ti-package',
      content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места',
    },
    {
      value: '1',
      header: 'Документы (недоступно)',
      icon: 'ti ti-file-description',
      content: 'Документация по отправлению временно недоступна.',
      disabled: true,
    },
    {
      value: '2',
      header: 'Стоимость отправления',
      icon: 'ti ti-receipt',
      content: 'Итого: 525 ₽ · Оплачено: карта *4321',
    },
  ];
}
        `,
      },
    },
  },
};
