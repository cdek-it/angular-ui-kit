import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';

@Component({
  selector: 'app-progressbar-no-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraProgressBarComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-progressbar [value]="60" [showValue]="false"></extra-progressbar>
    </div>
  `
})
export class ProgressBarNoLabelComponent {}
