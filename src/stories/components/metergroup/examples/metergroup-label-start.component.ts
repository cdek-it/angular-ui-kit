import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent, ExtraMeterItem } from '../../../../lib/components/metergroup/metergroup.component';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-label-start',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup ariaLabel="Использование диска" [value]="value" labelPosition="start"></extra-metergroup>
    </div>
  `
})
export class MeterGroupLabelStartComponent {
  value: ExtraMeterItem[] = defaultValue;
}

export const LabelStart: StoryObj = {
  render: () => ({
    template: `<app-metergroup-label-start></app-metergroup-label-start>`
  }),
  parameters: {
    docs: {
      description: { story: 'Метки расположены над полосой (labelPosition="start").' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMeterGroupComponent, ExtraMeterItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-metergroup-label-start',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-metergroup ariaLabel="Использование диска" [value]="value" labelPosition="start"></extra-metergroup>
  \`,
})
export class MeterGroupLabelStartComponent {
  value: ExtraMeterItem[] = [
    { label: 'Space used', color: '#34d399', value: 16 },
    { label: 'Unused', color: '#fbbf24', value: 8 },
    { label: 'System', color: '#60a5fa', value: 24 },
  ];
}
        `
      }
    }
  }
};
