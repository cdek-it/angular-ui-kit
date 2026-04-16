import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Currency: Story = {
  name: 'Currency',
  render: (args) => ({
    props: { ...args, value: null },
    template: `
      <input-number
        [mode]="mode"
        [currency]="currency"
        [locale]="locale"
        [(ngModel)]="value"
      ></input-number>
    `,
  }),
  args: {
    mode: 'currency',
    currency: 'RUB',
    locale: 'ru-RU',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Форматирование значения как валюты (рубли). Используются `mode="currency"`, `currency="RUB"` и `locale="ru-RU"`.',
      },
      source: {
        language: 'ts',
        code: `
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-number mode="currency" currency="RUB" locale="ru-RU" [(ngModel)]="value"></input-number>
        `,
      },
    },
  },
};
