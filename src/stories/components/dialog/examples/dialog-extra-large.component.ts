import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <button (click)="visible = true" label="Открыть отчёт"></button>

  <ng-template #footer>
    <button variant="text" label="Закрыть" (click)="visible = false"></button>
    <button label="Экспортировать" (click)="visible = false"></button>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogComponent, ButtonComponent],
  template,
})
export class DialogExtraLargeComponent {
  visible = false;
}
