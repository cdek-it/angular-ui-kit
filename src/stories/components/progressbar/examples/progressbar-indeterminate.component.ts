import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';
import { Component } from '@angular/core';
import { ExtraProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';

@Component({
  selector: 'app-progressbar-indeterminate',
  standalone: true,
  imports: [ExtraProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-progressbar mode="indeterminate"></extra-progressbar>
    </div>
  `,
})
export class ProgressBarIndeterminateComponent {}
