import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: (args) => {
    const control = new FormControl('');
    return {
      props: { ...args, control },
      template: `<ui-textarea [formControl]="control" [size]="size" [placeholder]="placeholder" [showClear]="showClear"></ui-textarea>`,
    };
  },
  args: {
    size: 'base',
    placeholder: 'Введите текст...',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
    },
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [TextareaComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры компонента: small, base, large, xlarge. Выберите размер через Controls.',
      },
      source: {
        language: 'ts',
        code: `
<ui-textarea size="small" placeholder="Введите текст..." [formControl]="control"></ui-textarea>
<ui-textarea placeholder="Введите текст..." [formControl]="control"></ui-textarea>
<ui-textarea size="large" placeholder="Введите текст..." [formControl]="control"></ui-textarea>
<ui-textarea size="xlarge" placeholder="Введите текст..." [formControl]="control"></ui-textarea>
        `,
      },
    },
  },
};
