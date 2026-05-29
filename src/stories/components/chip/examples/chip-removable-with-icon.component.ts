import { Component } from '@angular/core';
import { ExtraChipComponent } from '../../../../lib/components/chip/chip.component';

const template = `
<div class="bg-surface-ground">
  <extra-chip label="Задержан" icon="ti ti-alert-triangle" [removable]="true"></extra-chip>
</div>
`;
const styles = '';

@Component({
  selector: 'app-chip-removable-with-icon',
  standalone: true,
  imports: [ExtraChipComponent],
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
import { ExtraChipComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-chip-removable-with-icon',
  standalone: true,
  imports: [ExtraChipComponent],
  template: \`
    <extra-chip label="Задержан" icon="ti ti-alert-triangle" [removable]="true"></extra-chip>
  \`,
})
export class ChipRemovableWithIconComponent {}
        `,
      },
    },
  },
};
