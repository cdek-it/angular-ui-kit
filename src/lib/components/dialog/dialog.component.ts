import { Component, EventEmitter, Input, Output, TemplateRef, ChangeDetectionStrategy} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';

export type DialogSize = 'sm' | 'default' | 'lg' | 'xlg';

@Component({
  selector: 'extra-dialog',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Dialog, NgTemplateOutlet, PrimeTemplate],
  template: `
    <p-dialog
      [header]="header"
      [visible]="visible"
      (visibleChange)="visibleChange.emit($event)"
      [modal]="modal"
      [dismissableMask]="dismissableMask"
      [closeOnEscape]="closeOnEscape"
      [showHeader]="showHeader"
      [focusOnShow]="focusOnShow"
      [styleClass]="sizeClass"
      [appendTo]="appendTo"
    >
      @if (headerTemplate) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        </ng-template>
      }
      <ng-content></ng-content>
      @if (footerTemplate) {
        <ng-template pTemplate="footer">
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        </ng-template>
      }
    </p-dialog>
  `,
})
export class ExtraDialogComponent {
  @Input() header = '';
  @Input() visible = false;
  @Input() modal = true;
  @Input() size: DialogSize = 'default';
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() showHeader = true;
  @Input() focusOnShow = false;
  @Input() appendTo: string = 'body';
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() footerTemplate: TemplateRef<any> | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  get sizeClass(): string {
    if (this.size === 'sm') return 'p-dialog-sm';
    if (this.size === 'lg') return 'p-dialog-lg';
    if (this.size === 'xlg') return 'p-dialog-xlg';
    return '';
  }
}
