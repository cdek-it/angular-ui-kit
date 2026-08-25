import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-input-group>
    <extra-input-group-addon><i class="ti ti-user"></i></extra-input-group-addon>
    <extra-input-text placeholder="Введите данные..." [formControl]="control"></extra-input-text>
  </extra-input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-disabled',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, ReactiveFormsModule],
  template,
  styles
})
export class InputGroupDisabledComponent {
  control = new FormControl({ value: '', disabled: true });
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-disabled></app-inputgroup-disabled>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Отключённое состояние — управляется через FormControl; аддоны автоматически получают стили disabled вместе с полем ввода.'
      },
      source: {
        language: 'ts',
        code: `
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-disabled',
  standalone: true,
  imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, ReactiveFormsModule],
  template: \`
    <extra-input-group>
      <extra-input-group-addon><i class="ti ti-user"></i></extra-input-group-addon>
      <extra-input-text placeholder="Введите данные..." [formControl]="control"></extra-input-text>
    </extra-input-group>
  \`,
})
export class InputGroupDisabledComponent {
  control = new FormControl({ value: '', disabled: true });
}
        `
      }
    }
  }
};
