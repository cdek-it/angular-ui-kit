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
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'drawer',
  standalone: true,
  imports: [Drawer, SharedModule, NgIf, NgTemplateOutlet],
  template: `
    <p-drawer
      [visible]="visible"
      [header]="header"
      [modal]="modal"
      [fullScreen]="fullScreen"
      [dismissible]="dismissible"
      [showCloseIcon]="showCloseIcon"
      [closeOnEscape]="closeOnEscape"
      [blockScroll]="blockScroll"
      [styleClass]="sizeClass"
      [position]="position"
      (visibleChange)="visibleChange.emit($event)"
      (onShow)="onShow.emit()"
      (onHide)="onHide.emit()"
    >
      <ng-content></ng-content>
      <ng-template pTemplate="footer" *ngIf="footerTemplate">
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </ng-template>
    </p-drawer>
  `,
})
export class DrawerComponent {
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

  @ContentChild('drawerFooter') footerTemplate: TemplateRef<unknown> | null =
    null;

  get sizeClass(): string {
    if (this.size === 'default') return '';
    return `p-drawer-${this.size}`;
  }
}
