import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';

export type ExtraProgressBarMode = 'determinate' | 'indeterminate';

@Component({
  selector: 'extra-progressbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBar],
  template: `
    <p-progressbar
      [value]="normalizedValue"
      [mode]="mode"
      [showValue]="showValue"
      role="progressbar"
      [pt]="pt"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledBy || null"
    ></p-progressbar>
  `
})
export class ExtraProgressBarComponent {
  @Input() value: number | null | undefined = 0;
  @Input() mode: ExtraProgressBarMode = 'determinate';
  @Input() showValue = true;
  /** Доступное имя индикатора: role="progressbar" без имени не читается. */
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;

  get indeterminate(): boolean {
    return this.mode === 'indeterminate';
  }

  /**
   * PrimeNG безусловно пишет на корень aria-level (значение + «%») и aria-valuenow.
   * Для role="progressbar" aria-level недопустим, а в indeterminate значение вообще
   * не определено, поэтому перетираем эти атрибуты через pass-through.
   */
  get pt(): Record<string, unknown> {
    return {
      root: {
        'aria-level': null,
        'aria-valuenow': this.indeterminate ? null : String(this.normalizedValue),
        'aria-valuemin': this.indeterminate ? null : '0',
        'aria-valuemax': this.indeterminate ? null : '100'
      }
    };
  }

  /** Значение вне 0–100 ломало и ширину заливки, и aria-valuenow, а undefined давал NaN. */
  get normalizedValue(): number {
    const raw = Number(this.value);
    if (!Number.isFinite(raw)) return 0;
    return Math.min(100, Math.max(0, raw));
  }
}
