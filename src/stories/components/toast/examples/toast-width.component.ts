import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Toast } from 'primeng/toast';
import { Button } from 'primeng/button';
import { MessageService, SharedModule } from 'primeng/api';

const SIZES = [
  { key: 'sm', label: 'Small (20rem)', width: '20rem' },
  { key: 'base', label: 'Base (25rem)', width: '25rem' },
  { key: 'lg', label: 'Large (30rem)', width: '30rem' },
  { key: 'xlg', label: 'X-Large (45rem)', width: '45rem' },
] as const;

@Component({
  selector: 'app-toast-width',
  standalone: true,
  imports: [Toast, Button, SharedModule],
  providers: [MessageService],
  template: `
    <p-toast
      key="width-preview"
      [pt]="{ root: { style: { '--p-toast-width': currentWidth } } }"
    >
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
      @for (s of sizes; track s.key) {
        <div class="p-toast-message p-toast-message-info" [style.width]="s.width">
          <div class="p-toast-message-content">
            <div class="p-toast-accent-line"></div>
            <i class="ti ti-info-circle p-toast-message-icon"></i>
            <div class="p-toast-message-text">
              <span class="p-toast-summary">Сообщение</span>
              <div class="p-toast-detail">Ширина {{ s.key }}: {{ s.width }}</div>
            </div>
          </div>
        </div>
      }
    </div>

    <div class="flex flex-wrap gap-2 mt-6">
      @for (s of sizes; track s.key) {
        <p-button
          [label]="s.label"
          severity="contrast"
          (onClick)="show(s.width)"
        ></p-button>
      }
    </div>
  `,
})
export class ToastWidthComponent {
  readonly sizes = SIZES;
  currentWidth = '25rem';

  constructor(private readonly messageService: MessageService) {}

  show(width: string): void {
    this.currentWidth = width;
    this.messageService.clear('width-preview');
    this.messageService.add({
      key: 'width-preview',
      severity: 'info',
      summary: 'Сообщение',
      detail: 'Ширина: ' + width,
      life: 3000,
      icon: 'ti ti-info-circle',
    });
  }
}

export const Width: StoryObj = {
  render: () => ({
    template: `<app-toast-width></app-toast-width>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Ширина задаётся через CSS-переменную `--p-toast-width` с помощью пропа `pt`.' },
      source: {
        language: 'html',
        code: `
<p-toast [pt]="{ root: { style: { '--p-toast-width': '30rem' } } }">
  ...
</p-toast>
        `,
      },
    },
  },
};
