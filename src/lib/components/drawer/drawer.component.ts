import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { SharedModule } from 'primeng/api';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'extra-drawer',
  standalone: true,
  imports: [Drawer, SharedModule, NgTemplateOutlet],
  template: `
    <p-drawer
      [visible]="visible"
      [header]="headerTemplate ? undefined : header"
      [modal]="modal"
      [fullScreen]="fullScreen"
      [dismissible]="dismissible"
      [closable]="showCloseIcon"
      [closeOnEscape]="closeOnEscape"
      [blockScroll]="blockScroll"
      [styleClass]="sizeClass"
      [position]="position"
      [closeButtonProps]="{ text: true, rounded: true }"
      (visibleChange)="visibleChange.emit($event)"
      (onShow)="onShow.emit()"
      (onHide)="onHide.emit()"
    >
      <ng-content></ng-content>
      @if (headerTemplate) {
        <ng-template pTemplate="header">
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </ng-template>
      }
      @if (footerTemplate) {
        <ng-template pTemplate="footer">
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </ng-template>
      }
    </p-drawer>
  `,
})
export class ExtraDrawerComponent {
  @Input() visible = false;
  @Input() header: string | undefined;
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @Input() size: 'default' | 'sm' | 'lg' | 'xlg' = 'default';
  @Input() modal = true;
  @Input() fullScreen = false;
  @Input() dismissible = true;
  @Input() showCloseIcon = true;
  @Input() closeOnEscape = true;
  @Input() blockScroll = true;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();

  @ContentChild('drawerHeader') headerTemplate: TemplateRef<unknown> | null =
    null;

  @ContentChild('drawerFooter') footerTemplate: TemplateRef<unknown> | null =
    null;

  get sizeClass(): string {
    if (this.size === 'default') return '';
    return `p-drawer-${this.size}`;
  }
}
