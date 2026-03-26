import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../components/button/button-extra.component';


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
    badge: {
      control: 'text',
      description: 'Значение бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    badgeSeverity: {
      control: 'select',
      options: [null, 'success', 'info', 'warning', 'danger', 'secondary', 'contrast'],
      description: 'Цветовая схема бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: "'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | null" },
      },
    },
    showBadge: {
      control: 'boolean',
      description: 'Показывать ли бейдж',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Растягивать ли кнопку на всю ширину контейнера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Метка для экранных дикторов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус при загрузке',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    tabindex: {
      control: 'number',
      description: 'Порядок фокуса',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    text: {
      control: 'boolean',
      description: 'Текстовый вариант кнопки',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    showBadge: false,
    badge: '',
    badgeSeverity: null,
    fluid: false,
    autofocus: false,
    text: false,
  },
};

const commonTemplate = `
<extra-button
  [label]="label"
  [variant]="variant"
  [severity]="severity"
  [size]="size"
  [rounded]="rounded"
  [iconPos]="iconPos"
  [iconOnly]="iconOnly"
  [icon]="icon"
  [disabled]="disabled"
  [loading]="loading"
  [badge]="badge"
  [badgeSeverity]="badgeSeverity"
  [showBadge]="showBadge"
  [fluid]="fluid"
  [ariaLabel]="ariaLabel"
  [autofocus]="autofocus"
  [tabindex]="tabindex"
  [text]="text"
></extra-button>
`;

export default meta;
type Story = StoryObj<ExtraButtonComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: commonTemplate,
  }),
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
    template: commonTemplate,
  }),
  args: { label: 'Button', size: 'large' },
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
    template: commonTemplate,
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
    template: commonTemplate,
  }),
  args: { icon: 'ti ti-check', iconOnly: true },
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
    template: commonTemplate,
  }),
  args: { label: 'Button', loading: true },
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
    template: commonTemplate,
  }),
  args: { label: 'Button', rounded: true },
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
    template: commonTemplate,
  }),
  args: { label: 'Button', variant: 'text' },
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
    template: commonTemplate,
  }),
  args: { label: 'Link Button', variant: 'link' },
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
  render: (args) => ({
    props: args,
    template: commonTemplate,
  }),
  args: { label: 'Button', severity: 'success' },
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
  render: (args) => ({
    props: args,
    template: commonTemplate,
  }),
  args: { label: 'Button', disabled: true },
  parameters: {
    docs: {
      description: { story: 'Состояние кнопки, при котором взаимодействие заблокировано.' },
      source: {
        code: `<extra-button label="Button" [disabled]="true" />`,
      },
    },
  },
};

export const Badge: Story = {
  render: (args) => ({
    props: args,
    template: commonTemplate,
  }),
  args: {
    label: 'Emails',
    badge: '8',
    severity: 'success',
    badgeSeverity: 'danger',
    showBadge: true,
  },
  parameters: {
    docs: {
      description: { story: 'Примеры использования бейджей на кнопках с позиционированием в углу.' },
      source: {
        code: `<extra-button label="Emails" badge="8" severity="success" badgeSeverity="danger" [showBadge]="true" />`,
      },
    },
  },
};

