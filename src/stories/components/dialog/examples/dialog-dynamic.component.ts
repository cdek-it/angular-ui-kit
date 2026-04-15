import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UiDialogService } from '../../../../lib/components/dialog/dialog-open.service';

// ── Содержимое диалога ────────────────────────────────────────────────────────

@Component({
  selector: 'app-dialog-dynamic-content',
  standalone: true,
  imports: [Button],
  template: `
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
    <p>Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок — 3 рабочих дня.</p>
    <div class="flex justify-end gap-2 mt-4">
      <p-button variant="text" label="Отмена" (onClick)="ref.close()"></p-button>
      <p-button label="Подтвердить" (onClick)="ref.close(true)"></p-button>
    </div>
  `,
})
export class DialogDynamicContentComponent {
  constructor(readonly ref: DynamicDialogRef) {}
}

// ── Компонент-триггер ─────────────────────────────────────────────────────────

export const template = `
<div class="bg-surface-ground">
  <p-button (onClick)="open()" label="Создать заявку"></p-button>
</div>
`;

@Component({
  selector: 'app-dialog-dynamic',
  standalone: true,
  imports: [Button],
  providers: [DialogService, UiDialogService],
  template,
})
export class DialogDynamicComponent {
  constructor(private readonly dialogService: UiDialogService) {}

  open(): void {
    this.dialogService.open(DialogDynamicContentComponent, {
      header: 'Подтверждение заявки',
      modal: true,
    });
  }
}
