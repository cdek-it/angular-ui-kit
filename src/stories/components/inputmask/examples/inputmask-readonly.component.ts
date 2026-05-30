import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: (args) => {
    const control = new FormControl('12-34-56');
    return {
      props: { ...args, control },
      template: `<extra-input-mask mask="99-99-99" placeholder="99-99-99" [readonly]="true" [formControl]="control"></extra-input-mask>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputMaskComponent, ReactiveFormsModule],
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
import { ExtraInputMaskComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputMaskComponent, ReactiveFormsModule],
  template: \`<extra-input-mask mask="99-99-99" [readonly]="true" [formControl]="control"></extra-input-mask>\`,
})
export class ReadonlyExample {
  control = new FormControl('12-34-56');
}
        `,
      },
    },
  },
};
