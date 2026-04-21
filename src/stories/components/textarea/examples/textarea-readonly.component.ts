import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: (args) => {
    const control = new FormControl('Только для чтения — этот текст нельзя изменить.');
    return {
      props: { ...args, control },
      template: `<ui-textarea [formControl]="control" [readonly]="true" placeholder="Введите текст..."></ui-textarea>`,
    };
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
    controls: { disable: true },
    docs: {
      description: { story: 'Режим только для чтения — содержимое отображается, но не редактируется.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [TextareaComponent, ReactiveFormsModule],
  template: \`<ui-textarea [formControl]="control" [readonly]="true"></ui-textarea>\`,
})
export class ReadonlyExample {
  control = new FormControl('Только для чтения.');
}
        `,
      },
    },
  },
};
