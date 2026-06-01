import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { DynamicDialogRef, ExtraDialogService } from '../../../../lib/components/dialog/dialog-open.service';

// ── Содержимое диалога ────────────────────────────────────────────────────────

@Component({
  selector: 'app-dialog-dynamic-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template: `
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
    <p>Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок — 3 рабочих дня.</p>
    <div class="flex justify-end gap-2 mt-4">
      <extra-button variant="text" label="Отмена" (click)="ref.close()"></extra-button>
      <extra-button label="Подтвердить" (click)="ref.close(true)"></extra-button>
    </div>
  `
})
export class DialogDynamicContentComponent {
  constructor(readonly ref: DynamicDialogRef) {}
}

// ── Компонент-триггер ─────────────────────────────────────────────────────────

export const template = `
<div class="bg-surface-ground">
  <extra-button (click)="open()" label="Создать заявку"></extra-button>
</div>
`;

@Component({
  selector: 'app-dialog-dynamic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class DialogDynamicComponent {
  constructor(private readonly dialogService: ExtraDialogService) {}

  open(): void {
    this.dialogService.open(DialogDynamicContentComponent, {
      header: 'Подтверждение заявки',
      modal: true
    });
  }
}
