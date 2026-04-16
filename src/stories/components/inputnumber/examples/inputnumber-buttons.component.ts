import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Buttons: Story = {
  name: 'Buttons',
  render: (args) => ({
    props: { ...args, value: null },
    template: `
      <input-number
        [showButtons]="true"
        buttonLayout="horizontal"
        [(ngModel)]="value"
      ></input-number>
    `,
  }),
  args: {},
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Числовое поле с кнопками увеличения/уменьшения в горизонтальной раскладке. Кастомные SVG-иконки +/− используются по умолчанию.',
      },
      source: {
        language: 'ts',
        code: `
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-number [showButtons]="true" buttonLayout="horizontal" [(ngModel)]="value"></input-number>
        `,
      },
    },
  },
};
