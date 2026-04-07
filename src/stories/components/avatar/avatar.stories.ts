import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { OverlayBadge } from 'primeng/overlaybadge';
import { AvatarComponent, AvatarGroupComponent } from '../../../lib/components/avatar/avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Components/Misc/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent, AvatarGroupComponent, OverlayBadge],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Аватар представляет пользователя или сущность. Может содержать текст, иконку или изображение. [PrimeNG Avatar](https://primeng.org/avatar).

\`\`\`typescript
import { AvatarComponent, AvatarGroupComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-avatar' },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    label: {
      control: 'text',
      description: 'Текст внутри аватара',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например: ti ti-user)',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    image: {
      control: 'text',
      description: 'URL изображения',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['normal', 'large', 'xlarge'],
      description: 'Размер аватара',
      table: {
        category: 'Props',
        defaultValue: { summary: 'normal' },
        type: { summary: "'normal' | 'large' | 'xlarge'" },
      },
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'Форма аватара',
      table: {
        category: 'Props',
        defaultValue: { summary: 'square' },
        type: { summary: "'square' | 'circle'" },
      },
    },
  },
};

const commonTemplate = `
<avatar
  [label]="label"
  [icon]="icon"
  [image]="image"
  [size]="size"
  [shape]="shape"
></avatar>
`;

export default meta;
type Story = StoryObj<AvatarComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.label) parts.push(`label="${args.label}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.image) parts.push(`image="${args.image}"`);
    if (args.size && args.size !== 'normal') parts.push(`size="${args.size}"`);
    if (args.shape && args.shape !== 'square') parts.push(`shape="${args.shape}"`);

    const template = parts.length
      ? `<avatar\n  ${parts.join('\n  ')}\n></avatar>`
      : `<avatar label="A"></avatar>`;

    return { props: args, template };
  },
  args: {
    label: 'A',
    size: 'normal',
    shape: 'square',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Label ────────────────────────────────────────────────────────────────────

export const Label: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'A', size: 'normal', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Аватар с текстовой меткой.' },
      source: {
        code: `<avatar label="A"></avatar>`,
      },
    },
  },
};

// ── Icon ─────────────────────────────────────────────────────────────────────

export const Icon: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { icon: 'ti ti-user', size: 'normal', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Аватар с иконкой.' },
      source: {
        code: `<avatar icon="ti ti-user"></avatar>`,
      },
    },
  },
};

// ── Image ────────────────────────────────────────────────────────────────────

export const Image: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { image: '/assets/images/avatar/avatar.png', size: 'normal', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Аватар с изображением. shape="square" — без обрезки, shape="circle" — с обрезкой по кругу.' },
      source: {
        code: `<avatar image="/assets/images/avatar/avatar.png"></avatar>`,
      },
    },
  },
};

// ── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'L', size: 'large', shape: 'square' },
  parameters: {
    docs: {
      description: { story: 'Размер аватара. Доступны: normal, large, xlarge.' },
      source: {
        code: `<avatar label="L" size="large"></avatar>`,
      },
    },
  },
};

// ── Shapes ───────────────────────────────────────────────────────────────────

export const Shapes: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { label: 'C', size: 'normal', shape: 'circle' },
  parameters: {
    docs: {
      description: { story: 'Форма аватара. circle — круглый, square — квадратный (по умолчанию).' },
      source: {
        code: `<avatar label="C" shape="circle"></avatar>`,
      },
    },
  },
};

// ── Group ────────────────────────────────────────────────────────────────────
// Исключение: avatar-group — составной компонент,
// дочерние элементы — это его суть, не дублирование.

export const Group: Story = {
  render: () => ({
    template: `
      <avatar-group>
        <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
        <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
        <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
        <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
        <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
        <avatar label="+2" shape="circle"></avatar>
      </avatar-group>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Группа аватаров с перекрытием.' },
      source: {
        code: `<avatar-group>
  <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
  <avatar image="/assets/images/avatar/avatar.png" shape="circle"></avatar>
  <avatar label="+2" shape="circle"></avatar>
</avatar-group>`,
      },
    },
  },
};

// ── LabelWithBadge ───────────────────────────────────────────────────────────

export const LabelWithBadge: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-overlay-badge value="4" severity="danger">
        <avatar label="U" size="xlarge"></avatar>
      </p-overlay-badge>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Аватар с текстовой меткой и бейджем через OverlayBadge.' },
      source: {
        code: `<p-overlay-badge value="4" severity="danger">
  <avatar label="U" size="xlarge"></avatar>
</p-overlay-badge>`,
      },
    },
  },
};

// ── IconWithBadge ────────────────────────────────────────────────────────────

export const IconWithBadge: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-overlay-badge severity="success">
        <avatar icon="ti ti-user" size="xlarge"></avatar>
      </p-overlay-badge>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Аватар с иконкой и бейджем через OverlayBadge.' },
      source: {
        code: `<p-overlay-badge severity="success">
  <avatar icon="ti ti-user" size="xlarge"></avatar>
</p-overlay-badge>`,
      },
    },
  },
};

// ── ImageWithBadge ───────────────────────────────────────────────────────────

export const ImageWithBadge: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-overlay-badge severity="success">
        <avatar image="/assets/images/avatar/avatar.png" size="xlarge"></avatar>
      </p-overlay-badge>
    `,
  }),
  parameters: {
    docs: {
      description: { story: 'Аватар с изображением и бейджем через OverlayBadge.' },
      source: {
        code: `<p-overlay-badge severity="success">
  <avatar image="/assets/images/avatar/avatar.png" size="xlarge"></avatar>
</p-overlay-badge>`,
      },
    },
  },
};
