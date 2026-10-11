import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'extra-popover',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Popover, SharedModule],
  host: { style: 'display: contents' },
  template: `
    <p-popover
      #op
      [dismissable]="dismissable"
      [appendTo]="appendTo"
      [autoZIndex]="autoZIndex"
      [baseZIndex]="baseZIndex"
      [focusOnShow]="focusOnShow"
      (onShow)="onShow.emit()"
      (onHide)="onHide.emit()"
    >
      <ng-content></ng-content>
    </p-popover>
  `
})
export class ExtraPopoverComponent {
  @Input() dismissable = true;
  @Input() appendTo: HTMLElement | 'body' | 'self' | null = 'body';
  @Input() autoZIndex = true;
  @Input() baseZIndex = 0;
  @Input() focusOnShow = true;

  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();

  @ViewChild('op') private op!: Popover;

  toggle(event: Event): void {
    this.op.toggle(event);
  }
}
