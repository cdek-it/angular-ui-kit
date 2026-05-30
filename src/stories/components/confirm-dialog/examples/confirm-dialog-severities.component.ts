import { Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraConfirmDialogComponent } from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
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
  <extra-confirm-dialog key="cd-severity-success" severity="success"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-severity-info" severity="info"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-severity-warn" severity="warn"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-severity-help" severity="help"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-severity-danger" severity="danger"></extra-confirm-dialog>

  <div class="flex flex-wrap gap-2">
    @for (severity of severities; track severity.type) {
      <extra-button
        [label]="'Показать: ' + severity.label"
        [severity]="severity.buttonSeverity"
        variant="outlined"
        (click)="showConfirm(severity)"
      ></extra-button>
    }
  </div>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-severities',
  standalone: true,
  imports: [ExtraConfirmDialogComponent, ExtraButtonComponent],
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

export const Severities = {
  name: 'Severities',
  render: () => ({
    template: `<app-confirm-dialog-severities></app-confirm-dialog-severities>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Варианты диалога с различными уровнями важности: success, info, warn, help, danger.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraConfirmDialogComponent, ConfirmDialogService, ExtraButtonComponent, provideConfirmDialog } from '@cdek-it/angular-ui-kit';

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
  { type: 'success', buttonSeverity: 'success', icon: 'ti ti-circle-check', label: 'Успех', header: 'Успех', message: 'Операция выполнена успешно.', acceptLabel: 'OK' },
  { type: 'info', buttonSeverity: 'info', icon: 'ti ti-info-circle', label: 'Информация', header: 'Информация', message: 'Это информационное сообщение.', acceptLabel: 'Понятно' },
  { type: 'warn', buttonSeverity: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение', header: 'Предупреждение', message: 'Внимание! Это действие может иметь последствия.', acceptLabel: 'Продолжить' },
  { type: 'help', buttonSeverity: 'help', icon: 'ti ti-help-circle', label: 'Справка', header: 'Справка', message: 'Нужна помощь с этим действием?', acceptLabel: 'Да' },
  { type: 'danger', buttonSeverity: 'danger', icon: 'ti ti-circle-x', label: 'Удаление', header: 'Подтверждение', message: 'Это действие нельзя отменить. Продолжить?', acceptLabel: 'Удалить' },
];

@Component({
  selector: 'app-confirm-dialog-severities',
  standalone: true,
  imports: [ExtraConfirmDialogComponent, ExtraButtonComponent],
  providers: [provideConfirmDialog()],
  template: \`
    <extra-confirm-dialog key="cd-severity-success" severity="success"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-severity-info" severity="info"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-severity-warn" severity="warn"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-severity-help" severity="help"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-severity-danger" severity="danger"></extra-confirm-dialog>

    <div class="flex flex-wrap gap-2">
      @for (severity of severities; track severity.type) {
        <extra-button
          [label]="'Показать: ' + severity.label"
          [severity]="severity.buttonSeverity"
          variant="outlined"
          (click)="showConfirm(severity)"
        ></extra-button>
      }
    </div>
  \`,
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
        `,
      },
    },
  },
};
