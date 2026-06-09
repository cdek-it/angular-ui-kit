import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

@Component({
  selector: 'app-inputtext-readonly',
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule, FormsModule],
  template: `<extra-input-text
    [formControl]="control"
    [readonly]="true"
    placeholder="Введите текст..."
  ></extra-input-text>`
})
export class InputTextReadonlyComponent {
  control = new FormControl('');
}

export const Readonly: StoryObj = {
  name: 'Readonly',
  render: () => ({
    template: `<app-inputtext-readonly></app-inputtext-readonly>`,
  }),
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputTextReadonlyComponent],
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule],
  template: \`<input-text [formControl]="control" [readonly]="true" placeholder="Введите текст..."></input-text>\`,
})
export class ReadonlyExample {
  control = new FormControl('');
}
        `,
      },
    },
  },
};
