import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Buttons: Story = {
  name: 'Buttons',
  render: () => {
    const control = new FormControl<number | null>(null);
    return {
      props: { control },
      template: `
        <input-number
          [showButtons]="true"
          buttonLayout="horizontal"
          [formControl]="control"
        ></input-number>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputNumberComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Числовое поле с кнопками увеличения/уменьшения в горизонтальной раскладке. Кастомные SVG-иконки +/− используются по умолчанию.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [InputNumberComponent, ReactiveFormsModule],
  template: \`<input-number [showButtons]="true" buttonLayout="horizontal" [formControl]="control"></input-number>\`,
})
export class ButtonsExample {
  control = new FormControl<number | null>(null);
}
        `,
      },
    },
  },
};
