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
    header: 'Маршрут доставки',
    icon: 'ti ti-map-pin',
    content: 'Принят в Москве 14 апр 09:15 → Сортировочный центр 14 апр 14:30 → Передан перевозчику → Прибыл в Новосибирск 15 апр 08:00 → Доставлен 15 апр 14:20',
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
  <accordion [items]="items" [multiple]="true" activeValue="0"></accordion>
</div>
`;
const styles = '';

@Component({
  selector: 'app-accordion-multiple',
  standalone: true,
  imports: [AccordionComponent],
  template,
  styles,
})
export class AccordionMultipleComponent {
  items = items;
}
