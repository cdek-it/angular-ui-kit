import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { AutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Самара', 'Омск'];

@Component({
  selector: 'app-autocomplete-dropdown',
  standalone: true,
  imports: [AutoCompleteComponent, FormsModule],
  template: `
    <auto-complete
      [suggestions]="filtered"
      [dropdown]="true"
      [completeOnFocus]="true"
      placeholder="Выберите город"
      (completeMethod)="search($event)"
      [(ngModel)]="value"
    ></auto-complete>
  `,
})
export class AutoCompleteDropdownComponent {
  value: string | null = null;
  filtered: string[] = [];

  search(event: any): void {
    this.filtered = CITIES.filter(item =>
      item.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}

export const Dropdown: StoryObj<AutoCompleteComponent> = {
  render: (args) => {
    const parts: string[] = [];

    parts.push(`[suggestions]="filtered"`);
    parts.push(`[dropdown]="true"`);
    parts.push(`[completeOnFocus]="true"`);
    parts.push(`placeholder="Выберите город"`);
    parts.push(`(completeMethod)="search($event)"`);
    parts.push(`[(ngModel)]="value"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.disabled)                     parts.push(`[disabled]="true"`);
    if (args.invalid)                      parts.push(`[invalid]="true"`);
    if (args.fluid)                        parts.push(`[fluid]="true"`);

    const template = `<auto-complete\n  ${parts.join('\n  ')}\n></auto-complete>`;

    const props: Record<string, any> = {
      ...args,
      value: null,
      filtered: [] as string[],
      search: (event: any) => {
        props['filtered'] = CITIES.filter(c =>
          c.toLowerCase().includes((event.query || '').toLowerCase())
        );
      },
    };

    return { props, template };
  },
  args: {
    size: 'base',
    disabled: false,
    invalid: false,
    fluid: false,
  },
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
