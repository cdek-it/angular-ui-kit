import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-dropdown',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <auto-complete
        [suggestions]="filtered"
        [dropdown]="true"
        [completeOnFocus]="true"
        placeholder="Выберите город"
        (completeMethod)="search($event)"
        [(ngModel)]="value"
      ></auto-complete>
    </div>
  `,
})
export class AutoCompleteDropdownComponent {
  value: string | null = null;
  items = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Самара', 'Омск'];
  filtered: string[] = [];

  search(event: any): void {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}

export const Dropdown: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-dropdown></app-autocomplete-dropdown>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Автодополнение с кнопкой выпадающего списка для отображения всех вариантов.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-dropdown',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: \`
    <auto-complete
      [suggestions]="filtered"
      [dropdown]="true"
      [completeOnFocus]="true"
      placeholder="Выберите город"
      (completeMethod)="search($event)"
      [(ngModel)]="value"
    ></auto-complete>
  \`,
})
export class AutoCompleteDropdownComponent {
  value: string | null = null;
  items = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург'];
  filtered: string[] = [];

  search(event: any): void {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}
        `,
      },
    },
  },
};
