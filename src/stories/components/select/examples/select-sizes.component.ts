import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraSelectComponent, ExtraSelectSize } from '../../../../lib/components/select/select.component';

const OPTIONS = [
  { name: 'Новосибирск', code: 'NSK' },
  { name: 'Москва', code: 'MSK' },
  { name: 'Санкт-Петербург', code: 'SPB' }
];

const SIZES: ExtraSelectSize[] = ['small', 'base', 'large', 'xlarge'];

const template = `
<div class="w-80 flex flex-col gap-4">
  @for (size of sizes; track size) {
    <extra-select
      [formControl]="controls[size]"
      [options]="options"
      optionLabel="name"
      [size]="size"
      [label]="'Size ' + size"
      placeholder="Выберите город..."
    ></extra-select>
  }
</div>
`;

@Component({
  selector: 'app-select-sizes',
  standalone: true,
  imports: [ExtraSelectComponent, ReactiveFormsModule],
  template
})
export class SelectSizesComponent {
  readonly sizes = SIZES;
  readonly options = OPTIONS;
  // по контролу на размер: с общим значение менялось бы сразу во всех полях
  readonly controls: Record<ExtraSelectSize, FormControl> = {
    small: new FormControl(null),
    base: new FormControl(null),
    large: new FormControl(null),
    xlarge: new FormControl(null)
  };
}

export const Sizes: StoryObj = {
  render: () => ({
    template: `<app-select-sizes></app-select-sizes>`
  }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `Размеры поля: \`small\`, \`base\`, \`large\`, \`xlarge\`. \`large\` маппится на PrimeNG \`size="large"\`, \`xlarge\` — на собственный класс \`p-select-xlg\`.

Визуально различается только \`xlarge\` (58px против 46px): в токенах \`select.root.sm\` и \`select.root.lg\` заданы теми же значениями, что и \`select.root\` — одинаковые \`paddingX\`, \`paddingY\` и \`fontSize\`. Поэтому \`small\`, \`base\` и \`large\` совпадают пиксель в пиксель.`
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraSelectComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraSelectComponent],
  template: \`
    <extra-select [options]="options" optionLabel="name" size="small" label="Size small"></extra-select>
    <extra-select [options]="options" optionLabel="name" size="base" label="Size base"></extra-select>
    <extra-select [options]="options" optionLabel="name" size="large" label="Size large"></extra-select>
    <extra-select [options]="options" optionLabel="name" size="xlarge" label="Size xlarge"></extra-select>
  \`,
})
export class SelectSizesExample {
  options = [
    { name: 'Новосибирск', code: 'NSK' },
    { name: 'Москва', code: 'MSK' },
  ];
}
        `
      }
    }
  }
};
