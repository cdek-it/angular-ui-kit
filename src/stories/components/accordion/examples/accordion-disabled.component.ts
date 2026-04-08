import { Component } from '@angular/core';
import { AccordionComponent, AccordionItem } from '../../../../lib/components/accordion/accordion.component';

const items: AccordionItem[] = [
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

const template = `
<div class="bg-surface-ground">
  <accordion [items]="items" activeValue="0"></accordion>
</div>
`;
const styles = '';

@Component({
  selector: 'app-accordion-disabled',
  standalone: true,
  imports: [AccordionComponent],
  template,
  styles,
})
export class AccordionDisabledComponent {
  items = items;
}
