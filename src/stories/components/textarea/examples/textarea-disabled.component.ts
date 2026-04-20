import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

type Story = StoryObj<TextareaComponent>;

export const Disabled: Story = {
  name: 'Disabled',
  render: (args) => ({
    props: { ...args, value: 'Текст в заблокированном поле' },
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
import { TextareaComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <ui-textarea [disabled]="true" [(ngModel)]="value"></ui-textarea>
        `,
      },
    },
  },
};
