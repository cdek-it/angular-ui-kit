import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';

export type ProgressBarMode = 'determinate' | 'indeterminate';

@Component({
  selector: 'progressbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBar],
  template: `
    <p-progressbar
      [value]="value"
      [mode]="mode"
      [showValue]="showValue"
    ></p-progressbar>
  `,
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() mode: ProgressBarMode = 'determinate';
  @Input() showValue = true;
}
