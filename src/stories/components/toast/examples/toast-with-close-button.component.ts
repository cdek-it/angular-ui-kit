import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Button } from 'primeng/button';
import { ToastComponent } from '../../../../lib/components/toast/toast.component';
import { UiToastService } from '../../../../lib/components/toast/toast.service';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' },
] as const;

const template = `
<ui-toast key="with-close"></ui-toast>

<div class="flex flex-col gap-4">
  @for (s of severities; track s.type) {
    <div [class]="'p-toast-message p-toast-message-' + s.type">
      <div class="p-toast-message-content">
        <div class="p-toast-accent-line"></div>
        <i [class]="s.icon + ' p-toast-message-icon'"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">Сообщение</span>
          <div class="p-toast-detail">Подпись</div>
        </div>
        <button
          type="button"
          class="p-button p-component p-button-text p-toast-close-button"
        >
          <span class="p-button-icon ti ti-x"></span>
        </button>
      </div>
    </div>
  }
</div>

<div class="flex flex-wrap gap-2 mt-6">
  @for (s of severities; track s.type) {
    <p-button
      [label]="'Показать: ' + s.label"
      [severity]="s.type === 'error' ? 'danger' : s.type === 'warn' ? 'warn' : s.type"
      variant="outlined"
      (onClick)="show(s.type, s.icon)"
    ></p-button>
  }
</div>
`;
const styles = '';

@Component({
  selector: 'app-toast-with-close-button',
  standalone: true,
  imports: [ToastComponent, Button],
  template,
  styles,
})
export class ToastWithCloseButtonComponent {
  readonly severities = SEVERITIES;

  constructor(private readonly toastService: UiToastService) {}

  show(severity: string, icon: string): void {
    this.toastService.add({
      key: 'with-close',
      severity: severity as any,
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon,
      closable: true,
    });
  }
}

export const WithCloseButton: StoryObj = {
  render: () => ({
    template: `<app-toast-with-close-button></app-toast-with-close-button>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Уведомления с кнопкой закрытия (closable: true).' },
      source: {
        language: 'ts',
        code: `
this.toastService.add({
  key: 'my-toast',
  severity: 'info',
  summary: 'Сообщение',
  detail: 'Подпись',
  life: 5000,
  icon: 'ti ti-info-circle',
  closable: true,
});
        `,
      },
    },
  },
};
