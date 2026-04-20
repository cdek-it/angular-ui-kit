import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

type Story = StoryObj<InputTextComponent>;

export const Disabled: Story = {
  name: 'Disabled',
  render: (args) => ({
    props: { ...args, value: 'Disabled с текстом' },
    template: `
      <input-text
        [size]="size"
        [showClear]="showClear"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [fluid]="fluid"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></input-text>
    `,
  }),
  args: {
    disabled: true,
    placeholder: 'Введите текст...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Отключённое состояние — поле недоступно для взаимодействия.',
      },
      source: {
        language: 'ts',
        code: `
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-text [disabled]="true" [(ngModel)]="value"></input-text>
        `,
      },
    },
  },
};
