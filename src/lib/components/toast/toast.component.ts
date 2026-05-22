import { Component, Input } from '@angular/core';
import { Toast } from 'primeng/toast';
import { SharedModule } from 'primeng/api';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'center';

const SEVERITY_ICONS: Record<string, string> = {
  info: 'ti ti-info-circle',
  success: 'ti ti-circle-check',
  warn: 'ti ti-alert-triangle',
  error: 'ti ti-alert-circle',
};

@Component({
  selector: 'extra-toast',
  standalone: true,
  imports: [Toast, SharedModule],
  template: `
    <p-toast [position]="position" [key]="key" [life]="life" [pt]="pt">
      <ng-template #message let-message>
        <div class="p-toast-accent-line"></div>
        <i [class]="resolveIcon(message) + ' p-toast-message-icon'"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">{{ message.summary }}</span>
          @if (message.detail) {
            <div class="p-toast-detail">{{ message.detail }}</div>
          }
        </div>
      </ng-template>
    </p-toast>
  `,
})
export class ExtraToastComponent {
  @Input() position: ToastPosition = 'top-right';
  @Input() key: string | undefined = undefined;
  @Input() life = 5000;
  @Input() pt: Record<string, any> | undefined = undefined;

  resolveIcon(message: { severity?: string; icon?: string }): string {
    return message.icon ?? SEVERITY_ICONS[message.severity ?? 'info'] ?? 'ti ti-info-circle';
  }
}
