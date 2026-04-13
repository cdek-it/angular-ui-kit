import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';

export type ConfirmDialogSize = 'sm' | 'default' | 'lg' | 'xlg';
export type ConfirmDialogSeverity = 'success' | 'info' | 'warn' | 'help' | 'danger' | 'default';

@Component({
  selector: 'confirm-dialog',
  host: { style: 'display: contents' },
  standalone: true,
  imports: [ConfirmDialog, Button, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-confirmDialog [key]="key" [styleClass]="computedClass" appendTo="body">
      <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
        @if (headerTemplate) {
          <ng-container [ngTemplateOutlet]="headerTemplate"
            [ngTemplateOutletContext]="{ $implicit: message, onAccept, onReject }">
          </ng-container>
        } @else {
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
        }
        <div class="p-dialog-content">
          <p>{{ message.message }}</p>
        </div>
        @if (footerTemplate) {
          <ng-container [ngTemplateOutlet]="footerTemplate"
            [ngTemplateOutletContext]="{ $implicit: message, onAccept, onReject }">
          </ng-container>
        } @else {
          <div class="p-dialog-footer">
            <p-button
              [label]="message.rejectLabel"
              variant="text"
              (onClick)="onReject()"
            ></p-button>
            <p-button
              [label]="message.acceptLabel"
              [severity]="message.acceptButtonProps?.severity"
              (onClick)="onAccept()"
            ></p-button>
          </div>
        }
      </ng-template>
    </p-confirmDialog>
  `,
})
export class ConfirmDialogComponent {
  @Input() key = '';
  @Input() size: ConfirmDialogSize = 'default';
  @Input() severity: ConfirmDialogSeverity = 'default';
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() footerTemplate: TemplateRef<any> | null = null;

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
