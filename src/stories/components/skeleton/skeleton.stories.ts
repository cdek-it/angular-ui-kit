import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraSkeletonComponent as SkeletonComponent } from '../../../lib/components/skeleton/skeleton.component';
import { SkeletonRectanglesComponent, Rectangles } from './examples/skeleton-rectangles.component';
import { SkeletonCircleComponent, Circle } from './examples/skeleton-circle.component';
import { SkeletonCardPlaceholderComponent, CardPlaceholder } from './examples/skeleton-card-placeholder.component';
import { SkeletonNoAnimationComponent, NoAnimation } from './examples/skeleton-no-animation.component';

const meta: Meta<SkeletonComponent> = {
  title: 'Components/Misc/Skeleton',
  component: SkeletonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SkeletonComponent,
        SkeletonRectanglesComponent,
        SkeletonCircleComponent,
        SkeletonCardPlaceholderComponent,
        SkeletonNoAnimationComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Заглушка для контента, пока данные загружаются. Поддерживает прямоугольную и круглую форму, а также волновую анимацию.

\`\`\`typescript
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-skeleton' },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    shape: {
      control: 'select',
      options: ['rectangle', 'circle'],
      description: 'Форма скелетона',
      table: {
        category: 'Props',
        defaultValue: { summary: 'rectangle' },
        type: { summary: "'rectangle' | 'circle'" },
      },
    },
    animation: {
      control: 'select',
      options: ['wave', 'none'],
      description: 'Тип анимации',
      table: {
        category: 'Props',
        defaultValue: { summary: 'wave' },
        type: { summary: "'wave' | 'none'" },
      },
    },
    width: {
      control: 'text',
      description: 'Ширина элемента',
      table: {
        category: 'Props',
        defaultValue: { summary: '100%' },
        type: { summary: 'string' },
      },
    },
    height: {
      control: 'text',
      description: 'Высота элемента',
      table: {
        category: 'Props',
        defaultValue: { summary: '1rem' },
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'text',
      description: 'Размер элемента (устанавливает ширину и высоту одновременно; используется для circle)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      control: 'text',
      description: 'Скругление углов (переопределяет значение темы)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    shape: 'rectangle',
    animation: 'wave',
    width: '100%',
    height: '1rem',
  },
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const effectiveSize = args.shape === 'circle' && !args.size ? '4rem' : args.size;
    const parts: string[] = [];

    if (args.shape && args.shape !== 'rectangle') parts.push(`shape="${args.shape}"`);
    if (args.animation && args.animation !== 'wave') parts.push(`animation="${args.animation}"`);
    if (effectiveSize) {
      parts.push(`size="${effectiveSize}"`);
    } else {
      if (args.width && args.width !== '100%') parts.push(`width="${args.width}"`);
      if (args.height && args.height !== '1rem') parts.push(`height="${args.height}"`);
    }
    if (args.borderRadius) parts.push(`borderRadius="${args.borderRadius}"`);

    const template = parts.length
      ? `<extra-skeleton\n  ${parts.join('\n  ')}\n></extra-skeleton>`
      : `<extra-skeleton></extra-skeleton>`;

    return { props: { ...args, size: effectiveSize }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { Rectangles, Circle, CardPlaceholder, NoAnimation };
