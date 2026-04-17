import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { DynamicDialogRef, UiDialogService } from '../../../../lib/components/dialog/dialog-open.service';

// ── Содержимое диалога ────────────────────────────────────────────────────────

@Component({
  selector: 'app-dialog-dynamic-content',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
    <p>Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок — 3 рабочих дня.</p>
    <div class="flex justify-end gap-2 mt-4">
      <button variant="text" label="Отмена" (click)="ref.close()"></button>
      <button label="Подтвердить" (click)="ref.close(true)"></button>
    </div>
  `,
})
export class DialogDynamicContentComponent {
  constructor(readonly ref: DynamicDialogRef) {}
}

// ── Компонент-триггер ─────────────────────────────────────────────────────────

export const template = `
<div class="bg-surface-ground">
  <button (click)="open()" label="Создать заявку"></button>
</div>
`;

@Component({
  selector: 'app-dialog-dynamic',
  standalone: true,
  imports: [ButtonComponent],
  providers: [UiDialogService.providers()],
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
