import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraProgressBarComponent } from '../../../../lib/components/progressbar/progressbar.component';

@Component({
  selector: 'app-progressbar-indeterminate',
  standalone: true,
  imports: [ExtraProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <extra-progressbar mode="indeterminate"></extra-progressbar> `
})
export class ProgressBarIndeterminateComponent {}
