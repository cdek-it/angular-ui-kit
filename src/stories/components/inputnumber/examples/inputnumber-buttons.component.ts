import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<ExtraInputNumberComponent>;

export const Buttons: Story = {
  name: 'Buttons',
  render: () => {
    const control = new FormControl<number | null>(null);
    return {
      props: { control },
      template: `
        <extra-input-number
          [showButtons]="true"
          buttonLayout="horizontal"
          [formControl]="control"
        ></extra-input-number>
      `,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputNumberComponent, ReactiveFormsModule],
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
import { ExtraInputNumberComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputNumberComponent, ReactiveFormsModule],
  template: \`<extra-input-number [showButtons]="true" buttonLayout="horizontal" [formControl]="control"></extra-input-number>\`,
})
export class ButtonsExample {
  control = new FormControl<number | null>(null);
}
        `,
      },
    },
  },
};
