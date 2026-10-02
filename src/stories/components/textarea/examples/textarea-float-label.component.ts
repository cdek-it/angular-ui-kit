import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraTextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const FloatLabelStory: StoryObj = {
  name: 'FloatLabel',
  render: (args) => {
    const control = new FormControl('');
    return {
      props: { ...args, control },
      template: `<extra-textarea [formControl]="control" label="Комментарий" [floatLabel]="true" [clearable]="clearable"></extra-textarea>`
    };
  },
  args: {
    clearable: false
  },
  argTypes: {
    clearable: {
      control: 'boolean',
      description: 'Показывает иконку очистки поверх float-лейбла',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
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
        story: '`[floatLabel]="true"` — лейбл всплывает над полем при фокусе/значении, независимо от `labelPosition`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template: \`<extra-textarea [formControl]="control" label="Комментарий" [floatLabel]="true"></extra-textarea>\`,
})
export class FloatLabelExample {
  control = new FormControl('');
}
        `
      }
    }
  }
};
