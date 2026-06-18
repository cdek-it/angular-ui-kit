import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';

export type ExtraDialogSize = 'sm' | 'default' | 'lg' | 'xlg';

@Directive({ selector: '[extraDialogHeader]', standalone: true })
export class ExtraDialogHeaderDirective {}

@Directive({ selector: '[extraDialogFooter]', standalone: true })
export class ExtraDialogFooterDirective {}

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
  `
})
export class ExtraDialogComponent {
  @Input() header = '';
  @Input() visible = false;
  @Input() modal = true;
  @Input() size: ExtraDialogSize = 'default';
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() showHeader = true;
  @Input() focusOnShow = false;
  @Input() appendTo: string = 'body';
  @ContentChild(ExtraDialogHeaderDirective, { read: TemplateRef }) headerTemplate: TemplateRef<any> | null = null;
  @ContentChild(ExtraDialogFooterDirective, { read: TemplateRef }) footerTemplate: TemplateRef<any> | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  get sizeClass(): string {
    if (this.size === 'sm') return 'p-dialog-sm';
    if (this.size === 'lg') return 'p-dialog-lg';
    if (this.size === 'xlg') return 'p-dialog-xlg';
    return '';
  }
}
