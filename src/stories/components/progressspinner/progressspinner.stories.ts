import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraProgressSpinnerComponent } from '../../../lib/components/progressspinner/progressspinner.component';
import { Sizes, ProgressSpinnerSizesComponent } from './examples/progressspinner-sizes.component';
import { Monochrome, ProgressSpinnerMonochromeComponent } from './examples/progressspinner-monochrome.component';

const meta: Meta<ExtraProgressSpinnerComponent> = {
  title: 'Components/Misc/ProgressSpinner',
  component: ExtraProgressSpinnerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraProgressSpinnerComponent, ProgressSpinnerSizesComponent, ProgressSpinnerMonochromeComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Используется для отображения индикатора процесса/состояния загрузки неопределенного времени.

\`\`\`typescript
import { ExtraProgressSpinnerComponent } from '@cdek-it/angular-ui-kit/components/progressspinner';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-progressspinner' }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер спиннера (задает вычисленные CSS-классы).',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'base' },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    },
    fill: {
      control: 'select',
      options: ['primary', 'white'],
      description:
        'Цветовая схема: primary — многоцветная анимация, white — монохромный режим для цветной/тёмной подложки.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'white'" }
      }
    },
    strokeWidth: {
      control: 'text',
      description: 'Толщина линии дуги; не задан — берётся из токена оформления.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | undefined' }
      }
    },
    circleFill: {
      control: 'text',
      description: 'Цвет заливки внутренней области круга (SVG fill); не связан с цветовой схемой fill.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'none'" },
        type: { summary: 'string' }
      }
    },
    animationDuration: {
      control: 'text',
      description: 'Длительность одной итерации анимации вращения.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '2s' },
        type: { summary: 'string' }
      }
    },
    ariaLabel: {
      control: 'text',
      description:
        'Метка для программ экранного доступа; задавайте её всегда — иначе у индикатора нет доступного имени.',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | undefined' }
      }
    }
  },
  args: {
    size: 'base',
    fill: 'primary',
    strokeWidth: undefined,
    circleFill: 'none',
    animationDuration: '2s',
    ariaLabel: 'Загрузка'
  }
};

export default meta;
type Story = StoryObj<ExtraProgressSpinnerComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);
    if (args.fill && args.fill !== 'primary') parts.push(`fill="${args.fill}"`);
    if (args.strokeWidth) parts.push(`strokeWidth="${args.strokeWidth}"`);
    if (args.circleFill && args.circleFill !== 'none') parts.push(`circleFill="${args.circleFill}"`);
    if (args.animationDuration && args.animationDuration !== '2s')
      parts.push(`animationDuration="${args.animationDuration}"`);
    if (args.ariaLabel) parts.push(`ariaLabel="${args.ariaLabel}"`);

    const properties = parts.length > 0 ? ' ' + parts.join('\n  ') : '';

    const template = `
<extra-progressspinner${properties}></extra-progressspinner>
`;
    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для изменения размера, цвета и толщины линии.'
      }
    }
  }
};

// ── Вариации ─────────────────────────────────────────────────────────────────

export { Sizes, Monochrome };
