import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraToastComponent } from '../../../../lib/components/toast/toast.component';
import { ExtraToastService } from '../../../../lib/components/toast/toast.service';

const SEVERITIES = [
  { severity: 'info', primeClass: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { severity: 'success', primeClass: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { severity: 'warning', primeClass: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { severity: 'danger', primeClass: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' }
] as const;

const template = `
<extra-toast key="with-close"></extra-toast>

<div class="flex flex-col gap-4">
  @for (s of severities; track s.severity) {
    <div [class]="'p-toast-message p-toast-message-' + s.primeClass">
      <div class="p-toast-message-content">
        <div class="p-toast-accent-line"></div>
        <i [class]="s.icon + ' p-toast-message-icon'"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">Сообщение</span>
          <div class="p-toast-detail">Подпись</div>
        </div>
        <button type="button" class="p-button p-component p-button-text p-toast-close-button">
          <span class="p-button-icon ti ti-x"></span>
        </button>
      </div>
    </div>
  }
</div>

<div class="flex flex-wrap gap-2 mt-6">
  @for (s of severities; track s.severity) {
    <extra-button
      [label]="'Показать: ' + s.label"
      [severity]="s.severity === 'danger' || s.severity === 'warning' ? s.severity : 'base'"
      variant="tertiary"
      (click)="show(s.severity, s.icon)"
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

  show(severity: 'info' | 'success' | 'warning' | 'danger', icon: string): void {
    this.toastService.add({
      key: 'with-close',
      severity,
      message: 'Сообщение',
      caption: 'Подпись',
      icon,
      showClose: true
    });
  }
}

export const WithCloseButton: StoryObj = {
  render: () => ({
    template: `<app-toast-with-close-button></app-toast-with-close-button>`
  }),
  parameters: {
    docs: {
      description: { story: 'Уведомления с кнопкой закрытия (`showClose: true`).' },
      source: {
        language: 'ts',
        code: `
import { ExtraButtonComponent, ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template: \`
    <extra-toast key="with-close"></extra-toast>

    <extra-button label="Показать" variant="tertiary" (click)="show()"></extra-button>
  \`,
})
export class ExampleComponent {
  constructor(private toastService: ExtraToastService) {}

  show(): void {
    this.toastService.add({
      key: 'with-close',
      severity: 'info',
      message: 'Сообщение',
      caption: 'Подпись',
      showClose: true,
    });
  }
}
        `
      }
    }
  }
};
