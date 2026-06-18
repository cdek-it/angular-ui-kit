import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonDirective } from 'primeng/button';
import { SharedModule } from 'primeng/api';

export type ExtraMessageSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast';

type PrimeMessageSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

const SEVERITY_ICONS: Record<string, string> = {
  info: 'ti ti-info-circle',
  success: 'ti ti-circle-check',
  warning: 'ti ti-alert-triangle',
  danger: 'ti ti-alert-circle'
};

@Component({
  selector: 'extra-message',
  standalone: true,
  imports: [Message, ButtonDirective, SharedModule],
  template: `
    <p-message [severity]="primeSeverity" [closable]="false" [life]="life">
      <ng-template pTemplate="container" let-closeCallback="closeCallback">
        <div class="p-message-accent-line"></div>
        <i [class]="resolvedIcon + ' p-message-icon'"></i>
        <div class="p-message-text">
          <span class="p-message-summary">{{ summary }}</span>
          @if (detail) {
            <div class="p-message-detail">{{ detail }}</div>
          }
          <ng-content></ng-content>
        </div>
        @if (closable) {
          <button
            type="button"
            pButton
            [text]="true"
            icon="ti ti-x"
            class="p-message-close-button"
            (click)="closeCallback($event); onClose.emit($event)"
          ></button>
        }
      </ng-template>
    </p-message>
  `
})
export class ExtraMessageComponent {
  @Input() severity: ExtraMessageSeverity = 'info';
  @Input() summary = '';
  @Input() detail = '';
  @Input() icon: string | undefined = undefined;
  @Input() closable = false;
  @Input() life: number | undefined = undefined;

  @Output() onClose = new EventEmitter<Event>();

  get resolvedIcon(): string {
    return this.icon ?? SEVERITY_ICONS[this.severity] ?? 'ti ti-info-circle';
  }

  get primeSeverity(): PrimeMessageSeverity {
    if (this.severity === 'warning') return 'warn';
    if (this.severity === 'danger') return 'error';
    return this.severity;
  }
}
