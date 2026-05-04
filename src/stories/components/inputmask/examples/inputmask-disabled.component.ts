import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputMaskComponent } from '../../../../lib/components/inputmask/inputmask.component';

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: (args) => {
    const control = new FormControl({ value: '12-34-56', disabled: true });
    return {
      props: { ...args, control },
      template: `<input-mask mask="99-99-99" placeholder="99-99-99" [formControl]="control"></input-mask>`,
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
        story: 'Отключённое состояние — управляется через `FormControl`.',
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
  template: \`<input-mask mask="99-99-99" [formControl]="control"></input-mask>\`,
})
export class DisabledExample {
  control = new FormControl({ value: '12-34-56', disabled: true });
}
        `,
      },
    },
  },
};
