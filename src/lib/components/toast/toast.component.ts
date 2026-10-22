import { Component, Input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Toast, ToastCloseEvent } from 'primeng/toast';
import { SharedModule } from 'primeng/api';

export type ExtraToastSeverity = 'info' | 'success' | 'warning' | 'danger';
export type ExtraToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'center';

/** Внутренний словарь PrimeNG-совместимых значений severity — публично не используется. */
type PrimeToastSeverity = 'success' | 'info' | 'warn' | 'error';

/** Маппинг собственного severity на PrimeNG; используется сервисом при отправке сообщения. */
export function toPrimeToastSeverity(severity: ExtraToastSeverity): PrimeToastSeverity {
  if (severity === 'warning') return 'warn';
  if (severity === 'danger') return 'error';
  return severity;
}

const SEVERITY_ICONS: Record<string, string> = {
  info: 'ti ti-info-circle',
  success: 'ti ti-circle-check',
  warn: 'ti ti-alert-triangle',
  error: 'ti ti-alert-circle'
};

@Component({
  selector: 'extra-toast',
  standalone: true,
  imports: [Toast, SharedModule, NgTemplateOutlet],
  template: `
    <p-toast [position]="position" [key]="key" [life]="life" (onClose)="onMessageClose($event)">
      <ng-template #message let-message>
        <div class="p-toast-accent-line"></div>
        <i [class]="resolveIcon(message) + ' p-toast-message-icon'"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">{{ message.summary }}</span>
          @if (message.detail) {
            <div class="p-toast-detail">{{ message.detail }}</div>
          }
          @if (message.data?.content) {
            <ng-container [ngTemplateOutlet]="message.data.content" />
          }
          @if (message.data?.footer) {
            <div class="p-toast-footer">
              <ng-container [ngTemplateOutlet]="message.data.footer" />
            </div>
          }
        </div>
      </ng-template>
    </p-toast>
  `
})
export class ExtraToastComponent {
  @Input() position: ExtraToastPosition = 'top-right';
  @Input() key: string | undefined = undefined;
  @Input() life = 5000;

  resolveIcon(message: { severity?: string; icon?: string }): string {
    return message.icon ?? SEVERITY_ICONS[message.severity ?? 'info'] ?? SEVERITY_ICONS['info'];
  }

  /** Диспетчеризует пользовательский onClose-колбэк конкретного сообщения (клик по крестику или таймер). */
  onMessageClose(event: ToastCloseEvent): void {
    (event.message?.data as { onClose?: () => void } | undefined)?.onClose?.();
  }
}
