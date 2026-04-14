import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

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
  value: MeterItem[] = defaultValue;
}

export const LabelStart: StoryObj = {
  render: () => ({
    template: `<app-metergroup-label-start></app-metergroup-label-start>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Метки расположены над полосой (labelPosition="start").' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MeterGroupComponent } from '@cdek-it/angular-ui-kit';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-label-start',
  standalone: true,
  imports: [MeterGroupComponent],
  template: \`
    <metergroup [value]="value" labelPosition="start"></metergroup>
  \`,
})
export class MeterGroupLabelStartComponent {
  value: MeterItem[] = [
    { label: 'Space used', color: '#34d399', value: 16 },
    { label: 'Unused', color: '#fbbf24', value: 8 },
    { label: 'System', color: '#60a5fa', value: 24 },
  ];
}
        `,
      },
    },
  },
};
