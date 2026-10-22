import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraAutoCompleteComponent } from '../../../../lib/components/autocomplete/autocomplete.component';

const CITIES = ['Новосибирск', 'Москва', 'Санкт-Петербург', 'Екатеринбург', 'Казань'];

const template = `
<div class="flex flex-col gap-6">
  <extra-auto-complete
    [formControl]="control"
    [suggestions]="filtered"
    (completeMethod)="search($event)"
    label="Лейбл сверху"
    placeholder="Начните ввод..."
    info="Дополнительная информация в тултипе"
    caption="Пояснение под полем"
  ></extra-auto-complete>
  <extra-auto-complete
    [formControl]="control"
    [suggestions]="filtered"
    (completeMethod)="search($event)"
    [floatLabel]="true"
    label="Плавающий лейбл"
  ></extra-auto-complete>
  <extra-auto-complete
    [formControl]="control"
    [suggestions]="filtered"
    (completeMethod)="search($event)"
    labelPosition="left"
    label="Лейбл слева"
    placeholder="Начните ввод..."
  ></extra-auto-complete>
  <extra-auto-complete
    [formControl]="control"
    [suggestions]="filtered"
    (completeMethod)="search($event)"
    placeholder="Без label и caption"
  ></extra-auto-complete>
</div>
`;

@Component({
  selector: 'app-autocomplete-labels',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template
})
export class AutoCompleteLabelsComponent {
  control = new FormControl<string | null>(null);
  filtered: string[] = [];

  search(event: { query: string }): void {
    this.filtered = CITIES.filter((c) => c.toLowerCase().includes((event.query || '').toLowerCase()));
  }
}

export const Labels: StoryObj = {
  render: () => ({
    template: `<app-autocomplete-labels></app-autocomplete-labels>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Положения лейбла (labelPosition): top — сверху (по умолчанию), left — слева от поля; floatLabel — плавающий лейбл внутри поля. Info показывается иконкой ti-info-circle с тултипом, caption — пояснение под полем.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraAutoCompleteComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-autocomplete-labels',
  standalone: true,
  imports: [ExtraAutoCompleteComponent, ReactiveFormsModule],
  template: \`
    <extra-auto-complete
      [formControl]="control"
      [suggestions]="filtered"
      (completeMethod)="search($event)"
      label="Лейбл сверху"
      placeholder="Начните ввод..."
      info="Дополнительная информация в тултипе"
      caption="Пояснение под полем"
    ></extra-auto-complete>

    <extra-auto-complete
      [formControl]="control"
      [suggestions]="filtered"
      (completeMethod)="search($event)"
      [floatLabel]="true"
      label="Плавающий лейбл"
    ></extra-auto-complete>

    <extra-auto-complete
      [formControl]="control"
      [suggestions]="filtered"
      (completeMethod)="search($event)"
      labelPosition="left"
      label="Лейбл слева"
      placeholder="Начните ввод..."
    ></extra-auto-complete>
  \`,
})
export class AutoCompleteLabelsComponent {
  control = new FormControl<string | null>(null);
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
