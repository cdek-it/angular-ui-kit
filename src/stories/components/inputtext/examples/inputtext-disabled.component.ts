import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { StoryObj } from '@storybook/angular';
import { ExtraInputTextComponent } from '../../../../lib/components/inputtext/inputtext.component';

export const Disabled: StoryObj = {
  name: 'Disabled',
  render: (args) => {
    const control = new FormControl({ value: '', disabled: true });
    return {
      props: { ...args, control },
      template: `<extra-input-text [formControl]="control" placeholder="Введите текст..."></extra-input-text>`
    };
  },
  decorators: [
    (story: any) => ({
      ...story(),
      moduleMetadata: {
        imports: [ExtraInputTextComponent, ReactiveFormsModule]
      }
    })
  ],
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Отключённое состояние — управляется через FormControl.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraInputTextComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraInputTextComponent, ReactiveFormsModule],
  template: \`<extra-input-text [formControl]="control" placeholder="Введите текст..."></extra-input-text>\`,
})
export class DisabledExample {
  control = new FormControl({ value: '', disabled: true });
}
        `
      }
    }
  }
};
