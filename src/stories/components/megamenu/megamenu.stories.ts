import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraMegaMenuComponent, ExtraMegaMenuItem } from '../../../lib/components/megamenu/megamenu.component';
import { MegaMenuTemplateComponent, Template as TemplateStory } from './examples/megamenu-template.component';

const meta: Meta<ExtraMegaMenuComponent> = {
  title: 'Components/Menu/MegaMenu',
  component: ExtraMegaMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraMegaMenuComponent, MegaMenuTemplateComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Расширенное меню с поддержкой многоколоночных подменю. Поддерживает горизонтальную и вертикальную ориентацию.

Шаблон (передаётся между тегами компонента):
- \`extraMegaMenuItem\` — кастомный рендер пункта меню (контекст \`let-item\`, \`let-hasSubmenu="hasSubmenu"\`)

\`\`\`typescript
import { ExtraMegaMenuComponent, ExtraMegaMenuItemDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      story: {
        height: '300px'
      }
    },
    designTokens: { prefix: '--p-megamenu' }
  },
  argTypes: {
    model: {
      control: false,
      description: 'Массив пунктов меню.',
      table: {
        category: 'Props',
        type: { summary: 'ExtraMegaMenuItem[]' }
      }
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация меню.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с меню.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    orientation: 'horizontal',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<ExtraMegaMenuComponent>;

const baseItems: ExtraMegaMenuItem[] = [
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
            { label: 'Table', icon: 'ti ti-table' }
          ]
        }
      ],
      [
        {
          label: 'Charts',
          items: [
            { label: 'Bar Chart', icon: 'ti ti-chart-bar' },
            { label: 'Line Chart', icon: 'ti ti-chart-line' }
          ]
        }
      ]
    ]
  },
  {
    label: 'Solutions',
    icon: 'ti ti-bulb',
    items: [
      [
        {
          label: 'Business',
          items: [
            { label: 'Analytics', icon: 'ti ti-chart-dots' },
            { label: 'CRM', icon: 'ti ti-users' }
          ]
        }
      ]
    ]
  },
  {
    label: 'Contact',
    icon: 'ti ti-mail',
    disabled: true
  }
];

const commonTemplate = `
<extra-megamenu
  [model]="model"
  [orientation]="orientation"
  [disabled]="disabled"
></extra-megamenu>
`;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = ['[model]="model"'];

    if (args.orientation && args.orientation !== 'horizontal') parts.push(`orientation="${args.orientation}"`);
    if (args.disabled) parts.push(`[disabled]="true"`);

    const template = `<extra-megamenu\n  ${parts.join('\n  ')}\n></extra-megamenu>`;
    return { props: { ...args, model: baseItems }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Horizontal ──────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  render: (args) => ({
    props: { ...args, model: baseItems },
    template: commonTemplate
  }),
  args: { orientation: 'horizontal' },
  parameters: {
    docs: {
      description: { story: 'Горизонтальная ориентация (по умолчанию).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraMegaMenuComponent, ExtraMegaMenuItem } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraMegaMenuComponent],
  template: \`<extra-megamenu [model]="items"></extra-megamenu>\`,
})
export class HorizontalExample {
  items: ExtraMegaMenuItem[] = [
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
              { label: 'Table', icon: 'ti ti-table' },
            ],
          },
        ],
        [
          {
            label: 'Charts',
            items: [
              { label: 'Bar Chart', icon: 'ti ti-chart-bar' },
              { label: 'Line Chart', icon: 'ti ti-chart-line' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Solutions',
      icon: 'ti ti-bulb',
      items: [
        [
          {
            label: 'Business',
            items: [
              { label: 'Analytics', icon: 'ti ti-chart-dots' },
              { label: 'CRM', icon: 'ti ti-users' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Contact',
      icon: 'ti ti-mail',
      disabled: true,
    },
  ];
}
        `
      }
    }
  }
};

// ── Vertical ────────────────────────────────────────────────────────────────
export const Vertical: Story = {
  render: (args) => ({
    props: { ...args, model: baseItems },
    template: commonTemplate
  }),
  args: { orientation: 'vertical' },
  parameters: {
    docs: {
      description: { story: 'Вертикальная ориентация.' },
      source: {
        language: 'ts',
        code: `

@Component({
  standalone: true,
  imports: [ExtraMegaMenuComponent],
  template: \`<extra-megamenu [model]="items" orientation="vertical"></extra-megamenu>\`,
})
export class VerticalExample {
  items: ExtraMegaMenuItem[] = [
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
              { label: 'Table', icon: 'ti ti-table' },
            ],
          },
        ],
        [
          {
            label: 'Charts',
            items: [
              { label: 'Bar Chart', icon: 'ti ti-chart-bar' },
              { label: 'Line Chart', icon: 'ti ti-chart-line' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Solutions',
      icon: 'ti ti-bulb',
      items: [
        [
          {
            label: 'Business',
            items: [
              { label: 'Analytics', icon: 'ti ti-chart-dots' },
              { label: 'CRM', icon: 'ti ti-users' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Contact',
      icon: 'ti ti-mail',
      disabled: true,
    },
  ];
}
        `
      }
    }
  }
};

// ── Custom ──────────────────────────────────────────────────────────────────
const customItems: ExtraMegaMenuItem[] = [
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
              badge: 'New'
            },
            {
              label: 'Button',
              description: 'Actions and triggers',
              icon: 'ti ti-hand-click'
            }
          ]
        }
      ],
      [
        {
          label: 'Charts',
          items: [
            {
              label: 'Bar Chart',
              description: 'Categorical comparison',
              icon: 'ti ti-chart-bar'
            },
            {
              label: 'Line Chart',
              description: 'Trends over time',
              icon: 'ti ti-chart-line',
              badge: 'Beta'
            }
          ]
        }
      ]
    ]
  },
  {
    label: 'Solutions',
    icon: 'ti ti-bulb',
    items: [
      [
        {
          label: 'Business',
          items: [
            {
              label: 'Analytics',
              description: 'Reports and dashboards',
              icon: 'ti ti-chart-dots'
            },
            {
              label: 'CRM',
              description: 'Customer management',
              icon: 'ti ti-users',
              badge: 'Pro'
            }
          ]
        }
      ]
    ]
  }
];

export const Custom: Story = {
  render: (args) => ({
    props: { ...args, model: customItems },
    template: commonTemplate
  }),
  parameters: {
    docs: {
      description: {
        story: 'Пункты меню с описанием (description) и бейджами — рендерятся дефолтным шаблоном компонента.'
      },
      source: {
        language: 'ts',
        code: `

@Component({
  standalone: true,
  imports: [ExtraMegaMenuComponent],
  template: \`<extra-megamenu [model]="items"></extra-megamenu>\`,
})
export class CustomExample {
  items: ExtraMegaMenuItem[] = [
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
              {
                label: 'Button',
                description: 'Actions and triggers',
                icon: 'ti ti-hand-click',
              },
            ],
          },
        ],
        [
          {
            label: 'Charts',
            items: [
              {
                label: 'Bar Chart',
                description: 'Categorical comparison',
                icon: 'ti ti-chart-bar',
              },
              {
                label: 'Line Chart',
                description: 'Trends over time',
                icon: 'ti ti-chart-line',
                badge: 'Beta',
              },
            ],
          },
        ],
      ],
    },
    {
      label: 'Solutions',
      icon: 'ti ti-bulb',
      items: [
        [
          {
            label: 'Business',
            items: [
              {
                label: 'Analytics',
                description: 'Reports and dashboards',
                icon: 'ti ti-chart-dots',
              },
              {
                label: 'CRM',
                description: 'Customer management',
                icon: 'ti ti-users',
                badge: 'Pro',
              },
            ],
          },
        ],
      ],
    },
  ];
}
        `
      }
    }
  }
};

// ── Item Template ─────────────────────────────────────────────────────────────

export const Template: Story = TemplateStory;
