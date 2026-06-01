import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraToggleSwitchComponent } from '../../../lib/components/toggleswitch/toggleswitch.component';
import { ToggleSwitchCheckedComponent, Checked } from './examples/toggleswitch-checked.component';
import { ToggleSwitchInvalidComponent, Invalid } from './examples/toggleswitch-invalid.component';
import { ToggleSwitchDisabledComponent, Disabled } from './examples/toggleswitch-disabled.component';

const meta: Meta<ExtraToggleSwitchComponent> = {
  title: 'Components/Form/ToggleSwitch',
  component: ExtraToggleSwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraToggleSwitchComponent,
        ReactiveFormsModule,
        ToggleSwitchCheckedComponent,
        ToggleSwitchInvalidComponent,
        ToggleSwitchDisabledComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-toggleswitch' },
    docs: {
      description: {
        component: `Компонент для переключения между двумя состояниями. Состояния \`disabled\` и \`invalid\` управляются через \`FormControl\`, не через пропсы.`,
      },
    },
  },
  argTypes: {
    // ── Events ───────────────────────────────────────────────
    onChange: {
      control: false,
      description: 'Событие изменения состояния',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<ToggleSwitchChangeEvent>' },
      },
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' },
      },
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ExtraToggleSwitchComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: () => ({
    props: { control: new FormControl(false) },
    template: `<extra-toggleswitch [formControl]="control"></extra-toggleswitch>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример. Управление значением и состоянием через `FormControl`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`<extra-toggleswitch [formControl]="control"></extra-toggleswitch>\`,
})
export class Example {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};

export { Checked, Disabled, Invalid };
