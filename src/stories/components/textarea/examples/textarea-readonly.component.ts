import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraTextareaComponent } from '../../../../lib/components/textarea/textarea.component';

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: (args) => {
    const control = new FormControl('Только для чтения — этот текст нельзя изменить.');
    return {
      props: { ...args, control },
      template: `<extra-textarea [formControl]="control" [readonly]="true" placeholder="Введите текст..."></extra-textarea>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraTextareaComponent, ReactiveFormsModule],
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
import { ExtraTextareaComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraTextareaComponent, ReactiveFormsModule],
  template: \`<extra-textarea [formControl]="control" [readonly]="true"></extra-textarea>\`,
})
export class ReadonlyExample {
  control = new FormControl('Только для чтения.');
}
        `,
      },
    },
  },
};
