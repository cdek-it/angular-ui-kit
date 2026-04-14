import { Component } from '@angular/core';
import { ChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
  <chip label="Доставлен" icon="ti ti-check" [removable]="true" [disabled]="true"></chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-disabled',
  standalone: true,
  imports: [ChipComponent],
  template,
  styles,
})
export class ChipDisabledComponent {}

export const Disabled = {
  render: () => ({
    template: `<app-chip-disabled></app-chip-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Отключённый чип.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-disabled',
  standalone: true,
  imports: [ChipComponent],
  template: \`
    <chip label="Доставлен" icon="ti ti-check" [removable]="true" [disabled]="true"></chip>
  \`,
})
export class ChipDisabledComponent {}
        `,
      },
    },
  },
};
