import { Component, ChangeDetectionStrategy} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../../../../lib/components/checkbox/checkbox.component';

const template = `
<div class="bg-surface-ground flex flex-col gap-4">
  <checkbox value="Pizza" [(ngModel)]="selectedItems"></checkbox>
  <checkbox value="Burger" [(ngModel)]="selectedItems"></checkbox>
  <checkbox value="Sushi" [(ngModel)]="selectedItems"></checkbox>
</div>
`;

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, FormsModule, JsonPipe],
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
import { CheckboxComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, FormsModule],
  template: \`
    <checkbox value="Pizza" [(ngModel)]="selectedItems"></checkbox>
    <checkbox value="Burger" [(ngModel)]="selectedItems"></checkbox>
    <checkbox value="Sushi" [(ngModel)]="selectedItems"></checkbox>
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
