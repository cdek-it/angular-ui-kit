import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Button } from 'primeng/button';
import { ExtraToastComponent } from '../../../../lib/components/toast/toast.component';
import { ExtraToastService } from '../../../../lib/components/toast/toast.service';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' },
] as const;

const template = `
<extra-toast key="severities"></extra-toast>

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
  selector: 'app-toast-severities',
  standalone: true,
  imports: [ExtraToastComponent, Button],
  template,
  styles,
})
export class ToastSeveritiesComponent {
  readonly severities = SEVERITIES;

  constructor(private readonly toastService: ExtraToastService) {}

  show(severity: string, icon: string): void {
    this.toastService.add({
      key: 'severities',
      severity: severity as any,
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon,
    });
  }
}

export const Severities: StoryObj = {
  render: () => ({
    template: `<app-toast-severities></app-toast-severities>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Четыре типа уведомлений: информация, успех, предупреждение, ошибка.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraToastComponent],
  template: \`
    <extra-toast key="my-toast"></extra-toast>
    <button (click)="show()">Показать</button>
  \`,
})
export class ExampleComponent {
  constructor(private toastService: ExtraToastService) {}

  show(): void {
    this.toastService.add({
      key: 'my-toast',
      severity: 'info',
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon: 'ti ti-info-circle',
    });
  }
}
        `,
      },
    },
  },
};
