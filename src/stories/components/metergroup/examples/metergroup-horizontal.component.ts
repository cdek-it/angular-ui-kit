import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-horizontal',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup [value]="value" orientation="horizontal"></extra-metergroup>
    </div>
  `,
})
export class MeterGroupHorizontalComponent {
  value: MeterItem[] = defaultValue;
}

export const Horizontal: StoryObj = {
  render: () => ({
    template: `<app-metergroup-horizontal></app-metergroup-horizontal>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Горизонтальная ориентация (по умолчанию).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMeterGroupComponent } from '@cdek-it/angular-ui-kit';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-horizontal',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  template: \`
    <extra-metergroup [value]="value" orientation="horizontal"></extra-metergroup>
  \`,
})
export class MeterGroupHorizontalComponent {
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
