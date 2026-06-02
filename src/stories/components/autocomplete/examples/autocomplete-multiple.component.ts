import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-multiple',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <extra-auto-complete
        [suggestions]="filtered"
        [multiple]="true"
        placeholder="Добавьте города"
        (completeMethod)="search($event)"
        [(ngModel)]="values"
      ></extra-auto-complete>
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
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-multiple',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, FormsModule],
  template: \`
    <extra-auto-complete
      [suggestions]="filtered"
      [multiple]="true"
      placeholder="Добавьте города"
      (completeMethod)="search($event)"
      [(ngModel)]="values"
    ></extra-auto-complete>
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
