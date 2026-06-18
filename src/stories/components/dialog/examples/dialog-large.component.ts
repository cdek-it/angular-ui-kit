import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogFooterDirective } from '../../../../lib/components/dialog/dialog.component';

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="visible = true" label="Детали отправления"></extra-button>

  <extra-dialog
    header="Детали отправления"
    size="lg"
    [visible]="visible"
    (visibleChange)="visible = $event"
  >
    <p>Отправление CDEK-2025-00478312 передано курьеру для доставки до двери получателя. Последнее обновление: 09.04.2025, 14:35. Адрес доставки: г. Новосибирск, ул. Ленина, 42, кв. 8. Получатель: Иванов И.И., +7 913 000-00-00.</p>
    <ng-template extraDialogFooter>
      <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
      <extra-button label="Сохранить" (click)="visible = false"></extra-button>
    </ng-template>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-large',
  standalone: true,
  imports: [ExtraDialogComponent, ExtraDialogFooterDirective, ExtraButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template
})
export class DialogLargeComponent {
  visible = false;
}
