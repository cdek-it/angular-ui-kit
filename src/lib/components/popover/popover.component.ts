import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'popover',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Popover, SharedModule],
  host: { style: 'display: contents' },
  template: `
    <p-popover #op [dismissable]="dismissable" [appendTo]="appendTo">
      <ng-content></ng-content>
    </p-popover>
  `,
})
export class PopoverComponent {
  @Input() dismissable = true;
  @Input() appendTo: string | HTMLElement = 'body';

  @ViewChild('op') private op!: Popover;

  toggle(event: Event): void {
    this.op.toggle(event);
  }
}
