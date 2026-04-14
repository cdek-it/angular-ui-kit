import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MegaMenuComponent } from '../../../lib/components/megamenu/megamenu.component';
import { MegaMenuHorizontalComponent } from './examples/megamenu-horizontal.component';
import { MegaMenuVerticalComponent } from './examples/megamenu-vertical.component';
import { MegaMenuCustomComponent } from './examples/megamenu-custom.component';

const meta: Meta<MegaMenuComponent> = {
  title: 'Components/Menu/MegaMenu',
  component: MegaMenuComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Расширенное меню с поддержкой многоколоночных подменю. Поддерживает горизонтальную и вертикальную ориентацию.

\`\`\`typescript
import { MegaMenuComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
      story: {
        height: '300px',
      },
    },
    designTokens: { prefix: '--p-megamenu' },
  },
  argTypes: {
    model: {
      control: false,
      description: 'Массив пунктов меню.',
      table: {
        category: 'Props',
        type: { summary: 'MegaMenuModel[]' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация меню.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с меню.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MegaMenuComponent>;

// ── Horizontal ──────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  name: 'Horizontal',
  decorators: [moduleMetadata({ imports: [MegaMenuHorizontalComponent] })],
  render: () => ({ template: `<app-megamenu-horizontal></app-megamenu-horizontal>` }),
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальная ориентация (по умолчанию).',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MegaMenuComponent, MegaMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MegaMenuComponent],
  template: \`<megamenu [model]="items"></megamenu>\`,
})
export class ExampleComponent {
  items: MegaMenuModel[] = [
    {
      label: 'Products',
      icon: 'ti ti-box',
      items: [
        [
          {
            label: 'UI Components',
            items: [
              { label: 'Form', icon: 'ti ti-forms' },
              { label: 'Button', icon: 'ti ti-hand-click' },
            ],
          },
        ],
      ],
    },
    { label: 'Contact', icon: 'ti ti-mail', disabled: true },
  ];
}`,
      },
    },
  },
};

// ── Vertical ────────────────────────────────────────────────────────────────
export const Vertical: Story = {
  name: 'Vertical',
  decorators: [moduleMetadata({ imports: [MegaMenuVerticalComponent] })],
  render: () => ({ template: `<app-megamenu-vertical></app-megamenu-vertical>` }),
  parameters: {
    docs: {
      description: {
        story: 'Вертикальная ориентация.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MegaMenuComponent, MegaMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MegaMenuComponent],
  template: \`<megamenu [model]="items" orientation="vertical"></megamenu>\`,
})
export class ExampleComponent {
  items: MegaMenuModel[] = [
    {
      label: 'Products',
      icon: 'ti ti-box',
      items: [
        [
          {
            label: 'UI Components',
            items: [
              { label: 'Form', icon: 'ti ti-forms' },
              { label: 'Button', icon: 'ti ti-hand-click' },
            ],
          },
        ],
      ],
    },
  ];
}`,
      },
    },
  },
};

// ── Custom ──────────────────────────────────────────────────────────────────
export const Custom: Story = {
  name: 'Custom',
  decorators: [moduleMetadata({ imports: [MegaMenuCustomComponent] })],
  render: () => ({ template: `<app-megamenu-custom></app-megamenu-custom>` }),
  parameters: {
    docs: {
      description: {
        story: 'Пункты меню с описанием (description) и бейджами.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { MegaMenuComponent, MegaMenuModel } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MegaMenuComponent],
  template: \`<megamenu [model]="items"></megamenu>\`,
})
export class ExampleComponent {
  items: MegaMenuModel[] = [
    {
      label: 'Products',
      icon: 'ti ti-box',
      items: [
        [
          {
            label: 'Components',
            items: [
              {
                label: 'Form',
                description: 'Input, Select, Checkbox',
                icon: 'ti ti-forms',
                badge: 'New',
              },
            ],
          },
        ],
      ],
    },
  ];
}`,
      },
    },
  },
};
