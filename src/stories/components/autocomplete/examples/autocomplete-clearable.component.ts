import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

const CITIES = ['Новосибирск', 'Москва', 'Санкт-Петербург', 'Екатеринбург'];

const template = `
<div class="flex flex-col gap-4">
  <extra-auto-complete
    [formControl]="filled"
    [suggestions]="filtered"
    (completeMethod)="search($event)"
    [clearable]="true"
    label="С очисткой"
    placeholder="Начните ввод..."
    caption="Иконка × появляется при наличии значения"
  ></extra-auto-complete>
  <extra-auto-complete
    [formControl]="empty"
    [suggestions]="filtered"
    (completeMethod)="search($event)"
    [clearable]="true"
    label="С очисткой (пустое)"
    placeholder="Начните ввод..."
  ></extra-auto-complete>
</div>
`;

@Component({
  selector: 'app-autocomplete-clearable',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template
})
export class AutoCompleteClearableComponent {
  filled = new FormControl('Новосибирск');
  empty = new FormControl<string | null>(null);
  filtered: string[] = [];

  search(event: { query: string }): void {
    this.filtered = CITIES.filter((c) => c.toLowerCase().includes((event.query || '').toLowerCase()));
  }
}

export const Clearable: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-clearable></app-autocomplete-clearable>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Поле с иконкой очистки (clearable) — соответствует PrimeNG `showClear`. Иконка появляется только при наличии значения.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-clearable',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template: \`
    <extra-auto-complete
      [formControl]="control"
      [suggestions]="filtered"
      (completeMethod)="search($event)"
      [clearable]="true"
      label="С очисткой"
      placeholder="Начните ввод..."
    ></extra-auto-complete>
  \`,
})
export class AutoCompleteClearableComponent {
  control = new FormControl('Новосибирск');
  filtered: string[] = [];

  search(event: { query: string }): void {
    this.filtered = ['Новосибирск', 'Москва'].filter((c) =>
      c.toLowerCase().includes((event.query || '').toLowerCase())
    );
  }
}
        `
      }
    }
  }
};
