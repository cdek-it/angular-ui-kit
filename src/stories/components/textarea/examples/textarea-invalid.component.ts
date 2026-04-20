import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

type Story = StoryObj<TextareaComponent>;

export const Invalid: Story = {
  name: 'Invalid',
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <ui-textarea
        [size]="size"
        [disabled]="disabled"
        [readonly]="readonly"
        [invalid]="invalid"
        [fluid]="fluid"
        [autoResize]="autoResize"
        [rows]="rows"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></ui-textarea>
    `,
  }),
  args: {
    invalid: true,
    placeholder: 'Обязательное поле',
  },
  parameters: {
    docs: {
      description: {
        story: 'Невалидное состояние — поле выделяется красной рамкой.',
      },
      source: {
        language: 'ts',
        code: `
import { TextareaComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <ui-textarea [invalid]="true" placeholder="Обязательное поле" [(ngModel)]="value"></ui-textarea>
        `,
      },
    },
  },
};
