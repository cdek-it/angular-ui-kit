import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';

@Component({
  selector: 'app-progressbar-indeterminate',
  standalone: true,
  imports: [ExtraProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface-ground">
      <extra-progressbar mode="indeterminate"></extra-progressbar>
    </div>
  `
})
export class ProgressBarIndeterminateComponent {}
