import { Component, ChangeDetectionStrategy} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraCheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-4">
  <extra-checkbox value="Pizza" [(ngModel)]="selectedItems"></extra-checkbox>
  <extra-checkbox value="Burger" [(ngModel)]="selectedItems"></extra-checkbox>
  <extra-checkbox value="Sushi" [(ngModel)]="selectedItems"></extra-checkbox>
</div>
`;

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraCheckboxComponent, FormsModule, JsonPipe],
  template,
})
export class CheckboxGroupComponent {
  selectedItems: string[] = ['Pizza'];
}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-checkbox-group></app-checkbox-group>`,
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Использование нескольких чекбоксов для выбора нескольких значений из массива.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraCheckboxComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [ExtraCheckboxComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <extra-checkbox value="Pizza" [(ngModel)]="selectedItems"></extra-checkbox>
    <extra-checkbox value="Burger" [(ngModel)]="selectedItems"></extra-checkbox>
    <extra-checkbox value="Sushi" [(ngModel)]="selectedItems"></extra-checkbox>
  \`,
})
export class CheckboxGroupComponent {
  selectedItems: string[] = ['Pizza'];
}
        `,
      },
    },
  },
};
