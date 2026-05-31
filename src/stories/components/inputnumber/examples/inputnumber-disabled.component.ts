import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<ExtraInputNumberComponent>;

export const Disabled: Story = {
  name: 'Disabled',
  render: () => {
    const control = new FormControl<number | null>({ value: 42, disabled: true });
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
        story: 'Отключённое состояние — поле и кнопки недоступны для взаимодействия.',
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
export class DisabledExample {
  control = new FormControl<number | null>({ value: 42, disabled: true });
}
        `,
      },
    },
  },
};
