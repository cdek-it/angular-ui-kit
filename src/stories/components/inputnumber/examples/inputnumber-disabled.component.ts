import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputNumberComponent } from '../../../../lib/components/inputnumber/inputnumber.component';

type Story = StoryObj<InputNumberComponent>;

export const Disabled: Story = {
  name: 'Disabled',
  render: () => {
    const control = new FormControl<number | null>({ value: 42, disabled: true });
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
        story: 'Отключённое состояние — поле и кнопки недоступны для взаимодействия.',
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
export class DisabledExample {
  control = new FormControl<number | null>({ value: 42, disabled: true });
}
        `,
      },
    },
  },
};
