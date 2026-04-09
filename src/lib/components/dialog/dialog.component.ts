import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Dialog } from 'primeng/dialog';

export type DialogSize = 'sm' | 'default' | 'lg' | 'xlg';

@Component({
  selector: 'dialog',
  host: { style: 'display: contents' },
  standalone: true,
  imports: [Dialog, NgTemplateOutlet],
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
      appendTo="body"
    >
      <ng-content></ng-content>
      <ng-template pTemplate="footer">
        @if (footerTemplate) {
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        }
      </ng-template>
    </p-dialog>
  `,
})
export class DialogComponent {
  @Input() header = '';
  @Input() visible = false;
  @Input() modal = true;
  @Input() size: DialogSize = 'default';
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() showHeader = true;
  @Input() focusOnShow = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @ContentChild('dialogFooter') footerTemplate?: TemplateRef<any>;

  get sizeClass(): string {
    if (this.size === 'sm') return 'p-dialog-sm';
    if (this.size === 'lg') return 'p-dialog-lg';
    if (this.size === 'xlg') return 'p-dialog-xlg';
    return '';
  }
}
