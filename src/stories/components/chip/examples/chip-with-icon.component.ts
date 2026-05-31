import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ChipComponent } from '../../../../lib/components/chip/chip.component';
import { Component } from '@angular/core';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
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
  styles,
})
export class ChipWithIconComponent {}

export const WithIcon = {
  render: () => ({
    template: `<app-chip-with-icon></app-chip-with-icon>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Чип с иконкой.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-with-icon',
  standalone: true,
  imports: [ExtraChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-chip label="В пути" icon="ti ti-map-pin"></extra-chip>
  \`,
})
export class ChipWithIconComponent {}
        `,
      },
    },
  },
};
