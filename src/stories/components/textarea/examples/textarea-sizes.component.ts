import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

type Story = StoryObj<TextareaComponent>;

export const Sizes: Story = {
  name: 'Sizes',
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
        [variant]="variant"
        [placeholder]="placeholder"
        [(ngModel)]="value"
      ></ui-textarea>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры компонента: small, base, large, xlarge. Выберите размер через Controls.',
      },
      source: {
        language: 'ts',
        code: `<ui-textarea size="small" placeholder="Введите текст..." [(ngModel)]="value"></ui-textarea>
<ui-textarea placeholder="Введите текст..." [(ngModel)]="value"></ui-textarea>
<ui-textarea size="large" placeholder="Введите текст..." [(ngModel)]="value"></ui-textarea>
<ui-textarea size="xlarge" placeholder="Введите текст..." [(ngModel)]="value"></ui-textarea>`,
      },
    },
  },
};
