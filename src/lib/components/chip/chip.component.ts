import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip],
  template: `
    <p-chip
      [label]="label"
      [icon]="icon"
      [removable]="removable"
      [disabled]="disabled"
      (onRemove)="onRemove.emit($event)"
    ></p-chip>
  `,
})
export class ChipComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() removable = false;
  @Input() disabled = false;
  @Output() onRemove = new EventEmitter<MouseEvent>();
}
