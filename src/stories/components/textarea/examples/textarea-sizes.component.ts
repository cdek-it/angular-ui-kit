import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraTextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Sizes: StoryObj = {
  name: 'Sizes',
  render: (args) => {
    const control = new FormControl('');
    return {
      props: { ...args, control },
      template: `<extra-textarea [formControl]="control" [size]="size" [placeholder]="placeholder" [showClear]="showClear"></extra-textarea>`
    };
  },
  args: {
    size: 'base',
    placeholder: 'Введите текст...'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge']
    }
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraTextareaComponent, ReactiveFormsModule]
      }
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'Все доступные размеры компонента: small, base, large, xlarge. Выберите размер через Controls.'
      },
      source: {
        language: 'ts',
        code: `
<extra-textarea size="small" placeholder="Введите текст..." [formControl]="control"></extra-textarea>
<extra-textarea placeholder="Введите текст..." [formControl]="control"></extra-textarea>
<extra-textarea size="large" placeholder="Введите текст..." [formControl]="control"></extra-textarea>
<extra-textarea size="xlarge" placeholder="Введите текст..." [formControl]="control"></extra-textarea>
        `
      }
    }
  }
};
