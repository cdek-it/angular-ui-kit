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
`;
const styles = '';

@Component({
  selector: 'app-select-selected-item',
  standalone: true,
  imports: [ExtraSelectComponent, ExtraSelectOptionDirective, ExtraSelectSelectedItemDirective, ReactiveFormsModule],
  template,
  styles
})
export class SelectSelectedItemComponent {
  control = new FormControl(null);
  options = OPTIONS;
}

export const SelectedItem: StoryObj = {
  name: 'Selected Item',
  render: () => ({ template: `<app-select-selected-item></app-select-selected-item>` }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Кастомное отображение выбранного значения (в закрытом состоянии) через `extraSelectSelectedItem`, а пунктов списка — через `extraSelectOption`. Оба получают `let-option`.'
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
  standalone: true,
  imports: [
    ExtraSelectComponent,
    ExtraSelectOptionDirective,
    ExtraSelectSelectedItemDirective,
    ReactiveFormsModule,
  ],
  template: \`
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
  \`,
})
export class SelectSelectedItemExample {
  control = new FormControl(null);
  options = [ /* ... */ ];
}
        `
      }
    }
  }
};
