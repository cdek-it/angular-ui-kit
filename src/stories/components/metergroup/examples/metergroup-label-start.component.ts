import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-label-start',
  standalone: true,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <metergroup [value]="value" labelPosition="start"></metergroup>
    </div>
  `,
})
export class MeterGroupLabelStartComponent {
  value: MeterItem[] = [
    { label: 'Space used', color: '#34d399', value: 16 },
    { label: 'Unused', color: '#fbbf24', value: 8 },
    { label: 'System', color: '#60a5fa', value: 24 },
  ];
}
