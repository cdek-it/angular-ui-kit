import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ChipComponent } from '../../../../lib/components/chip/chip.component';
import { Component } from '@angular/core';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
  <extra-chip label="Хрупкий груз" [removable]="true"></extra-chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-removable',
  standalone: true,
  imports: [ExtraChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template,
  styles,
})
export class ChipRemovableComponent {}

export const Removable = {
  render: () => ({
    template: `<app-chip-removable></app-chip-removable>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Чип с кнопкой удаления.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-removable',
  standalone: true,
  imports: [ExtraChipComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-chip label="Хрупкий груз" [removable]="true"></extra-chip>
  \`,
})
export class ChipRemovableComponent {}
        `,
      },
    },
  },
};
