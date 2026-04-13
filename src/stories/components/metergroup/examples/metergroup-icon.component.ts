import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { iconValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-icon',
  standalone: true,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <metergroup [value]="value"></metergroup>
    </div>
  `,
})
export class MeterGroupIconComponent {
  value: MeterItem[] = iconValue;
}
