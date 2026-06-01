import { Component } from '@angular/core';
import { ExtraScrollPanelComponent } from '../../../../lib/components/scroll-panel/scroll-panel.component';

const template = `
<div class="bg-surface-ground">
  <extra-scroll-panel height="200px">
    <div style="width: max-content">
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Принят 14 апр 09:15 · Доставлен 15 апр 14:20</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123457 · Санкт-Петербург → Казань · 0.8 кг · 1 место · Принят 13 апр 11:00 · Доставлен 15 апр 10:30</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123458 · Екатеринбург → Краснодар · 5.2 кг · 2 места · Принят 12 апр 08:45 · В пути</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123459 · Нижний Новгород → Омск · 1.1 кг · 1 место · Принят 14 апр 15:00 · Ожидает отправки</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123460 · Самара → Ростов-на-Дону · 3.7 кг · 4 места · Принят 11 апр 13:20 · Доставлен 14 апр 09:00</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123461 · Уфа → Владивосток · 7.3 кг · 5 мест · Принят 10 апр 10:00 · Задержан на сортировке</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123462 · Пермь → Иркутск · 2.0 кг · 2 места · Принят 13 апр 09:30 · В пути</p>
      <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123463 · Воронеж → Красноярск · 4.5 кг · 3 места · Принят 12 апр 16:00 · В пути</p>
    </div>
  </extra-scroll-panel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-scroll-panel-both',
  standalone: true,
  imports: [ExtraScrollPanelComponent],
  template,
  styles,
})
export class ScrollPanelBothComponent {}
