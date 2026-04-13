import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SkeletonComponent } from '../../../lib/components/skeleton/skeleton.component';
import { SkeletonRectanglesComponent } from './examples/skeleton-rectangles.component';
import { SkeletonCircleComponent } from './examples/skeleton-circle.component';
import { SkeletonCardPlaceholderComponent } from './examples/skeleton-card-placeholder.component';
import { SkeletonNoAnimationComponent } from './examples/skeleton-no-animation.component';

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

const commonTemplate = `
<skeleton
  [shape]="shape"
  [animation]="animation"
  [width]="width"
  [height]="height"
  [size]="size"
  [borderRadius]="borderRadius"
></skeleton>
`;

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
      ? `<skeleton\n  ${parts.join('\n  ')}\n></skeleton>`
      : `<skeleton></skeleton>`;

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

// ── Stories ──────────────────────────────────────────────────────────────────

export const Rectangles: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { shape: 'rectangle', animation: 'wave', width: '100%', height: '1rem' },
  parameters: {
    docs: {
      description: { story: 'Прямоугольные строки-заглушки разной ширины — паттерн для списка отправлений или текстового контента.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-rectangles',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex flex-col gap-3">
      <skeleton height="1rem"></skeleton>
      <skeleton height="1rem" width="75%"></skeleton>
      <skeleton height="1rem" width="50%"></skeleton>
    </div>
  \`,
})
export class SkeletonRectanglesComponent {}
        `,
      },
    },
  },
};

export const Circle: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { shape: 'circle', size: '4rem', animation: 'wave' },
  parameters: {
    docs: {
      description: { story: 'Круглые заглушки для аватаров и иконок — например, фото курьера или транспортного средства.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-circle',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex items-center gap-4">
      <skeleton shape="circle" size="3rem"></skeleton>
      <skeleton shape="circle" size="4rem"></skeleton>
      <skeleton shape="circle" size="6rem"></skeleton>
    </div>
  \`,
})
export class SkeletonCircleComponent {}
        `,
      },
    },
  },
};

export const CardPlaceholder: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-4">
        <skeleton [animation]="animation" shape="circle" size="4rem"></skeleton>
        <div class="flex flex-col gap-2 flex-1">
          <skeleton [animation]="animation" width="60%" height="1rem"></skeleton>
          <skeleton [animation]="animation" width="40%" height="0.75rem"></skeleton>
          <skeleton [animation]="animation" height="0.75rem"></skeleton>
        </div>
      </div>
    `,
  }),
  args: { animation: 'wave' },
  parameters: {
    docs: {
      description: { story: 'Составная заглушка карточки отправления: аватар курьера и строки с информацией.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-card-placeholder',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex gap-4">
      <skeleton shape="circle" size="4rem"></skeleton>
      <div class="flex flex-col gap-2 flex-1">
        <skeleton height="1rem" width="60%"></skeleton>
        <skeleton height="0.75rem" width="40%"></skeleton>
        <skeleton height="0.75rem"></skeleton>
      </div>
    </div>
  \`,
})
export class SkeletonCardPlaceholderComponent {}
        `,
      },
    },
  },
};

export const NoAnimation: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { animation: 'none', width: '100%', height: '1rem' },
  parameters: {
    docs: {
      description: { story: 'Скелетон без волновой анимации — статичная заглушка для состояния ожидания.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SkeletonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-skeleton-no-animation',
  standalone: true,
  imports: [SkeletonComponent],
  template: \`
    <div class="flex flex-col gap-3">
      <skeleton animation="none" height="1rem"></skeleton>
      <skeleton animation="none" height="1rem" width="75%"></skeleton>
      <skeleton animation="none" shape="circle" size="4rem"></skeleton>
    </div>
  \`,
})
export class SkeletonNoAnimationComponent {}
        `,
      },
    },
  },
};
