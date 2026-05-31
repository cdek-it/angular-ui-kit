import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Открыть отчёт"></extra-button>

  <ng-template #footer>
    <extra-button variant="text" label="Закрыть" (click)="visible = false"></extra-button>
    <extra-button label="Экспортировать" (click)="visible = false"></extra-button>
  </ng-template>

  <extra-dialog
    header="Отчёт по доставкам за апрель 2025"
    size="xlg"
    [visible]="visible"
    (visibleChange)="visible = $event"
    [footerTemplate]="footer"
  >
    <p>За апрель 2025 года обработано 4 872 отправления. Успешно доставлено — 4 641 (95,3%). Возвраты — 112 (2,3%). В пути — 119 (2,4%). Средний срок доставки по России составил 2,7 рабочего дня. Наиболее загруженные направления: Москва — Санкт-Петербург, Москва — Новосибирск, Москва — Екатеринбург.</p>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-extra-large',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraButtonComponent],
  template,
})
export class DialogExtraLargeComponent {
  visible = false;
}
