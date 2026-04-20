import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';

@Component({
  selector: 'app-progressbar-no-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent],
  template: `
    <div class="bg-surface-ground">
      <progressbar [value]="60" [showValue]="false"></progressbar>
    </div>
  `,
})
export class ProgressBarNoLabelComponent {}
