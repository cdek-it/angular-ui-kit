import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import {
  ExtraSelectComponent,
  ExtraSelectOptionDirective,
  ExtraSelectSelectedItemDirective
} from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Москва', code: 'MOW' },
  { name: 'Санкт-Петербург', code: 'LED' },
  { name: 'Новосибирск', code: 'OVB' },
  { name: 'Екатеринбург', code: 'SVX' }
];

const template = `
<div class="w-80">
  <extra-select [formControl]="control" [options]="options" optionLabel="name" placeholder="Выберите город...">
    <ng-template extraSelectOption let-option>
      <div class="flex items-center gap-2">
        <i class="ti ti-map-pin"></i>
        <span>{{ option.name }}</span>
        <small class="text-surface-400 ml-auto">{{ option.code }}</small>
      </div>
    </ng-template>

    <ng-template extraSelectSelectedItem let-option>
      <div class="flex items-center gap-2">
        <i class="ti ti-map-pin text-primary"></i>
        <span class="font-semibold">{{ option.name }}</span>
        <span class="text-surface-400">({{ option.code }})</span>
      </div>
    </ng-template>
  </extra-select>
</div>
`;

@Component({
  selector: 'app-select-selected-item',
  standalone: true,
  imports: [ExtraSelectComponent, ExtraSelectOptionDirective, ExtraSelectSelectedItemDirective, ReactiveFormsModule],
  template
})
export class SelectSelectedItemComponent {
  readonly options = OPTIONS;
  // значение задано сразу: без него поле показывает плейсхолдер,
  // и шаблон выбранного значения — то, ради чего история, — не виден
  control = new FormControl(OPTIONS[0]);
}

export const SelectedItem: StoryObj = {
  name: 'Selected Item',
  render: () => ({ template: `<app-select-selected-item></app-select-selected-item>` }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `Два независимых шаблона на одном поле:

- \`extraSelectOption\` — как выглядит пункт в раскрытом списке;
- \`extraSelectSelectedItem\` — как выглядит выбранное значение в закрытом поле.

Оба получают опцию через \`let-option\` — это элемент массива \`options\` целиком, а не строка из \`optionLabel\`. Поле открывается с уже выбранной «Москвой», чтобы было видно оформление выбранного значения: жирное название, иконка цветом акцента и код в скобках. Раскройте список — пункты оформлены иначе: код прижат вправо, иконка нейтральная.

Если задать только \`extraSelectOption\`, закрытое поле покажет обычный текст из \`optionLabel\`: шаблоны не наследуют друг друга.`
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ExtraSelectComponent,
  ExtraSelectOptionDirective,
  ExtraSelectSelectedItemDirective,
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-cities',
  standalone: true,
  // обе директивы обязательны: без импорта ng-template просто не будет найден
  imports: [
    ExtraSelectComponent,
    ExtraSelectOptionDirective,
    ExtraSelectSelectedItemDirective,
    ReactiveFormsModule,
  ],
  template: \`
    <extra-select [formControl]="control" [options]="options" optionLabel="name" placeholder="Выберите город...">
      <!-- пункт раскрытого списка -->
      <ng-template extraSelectOption let-option>
        <div class="flex items-center gap-2">
          <i class="ti ti-map-pin"></i>
          <span>{{ option.name }}</span>
          <small class="text-surface-400 ml-auto">{{ option.code }}</small>
        </div>
      </ng-template>

      <!-- выбранное значение в закрытом поле -->
      <ng-template extraSelectSelectedItem let-option>
        <div class="flex items-center gap-2">
          <i class="ti ti-map-pin text-primary"></i>
          <span class="font-semibold">{{ option.name }}</span>
          <span class="text-surface-400">({{ option.code }})</span>
        </div>
      </ng-template>
    </extra-select>
  \`,
})
export class CitiesComponent {
  options = [
    { name: 'Москва', code: 'MOW' },
    { name: 'Санкт-Петербург', code: 'LED' },
    { name: 'Новосибирск', code: 'OVB' },
    { name: 'Екатеринбург', code: 'SVX' },
  ];

  // без optionValue в модели лежит сам объект опции —
  // поэтому и предвыбор задаётся объектом из options
  control = new FormControl(this.options[0]);
}
        `
      }
    }
  }
};
