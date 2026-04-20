import { Component, ChangeDetectionStrategy} from '@angular/core';
import { ChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
  <chip label="Задержан" icon="ti ti-alert-triangle" [removable]="true"></chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-removable-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent],
  template,
  styles,
})
export class ChipRemovableWithIconComponent {}

export const RemovableWithIcon = {
  render: () => ({
    template: `<app-chip-removable-with-icon></app-chip-removable-with-icon>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Чип с иконкой и кнопкой удаления.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-removable-with-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent],
  template: \`
    <chip label="Задержан" icon="ti ti-alert-triangle" [removable]="true"></chip>
  \`,
})
export class ChipRemovableWithIconComponent {}
        `,
      },
    },
  },
};
