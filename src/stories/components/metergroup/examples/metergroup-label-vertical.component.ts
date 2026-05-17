import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup [value]="value" labelOrientation="vertical"></extra-metergroup>
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
import { ExtraMeterGroupComponent } from '@cdek-it/angular-ui-kit';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  template: \`
    <extra-metergroup [value]="value" labelOrientation="vertical"></extra-metergroup>
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
