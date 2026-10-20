import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

  @ViewChild(Chip) private primeChip?: Chip;

  /** Обрабатывает клик по кнопке удаления: эмитит onRemove, видимостью управляет родитель. */
  remove(): void {
    // PrimeNG прячет чип сам (visible = false) — возвращаем исходное состояние,
    // иначе инстанс остаётся скрытым навсегда даже после смены инпутов.
    if (this.primeChip) this.primeChip.visible = true;
    if (this.disabled) return;
    this.onRemove.emit();
  }
}
