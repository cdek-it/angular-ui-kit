import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

type Story = StoryObj<TextareaComponent>;

export const Readonly: Story = {
  name: 'Readonly',
  render: (args) => ({
    props: { ...args, value: 'Только для чтения — этот текст нельзя изменить.' },
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
    readonly: true,
    placeholder: 'Введите текст...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Режим только для чтения — содержимое отображается, но не редактируется.',
      },
      source: {
        language: 'ts',
        code: `
import { TextareaComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

// template:
// <ui-textarea [readonly]="true" [(ngModel)]="value"></ui-textarea>
        `,
      },
    },
  },
};
