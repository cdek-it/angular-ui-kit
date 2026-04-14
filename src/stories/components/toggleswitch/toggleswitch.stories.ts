import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleSwitchComponent } from '../../../lib/components/toggleswitch/toggleswitch.component';
import { ToggleSwitchCheckedComponent } from './examples/toggleswitch-checked.component';
import { ToggleSwitchInvalidComponent } from './examples/toggleswitch-invalid.component';
import { ToggleSwitchDisabledComponent } from './examples/toggleswitch-disabled.component';

const meta: Meta<ToggleSwitchComponent> = {
  title: 'Components/Form/ToggleSwitch',
  component: ToggleSwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ToggleSwitchComponent,
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
type Story = StoryObj<ToggleSwitchComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: () => ({
    props: { control: new FormControl(false) },
    template: `<toggleswitch [formControl]="control"></toggleswitch>`,
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`<toggleswitch [formControl]="control"></toggleswitch>\`,
})
export class Example {
  control = new FormControl(false);
}
        `,
      },
    },
  },
};

// ── Checked ───────────────────────────────────────────────────────────────────
export const Checked: Story = {
  render: () => ({
    template: `<app-toggleswitch-checked></app-toggleswitch-checked>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Переключатель во включённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`<toggleswitch [formControl]="control"></toggleswitch>\`,
})
export class ToggleSwitchCheckedComponent {
  control = new FormControl(true);
}
        `,
      },
    },
  },
};

// ── Invalid ───────────────────────────────────────────────────────────────────
export const Invalid: Story = {
  render: () => ({
    template: `<app-toggleswitch-invalid></app-toggleswitch-invalid>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние через `FormControl` и `Validators`.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`<toggleswitch [formControl]="control"></toggleswitch>\`,
})
export class ToggleSwitchInvalidComponent {
  control = new FormControl(false, [Validators.requiredTrue]);
}
        `,
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  render: () => ({
    template: `<app-toggleswitch-disabled></app-toggleswitch-disabled>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние через `FormControl`.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ToggleSwitchComponent, ReactiveFormsModule],
  template: \`<toggleswitch [formControl]="control"></toggleswitch>\`,
})
export class ToggleSwitchDisabledComponent {
  control = new FormControl({ value: false, disabled: true });
}
        `,
      },
    },
  },
};
