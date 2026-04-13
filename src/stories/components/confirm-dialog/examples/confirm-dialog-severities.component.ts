import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogComponent } from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../../lib/components/confirm-dialog/confirm-dialog.service';

interface SeverityItem {
  type: 'success' | 'info' | 'warn' | 'help' | 'danger';
  buttonSeverity: 'success' | 'info' | 'warn' | 'help' | 'danger';
  icon: string;
  label: string;
  header: string;
  message: string;
  acceptLabel: string;
}

const SEVERITIES: SeverityItem[] = [
  {
    type: 'success',
    buttonSeverity: 'success',
    icon: 'ti ti-circle-check',
    label: 'Успех',
    header: 'Успех',
    message: 'Операция выполнена успешно.',
    acceptLabel: 'OK',
  },
  {
    type: 'info',
    buttonSeverity: 'info',
    icon: 'ti ti-info-circle',
    label: 'Информация',
    header: 'Информация',
    message: 'Это информационное сообщение.',
    acceptLabel: 'Понятно',
  },
  {
    type: 'warn',
    buttonSeverity: 'warn',
    icon: 'ti ti-alert-triangle',
    label: 'Предупреждение',
    header: 'Предупреждение',
    message: 'Внимание! Это действие может иметь последствия.',
    acceptLabel: 'Продолжить',
  },
  {
    type: 'help',
    buttonSeverity: 'help',
    icon: 'ti ti-help-circle',
    label: 'Справка',
    header: 'Справка',
    message: 'Нужна помощь с этим действием?',
    acceptLabel: 'Да',
  },
  {
    type: 'danger',
    buttonSeverity: 'danger',
    icon: 'ti ti-circle-x',
    label: 'Удаление',
    header: 'Подтверждение',
    message: 'Это действие нельзя отменить. Продолжить?',
    acceptLabel: 'Удалить',
  },
];

const template = `
<div class="bg-surface-ground">
  <confirm-dialog key="cd-severity-success" severity="success"></confirm-dialog>
  <confirm-dialog key="cd-severity-info" severity="info"></confirm-dialog>
  <confirm-dialog key="cd-severity-warn" severity="warn"></confirm-dialog>
  <confirm-dialog key="cd-severity-help" severity="help"></confirm-dialog>
  <confirm-dialog key="cd-severity-danger" severity="danger"></confirm-dialog>

  <div class="flex flex-wrap gap-2">
    @for (severity of severities; track severity.type) {
      <p-button
        [label]="'Показать: ' + severity.label"
        [severity]="severity.buttonSeverity"
        variant="outlined"
        (onClick)="showConfirm(severity)"
      ></p-button>
    }
  </div>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-severities',
  standalone: true,
  imports: [ConfirmDialogComponent, Button],
  providers: [ConfirmationService, ConfirmDialogService],
  template,
})
export class ConfirmDialogSeveritiesComponent {
  severities = SEVERITIES;

  constructor(private confirmDialogService: ConfirmDialogService) {}

  showConfirm(severity: SeverityItem): void {
    this.confirmDialogService.confirm({
      key: 'cd-severity-' + severity.type,
      message: severity.message,
      header: severity.header,
      icon: severity.icon,
      acceptLabel: severity.acceptLabel,
      rejectLabel: 'Нет',
      acceptButtonProps: { severity: severity.buttonSeverity },
      accept: () => {},
      reject: () => {},
    });
  }
}
