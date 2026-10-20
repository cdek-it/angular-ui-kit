import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent, ExtraMeterItem } from '../../../../lib/components/metergroup/metergroup.component';
import { defaultValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup ariaLabel="Использование диска" [value]="value" labelOrientation="vertical"></extra-metergroup>
    </div>
  `
})
export class MeterGroupLabelVerticalComponent {
  value: ExtraMeterItem[] = defaultValue;
}

export const LabelVertical: StoryObj = {
  render: () => ({
    template: `<app-metergroup-label-vertical></app-metergroup-label-vertical>`
  }),
  parameters: {
    docs: {
      description: { story: 'Метки расположены вертикально (labelOrientation="vertical").' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMeterGroupComponent, ExtraMeterItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-metergroup-label-vertical',
  standalone: true,
  imports: [ExtraMeterGroupComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-metergroup ariaLabel="Использование диска" [value]="value" labelOrientation="vertical"></extra-metergroup>
  \`,
})
export class MeterGroupLabelVerticalComponent {
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
