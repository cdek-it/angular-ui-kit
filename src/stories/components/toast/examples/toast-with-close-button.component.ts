import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraToastComponent } from '../../../../lib/components/toast/toast.component';
import { ExtraToastService } from '../../../../lib/components/toast/toast.service';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' }
] as const;

const template = `
<extra-toast key="with-close"></extra-toast>

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
    <extra-button
      [label]="'Показать: ' + s.label"
      [severity]="s.type === 'error' ? 'danger' : s.type === 'warn' ? 'warning' : null"
      variant="outlined"
      (click)="show(s.type, s.icon)"
    ></extra-button>
  }
</div>
`;
const styles = '';

@Component({
  selector: 'app-toast-with-close-button',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template,
  styles
})
export class ToastWithCloseButtonComponent {
  readonly severities = SEVERITIES;

  constructor(private readonly toastService: ExtraToastService) {}

  show(severity: string, icon: string): void {
    this.toastService.add({
      key: 'with-close',
      severity: severity as any,
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon,
      closable: true
    });
  }
}

export const WithCloseButton: StoryObj = {
  render: () => ({
    template: `<app-toast-with-close-button></app-toast-with-close-button>`
  }),
  parameters: {
    docs: {
      description: { story: 'Уведомления с кнопкой закрытия (closable: true).' },
      source: {
        language: 'ts',
        code: `
import { ExtraButtonComponent, ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' },
] as const;

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template: \`
    <extra-toast key="with-close"></extra-toast>

    <div class="flex flex-wrap gap-2">
      @for (s of severities; track s.type) {
        <extra-button
          [label]="'Показать: ' + s.label"
          [severity]="s.type === 'error' ? 'danger' : s.type === 'warn' ? 'warning' : null"
          variant="outlined"
          (click)="show(s.type, s.icon)"
        ></extra-button>
      }
    </div>
  \`,
})
export class ExampleComponent {
  readonly severities = SEVERITIES;

  constructor(private toastService: ExtraToastService) {}

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
        `
      }
    }
  }
};
