import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { PrimeTemplate } from 'primeng/api';
import { ExtraDialogTemplateDirective } from './dialog-template.directive';

export type ExtraDialogSize = 'sm' | 'default' | 'lg' | 'xlg';

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
      [modal]="showOverlay"
      [closable]="showClose"
      [maximizable]="showMaximize"
      (onMaximize)="onMaximize.emit()"
      (onShow)="onShow.emit()"
      (onHide)="onHide.emit()"
      [dismissableMask]="dismissableMask"
      [closeOnEscape]="closeOnEscape"
      [focusOnShow]="focusOnShow"
      [styleClass]="sizeClass"
      [appendTo]="appendTo"
    >
      @if (headerTpl) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTpl.template"></ng-container>
        </ng-template>
      }
      <ng-content></ng-content>
      @if (footerTpl) {
        <ng-template pTemplate="footer">
          <ng-container [ngTemplateOutlet]="footerTpl.template"></ng-container>
        </ng-template>
      }
    </p-dialog>
  `
})
export class ExtraDialogComponent implements AfterContentInit {
  @Input() header = '';
  @Input() visible = false;
  /** Отображать маску (overlay) поверх интерфейса. */
  @Input() showOverlay = true;
  /** Кнопка разворота окна на весь экран. */
  @Input() showMaximize = false;
  /** Кнопка закрытия окна. */
  @Input() showClose = true;
  @Input() size: ExtraDialogSize = 'default';
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() focusOnShow = false;
  @Input() appendTo: string = 'body';

  @ContentChildren(ExtraDialogTemplateDirective) templates!: QueryList<ExtraDialogTemplateDirective>;

  headerTpl?: ExtraDialogTemplateDirective;
  footerTpl?: ExtraDialogTemplateDirective;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();
  @Output() onMaximize = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.headerTpl = this.templates.find((tpl) => tpl.extraDialogTemplate === 'header');
    this.footerTpl = this.templates.find((tpl) => tpl.extraDialogTemplate === 'footer');
    this.cdr.detectChanges();
  }

  get sizeClass(): string {
    if (this.size === 'sm') return 'p-dialog-sm';
    if (this.size === 'lg') return 'p-dialog-lg';
    if (this.size === 'xlg') return 'p-dialog-xlg';
    return '';
  }
}
