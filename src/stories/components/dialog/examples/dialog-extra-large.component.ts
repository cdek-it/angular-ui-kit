import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="visible = true" label="Открыть отчёт"></p-button>

  <ng-template #footer>
    <p-button variant="text" label="Закрыть" (onClick)="visible = false"></p-button>
    <p-button label="Экспортировать" (onClick)="visible = false"></p-button>
  </ng-template>

  <dialog
    header="Отчёт по доставкам за апрель 2025"
    size="xlg"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>За апрель 2025 года обработано 4 872 отправления. Успешно доставлено — 4 641 (95,3%). Возвраты — 112 (2,3%). В пути — 119 (2,4%). Средний срок доставки по России составил 2,7 рабочего дня. Наиболее загруженные направления: Москва — Санкт-Петербург, Москва — Новосибирск, Москва — Екатеринбург.</p>
  </dialog>
</div>
`;

@Component({
  selector: 'app-dialog-extra-large',
  standalone: true,
  imports: [DialogComponent, Button],
  template,
})
export class DialogExtraLargeComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
