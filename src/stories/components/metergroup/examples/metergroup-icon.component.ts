import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMeterGroupComponent, ExtraMeterItem } from '../../../../lib/components/metergroup/metergroup.component';
import { iconValue } from '../metergroup.data';

@Component({
  selector: 'app-metergroup-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMeterGroupComponent],
  template: `
    <div class="bg-surface-ground">
      <extra-metergroup ariaLabel="Использование диска" [value]="value"></extra-metergroup>
    </div>
  `
})
export class MeterGroupIconComponent {
  value: ExtraMeterItem[] = iconValue;
}

export const Icon: StoryObj = {
  render: () => ({
    template: `<app-metergroup-icon></app-metergroup-icon>`
  }),
  parameters: {
    docs: {
      description: { story: 'Элементы с иконками в метках.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMeterGroupComponent, ExtraMeterItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-metergroup-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMeterGroupComponent],
  template: \`
    <extra-metergroup ariaLabel="Использование диска" [value]="value"></extra-metergroup>
  \`,
})
export class MeterGroupIconComponent {
  value: ExtraMeterItem[] = [
    { label: 'Apps', color: '#34d399', value: 16, icon: 'ti ti-apps' },
    { label: 'Messages', color: '#fbbf24', value: 8, icon: 'ti ti-message' },
    { label: 'System', color: '#60a5fa', value: 24, icon: 'ti ti-cpu' },
  ];
}
        `
      }
    }
  }
};
