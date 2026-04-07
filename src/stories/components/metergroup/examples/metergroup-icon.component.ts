import { Component } from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';

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
  value: MeterItem[] = [
    { label: 'Apps', color: '#34d399', value: 16, icon: 'ti ti-apps' },
    { label: 'Messages', color: '#fbbf24', value: 8, icon: 'ti ti-message' },
    { label: 'System', color: '#60a5fa', value: 24, icon: 'ti ti-cpu' },
  ];
}
