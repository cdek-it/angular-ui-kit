import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraTextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: (args) => {
    const control = new FormControl({ value: 'Текст в заблокированном поле', disabled: true });
    return {
      props: { ...args, control },
      template: `<extra-textarea [formControl]="control" placeholder="Введите текст..."></extra-textarea>`
    };
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
    controls: { disable: true },
    docs: {
      description: { story: 'Отключённое состояние — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template: \`<extra-textarea [formControl]="control" placeholder="Введите текст..."></extra-textarea>\`,
})
export class DisabledExample {
  control = new FormControl({ value: '', disabled: true });
}
        `
      }
    }
  }
};
