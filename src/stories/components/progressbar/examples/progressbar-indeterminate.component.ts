import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';

@Component({
  selector: 'app-progressbar-indeterminate',
  standalone: true,
  imports: [ProgressBarComponent],
  template: `
    <div class="bg-surface-ground">
      <progressbar mode="indeterminate"></progressbar>
    </div>
  `,
})
export class ProgressBarIndeterminateComponent {}
