import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div>
  <extra-chip label="Доставлен" icon="ti ti-check" [removable]="true" [disabled]="true"></extra-chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-disabled',
  standalone: true,
  imports: [ExtraChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ChipDisabledComponent {}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-chip-disabled></app-chip-disabled>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Отключённый чип: кнопка удаления не получает фокус и не эмитит `(onRemove)`.'
      },
      source: {
        language: 'html',
        code: `<extra-chip label="Доставлен" icon="ti ti-check" [removable]="true" [disabled]="true"></extra-chip>`
      }
    }
  }
};
