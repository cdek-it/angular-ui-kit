import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-vertical',
  standalone: true,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <div style="height: 300px; display: flex">
        <metergroup [value]="value" orientation="vertical"></metergroup>
      </div>
    </div>
  `,
})
export class MeterGroupVerticalComponent {
  value: MeterItem[] = defaultValue;
}
