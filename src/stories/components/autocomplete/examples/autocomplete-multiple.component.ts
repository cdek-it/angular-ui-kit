import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-multiple',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <auto-complete
        [suggestions]="filtered"
        [multiple]="true"
        placeholder="Добавьте города"
        (completeMethod)="search($event)"
        [(ngModel)]="values"
      ></auto-complete>
    </div>
  `,
})
export class AutoCompleteMultipleComponent {
  values: string[] = [];
  items = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород'];
  filtered: string[] = [];

  search(event: any): void {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}

export const Multiple: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-multiple></app-autocomplete-multiple>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Множественный выбор с отображением выбранных значений в виде чипсов.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-multiple',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: \`
    <auto-complete
      [suggestions]="filtered"
      [multiple]="true"
      placeholder="Добавьте города"
      (completeMethod)="search($event)"
      [(ngModel)]="values"
    ></auto-complete>
  \`,
})
export class AutoCompleteMultipleComponent {
  values: string[] = [];
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
