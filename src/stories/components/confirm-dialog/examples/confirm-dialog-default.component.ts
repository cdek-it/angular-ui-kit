import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogComponent } from '../../../../lib/components/confirm-dialog/confirm-dialog.component';

const template = `
<div class="bg-surface-ground">
  <p-button label="Показать диалог" severity="contrast" (onClick)="showConfirm()"></p-button>

  <confirm-dialog key="cd-default"></confirm-dialog>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-default',
  standalone: true,
  imports: [ConfirmDialogComponent, Button],
  providers: [ConfirmationService],
  template,
})
export class ConfirmDialogDefaultComponent {
  constructor(private confirmationService: ConfirmationService) {}

  showConfirm(): void {
    this.confirmationService.confirm({
      key: 'cd-default',
      message: 'Вы уверены, что хотите продолжить?',
      header: 'Подтверждение',
      icon: 'ti ti-alert-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      rejectButtonProps: {
        severity: 'secondary',
        text: true,
      },
      accept: () => {},
      reject: () => {},
    });
  }
}
