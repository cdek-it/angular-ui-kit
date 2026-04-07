import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchComponent } from '../../../lib/components/toggleswitch/toggleswitch.component';
import { ToggleSwitchCheckedComponent } from './examples/toggleswitch-checked.component';
import { ToggleSwitchInvalidComponent } from './examples/toggleswitch-invalid.component';
import { ToggleSwitchDisabledComponent } from './examples/toggleswitch-disabled.component';

type ToggleSwitchArgs = ToggleSwitchComponent;

const meta: Meta<ToggleSwitchArgs> = {
  title: 'Components/Form/ToggleSwitch',
  component: ToggleSwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ToggleSwitchComponent,
        FormsModule,
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
        component: `Компонент для переключения между двумя состояниями.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    invalid: {
      control: 'boolean',
      description: 'Подсвечивает переключатель как невалидный',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность взаимодействия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },

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
  args: {
    invalid: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<ToggleSwitchArgs>;

const commonTemplate = `
<toggleswitch
  [(ngModel)]="value"
  [invalid]="invalid"
  [disabled]="disabled"
></toggleswitch>
`;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`[(ngModel)]="value"`];
    if (args.invalid) parts.push(`[invalid]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);

    const template = `<toggleswitch\n  ${parts.join('\n  ')}\n></toggleswitch>`;
    return { props: { ...args, value: false }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Checked ───────────────────────────────────────────────────────────────────
export const Checked: Story = {
  render: (args) => ({ props: { ...args, value: true }, template: commonTemplate }),
  args: { invalid: false, disabled: false },
  parameters: {
    docs: {
      description: { story: 'Переключатель во включённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggleswitch-checked',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template: \`
    <toggleswitch [(ngModel)]="value"></toggleswitch>
  \`,
})
export class ToggleSwitchCheckedComponent {
  value = true;
}
        `,
      },
    },
  },
};

// ── Invalid ───────────────────────────────────────────────────────────────────
export const Invalid: Story = {
  render: (args) => ({ props: { ...args, value: false }, template: commonTemplate }),
  args: { invalid: true, disabled: false },
  parameters: {
    docs: {
      description: { story: 'Невалидное состояние переключателя.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggleswitch-invalid',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template: \`
    <toggleswitch [(ngModel)]="value" [invalid]="true"></toggleswitch>
  \`,
})
export class ToggleSwitchInvalidComponent {
  value = false;
}
        `,
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  render: (args) => ({ props: { ...args, value: false }, template: commonTemplate }),
  args: { invalid: false, disabled: true },
  parameters: {
    docs: {
      description: { story: 'Заблокированное состояние переключателя.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ToggleSwitchComponent } from '@cdek-it/angular-ui-kit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggleswitch-disabled',
  standalone: true,
  imports: [ToggleSwitchComponent, FormsModule],
  template: \`
    <toggleswitch [(ngModel)]="value" [disabled]="true"></toggleswitch>
  \`,
})
export class ToggleSwitchDisabledComponent {
  value = false;
}
        `,
      },
    },
  },
};
