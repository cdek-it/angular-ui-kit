import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from '../../../../lib/components/inputgroup/input-group.component';
import { InputGroupAddonComponent } from '../../../../lib/components/inputgroup/input-group-addon.component';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

const template = `
<div class="bg-surface-ground p-4">
  <input-group size="xlarge">
    <input-group-addon><i class="ti ti-search"></i></input-group-addon>
    <input-text placeholder="Поиск отправлений..." size="xlarge" [(ngModel)]="value" [fluid]="true"></input-text>
  </input-group>
</div>
`;
const styles = '';

@Component({
  selector: 'app-inputgroup-xlarge',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template,
  styles,
})
export class InputGroupXlargeComponent {
  value = '';
}

export const XLarge: StoryObj = {
  render: () => ({
    template: `<app-inputgroup-xlarge></app-inputgroup-xlarge>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Увеличенный размер группы ввода — для акцентных форм и поисковых строк.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent, InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-inputgroup-xlarge',
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, InputTextComponent, FormsModule],
  template: \`
    <input-group size="xlarge">
      <input-group-addon><i class="ti ti-search"></i></input-group-addon>
      <input-text placeholder="Поиск отправлений..." size="xlarge" [(ngModel)]="value" [fluid]="true"></input-text>
    </input-group>
  \`,
})
export class InputGroupXlargeComponent {
  value = '';
}
        `,
      },
    },
  },
};
