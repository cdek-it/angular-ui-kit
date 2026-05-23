import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-vertical',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <div style="height: 300px; display: flex">
        <extra-metergroup [value]="value" orientation="vertical"></extra-metergroup>
      </div>
    </div>
  `,
})
export class MeterGroupVerticalComponent {
  value: MeterItem[] = defaultValue;
}

export const Vertical: StoryObj = {
  render: () => ({
    template: `<app-metergroup-vertical></app-metergroup-vertical>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Вертикальная ориентация полосы.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMeterGroupComponent } from '@cdek-it/angular-ui-kit';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-vertical',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  template: \`
    <div style="height: 300px; display: flex">
      <extra-metergroup [value]="value" orientation="vertical"></extra-metergroup>
    </div>
  \`,
})
export class MeterGroupVerticalComponent {
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
