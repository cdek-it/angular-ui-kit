import { Component, Input } from '@angular/core';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';

export type ConfirmDialogSize = 'sm' | 'default' | 'lg' | 'xlg';
export type ConfirmDialogSeverity = 'success' | 'info' | 'warn' | 'help' | 'danger' | 'default';

@Component({
  selector: 'confirm-dialog',
  host: { style: 'display: contents' },
  standalone: true,
  imports: [ConfirmDialog, Button, PrimeTemplate],
  template: `
    <p-confirmDialog [key]="key" [styleClass]="computedClass" appendTo="body">
      <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
        <div class="p-dialog-header">
          <div class="p-dialog-title">
            <i [class]="message.icon"></i>
            <span>{{ message.header }}</span>
          </div>
          <button
            class="p-button p-component p-button-icon-only p-button-rounded p-button-text p-dialog-close-button"
            type="button"
            (click)="onReject()"
          >
            <span class="p-button-icon ti ti-x"></span>
          </button>
        </div>
        <div class="p-dialog-content">
          <p>{{ message.message }}</p>
        </div>
        <div class="p-dialog-footer">
          <p-button
            [label]="message.rejectLabel"
            severity="secondary"
            variant="text"
            (onClick)="onReject()"
          ></p-button>
          <p-button
            [label]="message.acceptLabel"
            [severity]="message.acceptButtonProps?.severity"
            (onClick)="onAccept()"
          ></p-button>
        </div>
      </ng-template>
    </p-confirmDialog>
  `,
})
export class ConfirmDialogComponent {
  @Input() key = '';
  @Input() size: ConfirmDialogSize = 'default';
  @Input() severity: ConfirmDialogSeverity = 'default';

  get computedClass(): string {
    const classes: string[] = [];
    if (this.size === 'sm') classes.push('p-confirmdialog-sm');
    else if (this.size === 'lg') classes.push('p-confirmdialog-lg');
    else if (this.size === 'xlg') classes.push('p-confirmdialog-xlg');

    const severityMap: Record<ConfirmDialogSeverity, string> = {
      success: 'p-confirm-dialog-accept',
      info: 'p-confirm-dialog-info',
      warn: 'p-confirm-dialog-warn',
      help: 'p-confirm-dialog-help',
      danger: 'p-confirm-dialog-error',
      default: '',
    };
    if (severityMap[this.severity]) classes.push(severityMap[this.severity]);

    return classes.join(' ');
  }
}
