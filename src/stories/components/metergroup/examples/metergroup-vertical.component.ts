import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';

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
  value: MeterItem[] = [
    { label: 'Space used', color: '#34d399', value: 16 },
    { label: 'Unused', color: '#fbbf24', value: 8 },
    { label: 'System', color: '#60a5fa', value: 24 },
  ];
}
