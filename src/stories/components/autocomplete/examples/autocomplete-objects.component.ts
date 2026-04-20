import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-autocomplete-objects',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: `
    <div style="width: 320px">
      <auto-complete
        [suggestions]="filtered"
        optionLabel="name"
        [forceSelection]="true"
        placeholder="Поиск по объектам"
        (completeMethod)="search($event)"
        [(ngModel)]="value"
      ></auto-complete>
    </div>
  `,
})
export class AutoCompleteObjectsComponent {
  value: City | null = null;
  items: City[] = [
    { name: 'Москва', code: 'MSK' },
    { name: 'Санкт-Петербург', code: 'SPB' },
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Екатеринбург', code: 'EKB' },
    { name: 'Казань', code: 'KZN' },
  ];
  filtered: City[] = [];

  search(event: any): void {
    this.filtered = this.items.filter(item =>
      item.name.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}

export const Objects: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-objects></app-autocomplete-objects>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Работа с объектами через `optionLabel` и `forceSelection` для строгого выбора из списка.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteComponent } from '@cdek-it/angular-ui-kit';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-autocomplete-objects',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: \`
    <auto-complete
      [suggestions]="filtered"
      optionLabel="name"
      [forceSelection]="true"
      placeholder="Поиск по объектам"
      (completeMethod)="search($event)"
      [(ngModel)]="value"
    ></auto-complete>
  \`,
})
export class AutoCompleteObjectsComponent {
  value: City | null = null;
  items: City[] = [
    { name: 'Москва', code: 'MSK' },
    { name: 'Санкт-Петербург', code: 'SPB' },
    { name: 'Новосибирск', code: 'NSK' },
  ];
  filtered: City[] = [];

  search(event: any): void {
    this.filtered = this.items.filter(item =>
      item.name.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}
        `,
      },
    },
  },
};
