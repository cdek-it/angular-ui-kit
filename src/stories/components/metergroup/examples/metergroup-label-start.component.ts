import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';
// todo написать extrameteritem
@Component({
  selector: 'app-metergroup-label-start',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup [value]="value" labelPosition="start"></extra-metergroup>
    </div>
  `
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
import { ExtraMeterGroupComponent } from '@cdek-it/angular-ui-kit';
// todo проверить meter item
@Component({
  selector: 'app-metergroup-label-start',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-metergroup [value]="value" labelPosition="start"></extra-metergroup>
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
