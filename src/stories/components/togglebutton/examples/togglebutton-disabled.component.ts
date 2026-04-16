import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ToggleButtonComponent } from '../../../../lib/components/togglebutton/togglebutton.component';

const template = `
<div class="flex flex-wrap gap-3">
  <toggle-button
    onLabel="Вкл"
    offLabel="Выкл"
    [disabled]="true"
    [(ngModel)]="unchecked"
  ></toggle-button>
  <toggle-button
    onLabel="Вкл"
    offLabel="Выкл"
    [disabled]="true"
    [(ngModel)]="checked"
  ></toggle-button>
</div>
`;
const styles = '';

@Component({
  selector: 'app-togglebutton-disabled',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template,
  styles,
})
export class ToggleButtonDisabledComponent {
  unchecked = false;
  checked = true;
}

export const Disabled: StoryObj = {
  render: () => ({
    template: `<app-togglebutton-disabled></app-togglebutton-disabled>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Отключённое состояние: выключенный и включённый варианты.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleButtonComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-togglebutton-disabled',
  standalone: true,
  imports: [ToggleButtonComponent, FormsModule],
  template: \`
    <toggle-button onLabel="Вкл" offLabel="Выкл" [disabled]="true" [(ngModel)]="checked"></toggle-button>
  \`,
})
export class ToggleButtonDisabledComponent {
  checked = false;
}
        `,
      },
    },
  },
};
