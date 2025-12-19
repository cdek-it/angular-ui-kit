import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex flex-col gap-3">
    <div class="font-semibold mb-2">Выберите категории</div>
    <div class="flex items-center gap-2">
      <p-checkbox [(ngModel)]="categories" name="category" value="Technology" inputId="category1" />
      <label for="category1">Технологии</label>
    </div>
    <div class="flex items-center gap-2">
      <p-checkbox [(ngModel)]="categories" name="category" value="Finance" inputId="category2" />
      <label for="category2">Финансы</label>
    </div>
    <div class="flex items-center gap-2">
      <p-checkbox [(ngModel)]="categories" name="category" value="Sports" inputId="category3" />
      <label for="category3">Спорт</label>
    </div>
  </div>
</div>
`;

const styles = '';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [Checkbox, FormsModule],
  template,
  styles
})
export class CheckboxGroupComponent {
  categories: string[] = ['Technology'];
}

export const Group: StoryObj = {
  render: () => ({
    template: `<app-checkbox-group></app-checkbox-group>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Группа чекбоксов для множественного выбора'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [Checkbox, FormsModule],
  template: \`${template}\`,
  styles: \`${styles}\`
})
export class CheckboxGroupComponent {
  categories: string[] = ['Technology'];
}
        `
      }
    }
  }
};
