import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { InputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: (args) => {
    const control = new FormControl({ value: '', disabled: true });
    return {
      props: { ...args, control },
      template: `<input-text [formControl]="control" placeholder="Введите текст..."></input-text>`,
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [InputTextComponent, ReactiveFormsModule],
      },
    }),
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Отключённое состояние — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { InputTextComponent } from '@cdek-it/angular-ui-kit';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

control = new FormControl({ value: '', disabled: true });
// template: <input-text [formControl]="control"></input-text>
        `,
      },
    },
  },
};
