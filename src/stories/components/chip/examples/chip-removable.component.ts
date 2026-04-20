import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
  <chip label="Хрупкий груз" [removable]="true"></chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-removable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent],
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
import { ChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-removable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent],
  template: \`
    <chip label="Хрупкий груз" [removable]="true"></chip>
  \`,
})
export class ChipRemovableComponent {}
        `,
      },
    },
  },
};
