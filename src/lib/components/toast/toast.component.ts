import { AfterViewInit, Component, ElementRef, inject, Input } from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Toast, ToastCloseEvent } from 'primeng/toast';
import { ButtonDirective } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

export type ExtraToastElementLike = HTMLElement | ElementRef<HTMLElement>;
/** Куда монтируется контейнер уведомлений; `'self'` оставляет его на месте в шаблоне. */
export type ExtraToastAppendTo = 'body' | 'self' | ExtraToastElementLike;

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
  imports: [Toast, SharedModule, NgTemplateOutlet, ButtonDirective],
  template: `
    <p-toast [position]="position" [key]="key" [life]="life" (onClose)="onMessageClose($event)">
      <!-- headless-шаблон: вся разметка сообщения наша, включая кнопку закрытия (closeFn из контекста) -->
      <ng-template #headless let-message let-closeFn="closeFn">
        <div class="p-toast-message-content">
          <div class="p-toast-accent-line"></div>
          <i [class]="resolveIcon(message) + ' p-toast-message-icon'"></i>
          <div class="p-toast-message-text">
            @if (message.summary) {
              <span class="p-toast-summary">{{ message.summary }}</span>
            }
            @if (message.detail) {
              <div class="p-toast-detail">{{ message.detail }}</div>
            }
          </div>
          @if (message.closable !== false) {
            <button
              type="button"
              pButton
              [text]="true"
              icon="ti ti-x"
              class="p-toast-close-button"
              [attr.aria-label]="closeAriaLabel"
              (click)="closeFn($event)"
            ></button>
          }
          @if (message.data?.content) {
            <div class="p-toast-body">
              <ng-container [ngTemplateOutlet]="message.data.content" />
            </div>
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
export class ExtraToastComponent implements AfterViewInit {
  @Input() position: ExtraToastPosition = 'top-right';
  @Input() key: string | undefined = undefined;
  @Input() life = 5000;
  /**
   * Куда монтируется контейнер уведомлений. По умолчанию `'body'`: уведомления позиционируются
   * относительно окна браузера, а не ближайшего предка с `transform`/`filter`/`contain`
   * (такой предок становится content block для `position: fixed` и «запирает» уведомления внутри себя).
   */
  @Input() appendTo: ExtraToastAppendTo = 'body';

  private readonly config = inject(PrimeNG);
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  get closeAriaLabel(): string | undefined {
    return this.config.translation?.aria?.close;
  }

  ngAfterViewInit(): void {
    const target = this.resolveAppendTarget();
    if (target && target !== this.elementRef.nativeElement.parentNode) {
      target.appendChild(this.elementRef.nativeElement);
    }
  }

  private resolveAppendTarget(): HTMLElement | undefined {
    if (this.appendTo === 'self') return undefined;
    if (this.appendTo === 'body') return this.document.body ?? undefined;
    return this.appendTo instanceof ElementRef ? this.appendTo.nativeElement : this.appendTo;
  }

  resolveIcon(message: { severity?: string; icon?: string }): string {
    return message.icon ?? SEVERITY_ICONS[message.severity ?? 'info'] ?? SEVERITY_ICONS['info'];
  }

  /** Диспетчеризует пользовательский onClose-колбэк конкретного сообщения (клик по крестику или таймер). */
  onMessageClose(event: ToastCloseEvent): void {
    (event.message?.data as { onClose?: () => void } | undefined)?.onClose?.();
  }
}
