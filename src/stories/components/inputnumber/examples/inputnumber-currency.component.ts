import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<ExtraInputNumberComponent>;

export const Currency: Story = {
  name: 'Currency',
  render: () => {
    const control = new FormControl<number | null>(null);
    return {
      props: { control },
      template: `
        <extra-input-number
          suffix=" ₽"
          [useGrouping]="true"
          [formControl]="control"
        ></extra-input-number>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputNumberComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Форматирование значения как валюты через `suffix`. Режим `mode="currency"` не используется из-за известного бага PrimeNG с кареткой.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template: \`<extra-input-number suffix=" ₽" [useGrouping]="true" [formControl]="control"></extra-input-number>\`,
})
export class CurrencyExample {
  control = new FormControl<number | null>(null);
}
        `,
      },
    },
  },
};
