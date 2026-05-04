import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: (args) => {
    const control = new FormControl('12-34-56');
    return {
      props: { ...args, control },
      template: `<input-mask mask="99-99-99" placeholder="99-99-99" [readonly]="true" [formControl]="control"></input-mask>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputMaskComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Режим только для чтения — поле отображает значение, но недоступно для редактирования.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputMaskComponent, ReactiveFormsModule],
  template: \`<input-mask mask="99-99-99" [readonly]="true" [formControl]="control"></input-mask>\`,
})
export class ReadonlyExample {
  control = new FormControl('12-34-56');
}
        `,
      },
    },
  },
};
