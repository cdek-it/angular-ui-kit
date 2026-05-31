import { Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraConfirmDialogComponent } from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../../lib/components/confirm-dialog/confirm-dialog.service';

const template = `
<div class="bg-surface-ground">
  <extra-button label="Показать диалог" severity="success" (click)="showConfirm()"></extra-button>

  <extra-confirm-dialog key="cd-default"></extra-confirm-dialog>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-default',
  standalone: true,
  imports: [ExtraConfirmDialogComponent, ExtraButtonComponent],
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

export const Default = {
  name: 'ConfirmDialog',
  render: () => ({
    template: `<app-confirm-dialog-default></app-confirm-dialog-default>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Базовый пример диалога подтверждения.' },
      source: {
        language: 'ts',
        code: `
import { ExtraConfirmDialogComponent, ConfirmDialogService, ExtraButtonComponent, provideConfirmDialog } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-confirm-dialog-default',
  standalone: true,
  imports: [ExtraConfirmDialogComponent, ExtraButtonComponent],
  providers: [provideConfirmDialog()],
  template: \`
    <extra-button label="Показать диалог" severity="success" (click)="showConfirm()"></extra-button>
    <extra-confirm-dialog key="cd-default"></extra-confirm-dialog>
  \`,
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
        `,
      },
    },
  },
};
