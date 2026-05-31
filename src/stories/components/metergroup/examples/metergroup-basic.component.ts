import { Component, ChangeDetectionStrategy} from '@angular/core';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { Component } from '@angular/core';
import { ExtraMeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-basic',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup [value]="value"></extra-metergroup>
    </div>
  `,
})
export class MeterGroupBasicComponent {
  value: MeterItem[] = defaultValue;
}
