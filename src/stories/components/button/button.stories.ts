import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../components/button/button-extra.component';

const gridTemplate = (inner: string) => `
<div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 20px; align-items: center;">
  <span><code>small</code></span>
  <span><code>base</code></span>
  <span><code>large</code></span>
  <span><code>xlarge</code></span>
  ${inner}
</div>
`;

const meta: Meta<ExtraButtonComponent> = {
  title: 'Prime/Button',
  component: ExtraButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraButtonComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Кнопка — базовый интерактивный элемент. [Figma Design](https://www.figma.com/design/HOLKdvQJ8jCLeX17s9d0Yf/UI-Kit--DS--v2.0?node-id=160-5223)',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'Button' },
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text', 'link'],
      description: 'Вариант отображения кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'outlined' | 'text' | 'link'" },
      },
    },
    severity: {
      control: 'select',
      options: [null, 'success', 'info', 'warning', 'danger'],
      description: 'Семантический вариант кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: "'success' | 'info' | 'warning' | 'danger' | null" },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например: ti ti-check)',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    iconPos: {
      control: 'select',
      options: [null, 'prefix', 'postfix'],
      description: 'Позиция иконки относительно текста',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: "'prefix' | 'postfix' | null" },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Только иконка, без текста',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Скруглённая форма кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки с индикатором',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ExtraButtonComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const ButtonDefault: Story = {
  name: 'Button',
  args: {
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
      source: {
        code: `<extra-button label="Button" />`,
      },
    },
  },
};

// ── Stories ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [label]="label"></extra-button>
  <extra-button size="base" [label]="label"></extra-button>
  <extra-button size="large" [label]="label"></extra-button>
  <extra-button size="xlarge" [label]="label"></extra-button>
    `),
  }),
  args: { label: 'Button' },
  parameters: {
    docs: {
      description: { story: 'Все доступные размеры: small, base, large, xlarge.' },
      source: {
        code: `
<extra-button size="small" label="Button" />
<extra-button label="Button" />
<extra-button size="large" label="Button" />
<extra-button size="xlarge" label="Button" />`,
      },
    },
  },
};

export const Icons: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [label]="label" [icon]="icon"></extra-button>
  <extra-button size="base" [label]="label" [icon]="icon"></extra-button>
  <extra-button size="large" [label]="label" [icon]="icon"></extra-button>
  <extra-button size="xlarge" [label]="label" [icon]="icon"></extra-button>
    `),
  }),
  args: { label: 'Button', icon: 'ti ti-check' },
  parameters: {
    docs: {
      description: { story: 'Кнопки с иконками (префикс по умолчанию).' },
      source: {
        code: `<extra-button label="Button" icon="ti ti-check" />`,
      },
    },
  },
};

export const IconOnly: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [icon]="icon" [iconOnly]="true"></extra-button>
  <extra-button size="base" [icon]="icon" [iconOnly]="true"></extra-button>
  <extra-button size="large" [icon]="icon" [iconOnly]="true"></extra-button>
  <extra-button size="xlarge" [icon]="icon" [iconOnly]="true"></extra-button>
    `),
  }),
  args: { icon: 'ti ti-check' },
  parameters: {
    docs: {
      description: { story: 'Кнопки без текста, только с иконкой.' },
      source: {
        code: `<extra-button icon="ti ti-check" [iconOnly]="true" />`,
      },
    },
  },
};

export const Loading: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [label]="label" [loading]="true"></extra-button>
  <extra-button size="base" [label]="label" [loading]="true"></extra-button>
  <extra-button size="large" [label]="label" [loading]="true"></extra-button>
  <extra-button size="xlarge" [label]="label" [loading]="true"></extra-button>
    `),
  }),
  args: { label: 'Button' },
  parameters: {
    docs: {
      description: { story: 'Состояние загрузки с индикатором.' },
      source: {
        code: `<extra-button label="Button" [loading]="true" />`,
      },
    },
  },
};

export const Rounded: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [label]="label" [rounded]="true"></extra-button>
  <extra-button size="base" [label]="label" [rounded]="true"></extra-button>
  <extra-button size="large" [label]="label" [rounded]="true"></extra-button>
  <extra-button size="xlarge" [label]="label" [rounded]="true"></extra-button>
    `),
  }),
  args: { label: 'Button' },
  parameters: {
    docs: {
      description: { story: 'Скруглённая форма кнопок.' },
      source: {
        code: `<extra-button label="Button" [rounded]="true" />`,
      },
    },
  },
};

export const Text: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [label]="label" variant="text"></extra-button>
  <extra-button size="base" [label]="label" variant="text"></extra-button>
  <extra-button size="large" [label]="label" variant="text"></extra-button>
  <extra-button size="xlarge" [label]="label" variant="text"></extra-button>
    `),
  }),
  args: { label: 'Button' },
  parameters: {
    docs: {
      description: { story: 'Текстовый вариант кнопки (без заливки и границ).' },
      source: {
        code: `<extra-button label="Button" variant="text" />`,
      },
    },
  },
};

export const Link: Story = {
  render: (args) => ({
    props: args,
    template: gridTemplate(`
  <extra-button size="small" [label]="label" variant="link"></extra-button>
  <extra-button size="base" [label]="label" variant="link"></extra-button>
  <extra-button size="large" [label]="label" variant="link"></extra-button>
  <extra-button size="xlarge" [label]="label" variant="link"></extra-button>
    `),
  }),
  args: { label: 'Link Button' },
  parameters: {
    docs: {
      description: { story: 'Кнопка в виде ссылки.' },
      source: {
        code: `<extra-button label="Link Button" variant="link" />`,
      },
    },
  },
};

export const Severity: Story = {
  render: () => ({
    template: `
<div style="display: grid; grid-template-columns: repeat(5, max-content); gap: 20px; align-items: center;">
  <span></span>
  <span><code>success</code></span>
  <span><code>info</code></span>
  <span><code>warning</code></span>
  <span><code>danger</code></span>

  <span><code>small</code></span>
  <extra-button size="small" severity="success" label="Button"></extra-button>
  <extra-button size="small" severity="info" label="Button"></extra-button>
  <extra-button size="small" severity="warning" label="Button"></extra-button>
  <extra-button size="small" severity="danger" label="Button"></extra-button>

  <span><code>base</code></span>
  <extra-button size="base" severity="success" label="Button"></extra-button>
  <extra-button size="base" severity="info" label="Button"></extra-button>
  <extra-button size="base" severity="warning" label="Button"></extra-button>
  <extra-button size="base" severity="danger" label="Button"></extra-button>

  <span><code>large</code></span>
  <extra-button size="large" severity="success" label="Button"></extra-button>
  <extra-button size="large" severity="info" label="Button"></extra-button>
  <extra-button size="large" severity="warning" label="Button"></extra-button>
  <extra-button size="large" severity="danger" label="Button"></extra-button>

  <span><code>xlarge</code></span>
  <extra-button size="xlarge" severity="success" label="Button"></extra-button>
  <extra-button size="xlarge" severity="info" label="Button"></extra-button>
  <extra-button size="xlarge" severity="warning" label="Button"></extra-button>
  <extra-button size="xlarge" severity="danger" label="Button"></extra-button>
</div>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Цветовые схемы для различных контекстов: success, info, warning, danger.' },
      source: {
        code: `<extra-button severity="success" label="Button" />`,
      },
    },
  },
};

export const Disabled: Story = {
  render: () => ({
    template: `
<div style="display: grid; grid-template-columns: repeat(5, max-content); gap: 20px; align-items: center;">
  <span></span>
  <span><code>success</code></span>
  <span><code>info</code></span>
  <span><code>warning</code></span>
  <span><code>danger</code></span>

  <span><code>default</code></span>
  <extra-button severity="success" label="Button" [disabled]="true"></extra-button>
  <extra-button severity="info" label="Button" [disabled]="true"></extra-button>
  <extra-button severity="warning" label="Button" [disabled]="true"></extra-button>
  <extra-button severity="danger" label="Button" [disabled]="true"></extra-button>

  <span><code>outlined</code></span>
  <extra-button severity="success" label="Button" variant="outlined" [disabled]="true"></extra-button>
  <extra-button severity="info" label="Button" variant="outlined" [disabled]="true"></extra-button>
  <extra-button severity="warning" label="Button" variant="outlined" [disabled]="true"></extra-button>
  <extra-button severity="danger" label="Button" variant="outlined" [disabled]="true"></extra-button>

  <span><code>text</code></span>
  <extra-button severity="success" label="Button" variant="text" [disabled]="true"></extra-button>
  <extra-button severity="info" label="Button" variant="text" [disabled]="true"></extra-button>
  <extra-button severity="warning" label="Button" variant="text" [disabled]="true"></extra-button>
  <extra-button severity="danger" label="Button" variant="text" [disabled]="true"></extra-button>
</div>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Состояние кнопки, при котором взаимодействие заблокировано.' },
      source: {
        code: `<extra-button label="Button" [disabled]="true" />`,
      },
    },
  },
};
