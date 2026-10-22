import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Chip } from 'primeng/chip';

@Component({
  selector: 'extra-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Chip],
  template: `
    <p-chip
      [label]="label"
      [icon]="icon"
      [removable]="removable"
      [disabled]="disabled"
      [attr.aria-disabled]="disabled ? true : null"
      (onRemove)="remove()"
    ></p-chip>
  `
})
export class ExtraChipComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() removable = false;
  @Input() disabled = false;

  @Output() onRemove = new EventEmitter<void>();

  /** Клик по кнопке удаления: эмитит onRemove, рендером чипа управляет родитель. */
  remove(): void {
    if (this.disabled) return;
    this.onRemove.emit();
  }
}
