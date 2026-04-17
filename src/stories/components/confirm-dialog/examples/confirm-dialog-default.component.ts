import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../lib/components/button/button.component';
import { ConfirmDialogComponent } from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../../lib/components/confirm-dialog/confirm-dialog.service';

const template = `
<div class="bg-surface-ground">
  <button label="Показать диалог" severity="contrast" (click)="showConfirm()"></button>

  <confirm-dialog key="cd-default"></confirm-dialog>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-default',
  standalone: true,
  imports: [ConfirmDialogComponent, ButtonComponent],
  providers: [ConfirmDialogService.providers()],
  template,
})
export class ConfirmDialogDefaultComponent {
  constructor(private confirmDialogService: ConfirmDialogService) {}

  showConfirm(): void {
    this.confirmDialogService.confirm({
      key: 'cd-default',
      message: 'Вы уверены, что хотите продолжить?',
      header: 'Подтверждение',
      icon: 'ti ti-alert-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {},
      reject: () => {},
    });
  }
}
