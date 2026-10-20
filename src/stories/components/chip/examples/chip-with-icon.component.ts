import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div>
  <extra-chip label="В пути" icon="ti ti-map-pin"></extra-chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-with-icon',
  standalone: true,
  imports: [ExtraChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles
})
export class ChipWithIconComponent {}

export const WithIcon: StoryObj = {
  render: () => ({
    template: `<app-chip-with-icon></app-chip-with-icon>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Чип с иконкой.' },
      source: {
        language: 'html',
        code: `<extra-chip label="В пути" icon="ti ti-map-pin"></extra-chip>`
      }
    }
  }
};
