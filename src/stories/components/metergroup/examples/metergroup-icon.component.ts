import { Component, ChangeDetectionStrategy} from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { MeterGroupComponent } from '../../../../lib/components/metergroup/metergroup.component';
import { MeterItem } from 'primeng/metergroup';
import { iconValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <metergroup [value]="value"></metergroup>
    </div>
  `,
})
export class MeterGroupIconComponent {
  value: MeterItem[] = iconValue;
}

export const Icon: StoryObj = {
  render: () => ({
    template: `<app-metergroup-icon></app-metergroup-icon>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Элементы с иконками в метках.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MeterGroupComponent } from '@cdek-it/angular-ui-kit';
import { MeterItem } from 'primeng/metergroup';

@Component({
  selector: 'app-metergroup-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MeterGroupComponent],
  template: \`
    <metergroup [value]="value"></metergroup>
  \`,
})
export class MeterGroupIconComponent {
  value: MeterItem[] = [
    { label: 'Apps', color: '#34d399', value: 16, icon: 'ti ti-apps' },
    { label: 'Messages', color: '#fbbf24', value: 8, icon: 'ti ti-message' },
    { label: 'System', color: '#60a5fa', value: 24, icon: 'ti ti-cpu' },
  ];
}
        `,
      },
    },
  },
};
