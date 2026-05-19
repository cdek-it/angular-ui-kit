import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'extra-chip',
  standalone: true,
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
export class ExtraChipComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() removable = false;
  @Input() disabled = false;
  @Output() onRemove = new EventEmitter<MouseEvent>();
}
