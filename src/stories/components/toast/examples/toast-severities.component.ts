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
<extra-toast key="severities"></extra-toast>

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
  selector: 'app-toast-severities',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template,
  styles
})
export class ToastSeveritiesComponent {
  readonly severities = SEVERITIES;

  constructor(private readonly toastService: ExtraToastService) {}

  show(severity: 'info' | 'success' | 'warning' | 'danger', icon: string): void {
    this.toastService.add({
      key: 'severities',
      severity,
      message: 'Сообщение',
      caption: 'Подпись',
      icon
    });
  }
}

export const Severities: StoryObj = {
  render: () => ({
    template: `<app-toast-severities></app-toast-severities>`
  }),
  parameters: {
    docs: {
      description: { story: 'Четыре типа уведомлений: информация, успех, предупреждение, ошибка.' },
      source: {
        language: 'ts',
        code: `
import { ExtraButtonComponent, ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

const SEVERITIES = ['info', 'success', 'warning', 'danger'] as const;

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template: \`
    <extra-toast key="severities"></extra-toast>

    <div class="flex flex-wrap gap-2">
      @for (severity of severities; track severity) {
        <extra-button
          [label]="'Показать: ' + severity"
          variant="tertiary"
          (click)="show(severity)"
        ></extra-button>
      }
    </div>
  \`,
})
export class ExampleComponent {
  readonly severities = SEVERITIES;

  constructor(private toastService: ExtraToastService) {}

  show(severity: 'info' | 'success' | 'warning' | 'danger'): void {
    this.toastService.add({
      key: 'severities',
      severity,
      message: 'Сообщение',
      caption: 'Подпись',
    });
  }
}
        `
      }
    }
  }
};
