import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <metergroup [value]="value" labelOrientation="vertical"></metergroup>
    </div>
  `,
})
export class MeterGroupLabelVerticalComponent {
  value: MeterItem[] = defaultValue;
}
