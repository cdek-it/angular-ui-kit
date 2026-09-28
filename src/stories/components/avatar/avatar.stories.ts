import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraAvatarComponent, ExtraAvatarGroupComponent } from '../../../lib/components/avatar/avatar.component';

const meta: Meta<ExtraAvatarComponent> = {
  title: 'Components/Misc/Avatar',
  component: ExtraAvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraAvatarComponent, ExtraAvatarGroupComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Аватар представляет пользователя или сущность. Может содержать текст, иконку или изображение, а также значок (\`badge\`).

Реализован по спецификации \`docs/components-api/avatar.md\`.

\`\`\`typescript
import { ExtraAvatarComponent, ExtraAvatarGroupComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-avatar' }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    label: {
      control: 'text',
      description: 'Текст внутри аватара',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например: ti ti-user)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    image: {
      control: 'text',
      description: 'URL изображения',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: ['base', 'large', 'xlarge'],
      description: 'Размер аватара',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'base' | 'large' | 'xlarge'" }
      }
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'Форма аватара',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'square' },
        type: { summary: "'square' | 'circle'" }
      }
    },
    badge: {
      control: 'text',
      description: 'Текст/число значка; при задании аватар оборачивается в p-overlay-badge',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | undefined' }
      }
    },
    severity: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
      description: 'Цветовая схема значка (при заданном badge)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'success' | 'info' | 'warning' | 'danger'" }
      }
    },
    // Hidden computed props
    hostClass: { table: { disable: true } },
    primeSize: { table: { disable: true } },
    primeSeverity: { table: { disable: true } }
  }
};

const commonTemplate = `
<extra-avatar
  [label]="label"
  [icon]="icon"
  [image]="image"
  [size]="size"
  [shape]="shape"
  [badge]="badge"
  [severity]="severity"
></extra-avatar>
`;

export default meta;
type Story = StoryObj<ExtraAvatarComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.image) parts.push(`image="${args.image}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.shape && args.shape !== 'square') parts.push(`shape="${args.shape}"`);
    if (args.badge) parts.push(`badge="${args.badge}"`);
    if (args.severity && args.severity !== 'primary') parts.push(`severity="${args.severity}"`);

    const template = parts.length
      ? `<extra-avatar\n  ${parts.join('\n  ')}\n></extra-avatar>`
      : `<extra-avatar label="A"></extra-avatar>`;

    return { props: args, template };
  },
  args: {
    label: 'A',
    size: 'base',
    shape: 'square',
    severity: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Label ────────────────────────────────────────────────────────────────────

export const Label: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'A', size: 'base', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Аватар с текстовой меткой.' },
      source: {
        code: `<extra-avatar label="A"></extra-avatar>`
      }
    }
  }
};

// ── Icon ─────────────────────────────────────────────────────────────────────

export const Icon: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { icon: 'ti ti-user', size: 'base', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Аватар с иконкой.' },
      source: {
        code: `<extra-avatar icon="ti ti-user"></extra-avatar>`
      }
    }
  }
};

// ── Image ────────────────────────────────────────────────────────────────────

export const Image: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { image: '/assets/images/avatar/avatar.png', size: 'base', shape: 'square' },
  parameters: {
    docs: {
      description: {
        story: 'Аватар с изображением. shape="square" — без обрезки, shape="circle" — с обрезкой по кругу.'
      },
      source: {
        code: `<extra-avatar image="/assets/images/avatar/avatar.png"></extra-avatar>`
      }
    }
  }
};

// ── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'L', size: 'large', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Размер аватара. Доступны: base, large, xlarge.' },
      source: {
        code: `<extra-avatar label="L" size="large"></extra-avatar>`
      }
    }
  }
};

// ── Shapes ───────────────────────────────────────────────────────────────────

export const Shapes: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'C', size: 'base', shape: 'circle' },
  parameters: {
    docs: {
      description: { story: 'Форма аватара. circle — круглый, square — квадратный (по умолчанию).' },
      source: {
        code: `<extra-avatar label="C" shape="circle"></extra-avatar>`
      }
    }
  }
};

// ── Group ────────────────────────────────────────────────────────────────────
// Исключение: avatar-group — составной компонент,
// дочерние элементы — это его суть, не дублирование.

export const Group: Story = {
  render: () => ({
    template: `
      <extra-avatar-group>
        <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
        <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
        <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
        <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
        <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
        <extra-avatar label="+2" shape="circle"></extra-avatar>
      </extra-avatar-group>
    `
  }),
  parameters: {
    docs: {
      description: { story: 'Группа аватаров с перекрытием.' },
      source: {
        code: `<extra-avatar-group>
  <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
  <extra-avatar image="/assets/images/avatar/avatar.png" shape="circle"></extra-avatar>
  <extra-avatar label="+2" shape="circle"></extra-avatar>
</extra-avatar-group>`
      }
    }
  }
};

// ── LabelWithBadge ───────────────────────────────────────────────────────────

export const LabelWithBadge: Story = {
  render: (args) => ({
    props: args,
    template: `<extra-avatar label="U" size="xlarge" badge="4" severity="danger"></extra-avatar>`
  }),
  parameters: {
    docs: {
      description: { story: 'Аватар с текстовой меткой и бейджем (`badge` + `severity`).' },
      source: {
        code: `<extra-avatar label="U" size="xlarge" badge="4" severity="danger"></extra-avatar>`
      }
    }
  }
};

// ── IconWithBadge ────────────────────────────────────────────────────────────

export const IconWithBadge: Story = {
  render: (args) => ({
    props: args,
    template: `<extra-avatar icon="ti ti-user" size="xlarge" badge="8" severity="success"></extra-avatar>`
  }),
  parameters: {
    docs: {
      description: { story: 'Аватар с иконкой и бейджем (`badge` + `severity`).' },
      source: {
        code: `<extra-avatar icon="ti ti-user" size="xlarge" badge="8" severity="success"></extra-avatar>`
      }
    }
  }
};

// ── ImageWithBadge ───────────────────────────────────────────────────────────

export const ImageWithBadge: Story = {
  render: (args) => ({
    props: args,
    template: `<extra-avatar image="/assets/images/avatar/avatar.png" size="xlarge" badge="8" severity="success"></extra-avatar>`
  }),
  parameters: {
    docs: {
      description: { story: 'Аватар с изображением и бейджем (`badge` + `severity`).' },
      source: {
        code: `<extra-avatar image="/assets/images/avatar/avatar.png" size="xlarge" badge="8" severity="success"></extra-avatar>`
      }
    }
  }
};
