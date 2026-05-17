import { Component } from '@angular/core';
import { ExtraScrollPanelComponent } from '../../../../lib/components/scroll-panel/scroll-panel.component';

const template = `
<div class="bg-surface-ground">
  <extra-scroll-panel height="80px">
    <p style="white-space: nowrap; margin: 0; line-height: 1.5">
      Заказ №ЦД-00123456 · Москва → Новосибирск · Принят 14 апр 09:15 · Передан перевозчику 14 апр 14:30 · Отправлен из Москвы 14 апр 23:50 · Прибыл в Новосибирск 15 апр 08:00 · Передан курьеру Петрову А.В. 15 апр 12:00 · Доставлен получателю 15 апр 14:20
    </p>
  </extra-scroll-panel>
</div>
`;
const styles = '';

@Component({
  selector: 'app-scroll-panel-horizontal',
  standalone: true,
  imports: [ExtraScrollPanelComponent],
  template,
  styles,
})
export class ScrollPanelHorizontalComponent {}
