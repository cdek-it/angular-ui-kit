import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraProgressSpinnerComponent } from '../../../lib/components/progressspinner/progressspinner.component';
import { Sizes, ProgressSpinnerSizesComponent } from './examples/progressspinner-sizes.component';
import { Monochrome, ProgressSpinnerMonochromeComponent } from './examples/progressspinner-monochrome.component';

const meta: Meta<ExtraProgressSpinnerComponent> = {
  title: 'Components/Misc/ProgressSpinner',
  component: ExtraProgressSpinnerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({ imports: [ExtraProgressSpinnerComponent, ProgressSpinnerSizesComponent, ProgressSpinnerMonochromeComponent] })
  ],
  parameters: {
    docs: {
      description: {
        component: `Используется для отображения индикатора процесса/состояния загрузки неопределенного времени.

\`\`\`typescript
import { ExtraProgressSpinnerComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-progressspinner' },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Размер спиннера (задает вычисленные CSS-классы).',
      table: {
        category: 'Props',
        defaultValue: { summary: 'medium' },
        type: { summary: "'small' | 'medium' | 'large' | 'xlarge'" },
      },
    },
    multicolor: {
      control: 'boolean',
      description: 'Включить многоцветную анимацию.',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    strokeWidth: {
      table: { disable: true },
    },
    fill: {
      table: { disable: true },
    },
    animationDuration: {
      control: 'text',
      description: 'Длительность одной итерации анимации вращения.',
      table: {
        category: 'Props',
        defaultValue: { summary: '2s' },
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      table: { disable: true },
    },
  },
  args: {
    size: 'medium',
    multicolor: true,
    strokeWidth: '2',
    fill: 'none',
    animationDuration: '2s',
  },
};

export default meta;
type Story = StoryObj<ExtraProgressSpinnerComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.size && args.size !== 'medium') parts.push(`size="${args.size}"`);
    if (!args.multicolor) parts.push(`[multicolor]="false"`);
    if (args.strokeWidth && args.strokeWidth !== '2') parts.push(`strokeWidth="${args.strokeWidth}"`);
    if (args.fill && args.fill !== 'none') parts.push(`fill="${args.fill}"`);
    if (args.animationDuration && args.animationDuration !== '2s') parts.push(`animationDuration="${args.animationDuration}"`);

    const properties = parts.length > 0 ? ' ' + parts.join('\n  ') : '';

    const template = `
<extra-progressspinner${properties}></extra-progressspinner>
`;
    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для изменения размера, цвета и толщины линии.',
      },
    },
  },
};

// ── Вариации ─────────────────────────────────────────────────────────────────

export { Sizes, Monochrome };
