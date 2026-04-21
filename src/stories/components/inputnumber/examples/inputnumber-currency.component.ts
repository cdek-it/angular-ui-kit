import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Currency: Story = {
  name: 'Currency',
  render: () => {
    const control = new FormControl<number | null>(null);
    return {
      props: { control },
      template: `
        <input-number
          suffix=" ₽"
          [useGrouping]="true"
          [formControl]="control"
        ></input-number>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputNumberComponent, ReactiveFormsModule],
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
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputNumberComponent, ReactiveFormsModule],
  template: \`<input-number suffix=" ₽" [useGrouping]="true" [formControl]="control"></input-number>\`,
})
export class CurrencyExample {
  control = new FormControl<number | null>(null);
}
        `,
      },
    },
  },
};
