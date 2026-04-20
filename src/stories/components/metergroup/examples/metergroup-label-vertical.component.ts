import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <metergroup [value]="value" labelOrientation="vertical"></metergroup>
    </div>
  `,
})
export class MeterGroupLabelVerticalComponent {
  value: MeterItem[] = defaultValue;
}

export const LabelVertical: StoryObj = {
  render: () => ({
    template: `<app-metergroup-label-vertical></app-metergroup-label-vertical>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Метки расположены вертикально (labelOrientation="vertical").' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MeterGroupComponent } from '@cdek-it/angular-ui-kit';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MeterGroupComponent],
  template: \`
    <metergroup [value]="value" labelOrientation="vertical"></metergroup>
  \`,
})
export class MeterGroupLabelVerticalComponent {
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
