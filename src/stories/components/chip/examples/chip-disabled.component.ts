import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
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

export const Disabled = {
  render: () => ({
    template: `<app-chip-disabled></app-chip-disabled>`
  }),
  parameters: {
    docs: {
      description: { story: 'Отключённый чип.' },
      source: {
        language: 'ts',
        code: `
import { ExtraChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-disabled',
  standalone: true,
  imports: [ExtraChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-chip label="Доставлен" icon="ti ti-check" [removable]="true" [disabled]="true"></extra-chip>
  \`,
})
export class ChipDisabledComponent {}
        `
      }
    }
  }
};
