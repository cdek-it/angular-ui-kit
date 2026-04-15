import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { MessageService, SharedModule } from 'primeng/api';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' },
] as const;

const template = `
<p-toast key="severities">
  <ng-template #message let-message>
    <div class="p-toast-accent-line"></div>
    <i [class]="message.icon + ' p-toast-message-icon'"></i>
    <div class="p-toast-message-text">
      <span class="p-toast-summary">{{ message.summary }}</span>
      <div class="p-toast-detail">{{ message.detail }}</div>
    </div>
  </ng-template>
</p-toast>

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
  imports: [Toast, Button, SharedModule],
  providers: [MessageService],
  template,
  styles,
})
export class ToastSeveritiesComponent {
  readonly severities = SEVERITIES;

  constructor(private readonly messageService: MessageService) {}

  show(severity: string, icon: string): void {
    this.messageService.add({
      key: 'severities',
      severity,
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
import { MessageService, SharedModule } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [Toast, SharedModule],
  providers: [MessageService],
  template: \`
    <p-toast key="my-toast">
      <ng-template #message let-message>
        <div class="p-toast-accent-line"></div>
        <i [class]="message.icon + ' p-toast-message-icon'"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">{{ message.summary }}</span>
          <div class="p-toast-detail">{{ message.detail }}</div>
        </div>
      </ng-template>
    </p-toast>
    <button (click)="show()">Показать</button>
  \`,
})
export class ExampleComponent {
  constructor(private messageService: MessageService) {}

  show(): void {
    this.messageService.add({
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
