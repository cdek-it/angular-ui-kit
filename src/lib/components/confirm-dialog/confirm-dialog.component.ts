import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { PrimeTemplate } from 'primeng/api';
import { ExtraButtonComponent } from '../button/button.component';

export type ExtraConfirmDialogSize = 'sm' | 'default' | 'lg' | 'xlg';
export type ExtraConfirmDialogSeverity = 'success' | 'info' | 'warn' | 'help' | 'danger' | 'default';

@Component({
  selector: 'extra-confirm-dialog',
  host: { style: 'display: contents' },
  standalone: true,
  imports: [ConfirmDialog, ExtraButtonComponent, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-confirmDialog [key]="key" [styleClass]="computedClass" appendTo="body">
      <ng-template pTemplate="headless" let-message let-onAccept="onAccept" let-onReject="onReject">
        @if (headerTemplate) {
          <ng-container
            [ngTemplateOutlet]="headerTemplate"
            [ngTemplateOutletContext]="{ $implicit: message, onAccept, onReject }"
          >
          </ng-container>
        } @else {
          <div class="p-dialog-header">
            <div class="p-dialog-title">
              <i [class]="message.icon"></i>
              <span>{{ message.header }}</span>
            </div>
            <extra-button
              styleClass="p-dialog-close-button"
              variant="text"
              icon="ti ti-x"
              [rounded]="true"
              [iconOnly]="true"
              (click)="onReject()"
            ></extra-button>
          </div>
        }
        <div class="p-dialog-content">
          <p>{{ message.message }}</p>
        </div>
        @if (footerTemplate) {
          <ng-container
            [ngTemplateOutlet]="footerTemplate"
            [ngTemplateOutletContext]="{ $implicit: message, onAccept, onReject }"
          >
          </ng-container>
        } @else {
          <div class="p-dialog-footer">
            <extra-button [label]="message.rejectLabel" variant="text" (click)="onReject()"></extra-button>
            <extra-button
              [label]="message.acceptLabel"
              [severity]="message.acceptButtonProps?.severity"
              (click)="onAccept()"
            ></extra-button>
          </div>
        }
      </ng-template>
    </p-confirmDialog>
  `
})
export class ExtraConfirmDialogComponent {
  @Input() key = '';
  @Input() size: ExtraConfirmDialogSize = 'default';
  @Input() severity: ExtraConfirmDialogSeverity = 'default';
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() footerTemplate: TemplateRef<any> | null = null;

  get computedClass(): string {
    const classes: string[] = [];
    if (this.size === 'sm') classes.push('p-confirmdialog-sm');
    else if (this.size === 'lg') classes.push('p-confirmdialog-lg');
    else if (this.size === 'xlg') classes.push('p-confirmdialog-xlg');

    const severityMap: Record<ExtraConfirmDialogSeverity, string> = {
      success: 'p-confirm-dialog-accept',
      info: 'p-confirm-dialog-info',
      warn: 'p-confirm-dialog-warn',
      help: 'p-confirm-dialog-help',
      danger: 'p-confirm-dialog-error',
      default: ''
    };
    if (severityMap[this.severity]) classes.push(severityMap[this.severity]);

    return classes.join(' ');
  }
}
