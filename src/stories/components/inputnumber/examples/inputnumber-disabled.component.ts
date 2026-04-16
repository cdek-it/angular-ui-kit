import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Disabled: Story = {
  name: 'Disabled',
  render: (args) => ({
    props: { ...args, value: 42 },
    template: `
      <input-number
        [disabled]="true"
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
        story: 'Отключённое состояние — поле и кнопки недоступны для взаимодействия.',
      },
      source: {
        language: 'ts',
        code: `
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <input-number [disabled]="true" [showButtons]="true" buttonLayout="horizontal" [(ngModel)]="value"></input-number>
        `,
      },
    },
  },
};
