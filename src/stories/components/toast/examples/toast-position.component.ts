import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { MessageService, SharedModule } from 'primeng/api';

const POSITIONS = [
  { position: 'top-left', label: 'Вверх слева', key: 'pos-top-left' },
  { position: 'top-center', label: 'Вверх по центру', key: 'pos-top-center' },
  { position: 'top-right', label: 'Вверх справа', key: 'pos-top-right' },
  { position: 'bottom-left', label: 'Вниз слева', key: 'pos-bottom-left' },
  { position: 'bottom-center', label: 'Вниз по центру', key: 'pos-bottom-center' },
  { position: 'bottom-right', label: 'Вниз справа', key: 'pos-bottom-right' },
] as const;

const template = `
@for (p of positions; track p.key) {
  <p-toast [position]="p.position" [key]="p.key">
    <ng-template #message let-message>
      <div class="p-toast-accent-line"></div>
      <i [class]="message.icon + ' p-toast-message-icon'"></i>
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ message.summary }}</span>
        <div class="p-toast-detail">{{ message.detail }}</div>
      </div>
    </ng-template>
  </p-toast>
}

<div class="flex flex-col gap-2 items-center justify-center min-h-48">
  @for (p of positions; track p.key) {
    <p-button
      [label]="p.label"
      severity="contrast"
      (onClick)="show(p.key, p.position)"
    ></p-button>
  }
</div>
`;
const styles = '';

@Component({
  selector: 'app-toast-position',
  standalone: true,
  imports: [Toast, Button, SharedModule],
  providers: [MessageService],
  template,
  styles,
})
export class ToastPositionComponent {
  readonly positions = POSITIONS;

  constructor(private readonly messageService: MessageService) {}

  show(key: string, position: string): void {
    this.messageService.add({
      key,
      severity: 'info',
      summary: 'Сообщение',
      detail: 'Позиция: ' + position,
      life: 3000,
      icon: 'ti ti-info-circle',
    });
  }
}

export const Position: StoryObj = {
  render: () => ({
    template: `<app-toast-position></app-toast-position>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Расположение тоста задаётся через `position` и `key`.' },
      source: {
        language: 'ts',
        code: `
<p-toast position="top-left" key="top-left"></p-toast>
<p-toast position="top-center" key="top-center"></p-toast>
<p-toast position="top-right" key="top-right"></p-toast>
<p-toast position="bottom-left" key="bottom-left"></p-toast>
<p-toast position="bottom-center" key="bottom-center"></p-toast>
<p-toast position="bottom-right" key="bottom-right"></p-toast>
        `,
      },
    },
  },
};
