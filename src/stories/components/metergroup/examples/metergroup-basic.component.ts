import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-basic',
  standalone: true,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <metergroup [value]="value"></metergroup>
    </div>
  `,
})
export class MeterGroupBasicComponent {
  value: MeterItem[] = defaultValue;
}
