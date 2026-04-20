import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
  <chip label="В пути" icon="ti ti-map-pin"></chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent],
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
import { ChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent],
  template: \`
    <chip label="В пути" icon="ti ti-map-pin"></chip>
  \`,
})
export class ChipWithIconComponent {}
        `,
      },
    },
  },
};
