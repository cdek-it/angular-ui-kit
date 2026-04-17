import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ConfirmDialogComponent } from '../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogDefaultComponent } from './examples/confirm-dialog-default.component';
import { ConfirmDialogSeveritiesComponent } from './examples/confirm-dialog-severities.component';
import { ConfirmDialogSizesComponent } from './examples/confirm-dialog-sizes.component';

const meta: Meta<ConfirmDialogComponent> = {
  title: 'Components/Overlay/ConfirmDialog',
  component: ConfirmDialogComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Компонент для подтверждения действий пользователя.

\`\`\`typescript
import { ConfirmDialogComponent, ConfirmDialogService } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-confirmdialog' },
  },
  argTypes: {
    key: {
      control: 'text',
      description: 'Идентификатор группы для адресной отправки сообщений.',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xlg'],
      description: 'Размер диалога',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'sm' | 'default' | 'lg' | 'xlg'" },
      },
    },
    severity: {
      control: 'select',
      options: ['default', 'success', 'info', 'warn', 'help', 'danger'],
      description: 'Цветовая схема иконки в заголовке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'success' | 'info' | 'warn' | 'help' | 'danger'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ConfirmDialogComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'ConfirmDialog',
  decorators: [moduleMetadata({ imports: [ConfirmDialogDefaultComponent] })],
  render: () => ({ template: `<app-confirm-dialog-default></app-confirm-dialog-default>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример диалога подтверждения.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogService, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-confirm-dialog-default',
  standalone: true,
  imports: [ConfirmDialogComponent, ButtonComponent],
  providers: [ConfirmDialogService.providers()],
  template: \`
    <button label="Показать диалог" severity="contrast" (click)="showConfirm()"></button>
    <confirm-dialog key="cd-default"></confirm-dialog>
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

// ── Severities ────────────────────────────────────────────────────────────────

export const Severities: Story = {
  name: 'Severities',
  decorators: [moduleMetadata({ imports: [ConfirmDialogSeveritiesComponent] })],
  render: () => ({ template: `<app-confirm-dialog-severities></app-confirm-dialog-severities>` }),
  parameters: {
    docs: {
      description: {
        story: 'Варианты диалога с различными уровнями важности: success, info, warn, help, danger.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogService, ButtonComponent } from '@cdek-it/angular-ui-kit';

const SEVERITIES = [
  { type: 'success', buttonSeverity: 'success', icon: 'ti ti-circle-check', label: 'Успех', header: 'Успех', message: 'Операция выполнена успешно.', acceptLabel: 'OK' },
  { type: 'info', buttonSeverity: 'info', icon: 'ti ti-info-circle', label: 'Информация', header: 'Информация', message: 'Это информационное сообщение.', acceptLabel: 'Понятно' },
  { type: 'warn', buttonSeverity: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение', header: 'Предупреждение', message: 'Внимание! Это действие может иметь последствия.', acceptLabel: 'Продолжить' },
  { type: 'help', buttonSeverity: 'help', icon: 'ti ti-help-circle', label: 'Справка', header: 'Справка', message: 'Нужна помощь с этим действием?', acceptLabel: 'Да' },
  { type: 'danger', buttonSeverity: 'danger', icon: 'ti ti-circle-x', label: 'Удаление', header: 'Подтверждение', message: 'Это действие нельзя отменить. Продолжить?', acceptLabel: 'Удалить' },
];

@Component({
  selector: 'app-confirm-dialog-severities',
  standalone: true,
  imports: [ConfirmDialogComponent, ButtonComponent],
  providers: [ConfirmDialogService.providers()],
  template: \`
    <confirm-dialog key="cd-severity-success" severity="success"></confirm-dialog>
    <confirm-dialog key="cd-severity-info" severity="info"></confirm-dialog>
    <confirm-dialog key="cd-severity-warn" severity="warn"></confirm-dialog>
    <confirm-dialog key="cd-severity-help" severity="help"></confirm-dialog>
    <confirm-dialog key="cd-severity-danger" severity="danger"></confirm-dialog>

    <div class="flex flex-wrap gap-2">
      @for (severity of severities; track severity.type) {
        <button
          [label]="'Показать: ' + severity.label"
          [severity]="severity.buttonSeverity"
          variant="outlined"
          (click)="showConfirm(severity)"
        ></button>
      }
    </div>
  \`,
})
export class ConfirmDialogSeveritiesComponent {
  severities = SEVERITIES;
  constructor(private confirmDialogService: ConfirmDialogService) {}

  showConfirm(severity: any): void {
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

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  decorators: [moduleMetadata({ imports: [ConfirmDialogSizesComponent] })],
  render: () => ({ template: `<app-confirm-dialog-sizes></app-confirm-dialog-sizes>` }),
  parameters: {
    docs: {
      description: {
        story: 'Доступные размеры диалога: sm, base, lg, xlg.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogService, ButtonComponent } from '@cdek-it/angular-ui-kit';

const SIZES = [
  { key: 'sm', label: 'Small' },
  { key: 'default', label: 'Base' },
  { key: 'lg', label: 'Large' },
  { key: 'xlg', label: 'Extra Large' },
];

@Component({
  selector: 'app-confirm-dialog-sizes',
  standalone: true,
  imports: [ConfirmDialogComponent, ButtonComponent],
  providers: [ConfirmDialogService.providers()],
  template: \`
    <confirm-dialog key="cd-size-sm" size="sm"></confirm-dialog>
    <confirm-dialog key="cd-size-default"></confirm-dialog>
    <confirm-dialog key="cd-size-lg" size="lg"></confirm-dialog>
    <confirm-dialog key="cd-size-xlg" size="xlg"></confirm-dialog>

    <div class="flex flex-wrap gap-2">
      @for (size of sizes; track size.key) {
        <button [label]="size.label" severity="contrast" (click)="showConfirm(size)"></button>
      }
    </div>
  \`,
})
export class ConfirmDialogSizesComponent {
  sizes = SIZES;
  constructor(private confirmDialogService: ConfirmDialogService) {}

  showConfirm(size: any): void {
    this.confirmDialogService.confirm({
      key: 'cd-size-' + size.key,
      message: 'Это диалог размера ' + size.label,
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
