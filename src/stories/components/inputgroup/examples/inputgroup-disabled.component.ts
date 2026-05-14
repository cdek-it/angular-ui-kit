import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { InputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <input-group>
    <input-group-addon><i class="ti ti-user"></i></input-group-addon>
    <input-text placeholder="Введите данные..." [disabled]="true" [(ngModel)]="value" [fluid]="true"></input-text>
  </input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-disabled',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputGroupDisabledComponent {
  value = '';
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-disabled></app-inputgroup-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Отключённое состояние — аддоны автоматически получают стили disabled вместе с полем ввода.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-disabled',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <input-group>
      <input-group-addon><i class="ti ti-user"></i></input-group-addon>
      <input-text placeholder="Введите данные..." [disabled]="true" [(ngModel)]="value" [fluid]="true"></input-text>
    </input-group>
  \`,
})
export class InputGroupDisabledComponent {
  value = '';
}
        `,
      },
    },
  },
};
