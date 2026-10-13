import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraBadgeComponent } from '../../../lib/components/badge/badge.component';
import { BadgeSeverityComponent } from './examples/badge-severity.component';
import { BadgeSizesComponent } from './examples/badge-sizes.component';
import { BadgeDotComponent } from './examples/badge-dot.component';

const meta: Meta<ExtraBadgeComponent> = {
  title: 'Components/Misc/Badge',
  component: ExtraBadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraBadgeComponent, BadgeSeverityComponent, BadgeSizesComponent, BadgeDotComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Компактный индикатор статуса или числового значения. Используется для отображения счётчиков, меток и статусов.

\`\`\`typescript
import { BadgeModule } from 'primeng/badge';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-badge' }
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    severity: {
      control: 'select',
      options: ['primary', 'info', 'success', 'warning', 'danger'],
      description: 'Цветовая схема бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'info' | 'success' | 'warning' | 'danger'" }
      }
    },
    value: {
      control: 'text',
      description: 'Отображаемое значение бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    dot: {
      control: 'boolean',
      description: 'Режим точки-индикатора без значения; приоритетнее value',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    size: {
      control: 'select',
      options: ['base', 'large', 'xlarge'],
      description: 'Размер бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'base' | 'large' | 'xlarge'" }
      }
    }
  },
  args: {
    severity: 'primary',
    value: '8',
    dot: false,
    size: 'base'
  }
};

export default meta;
type Story = StoryObj<ExtraBadgeComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.severity && args.severity !== 'primary') parts.push(`severity="${args.severity}"`);
    if (args.dot) parts.push(`[dot]="true"`);
    else if (args.value) parts.push(`value="${args.value}"`);
    if (args.size && args.size !== 'base') parts.push(`size="${args.size}"`);

    const template = parts.length
      ? `<extra-badge\n  ${parts.join('\n  ')}\n></extra-badge>`
      : `<extra-badge value="8"></extra-badge>`;

    return { props: args, template };
  },
  args: {
    severity: 'primary',
    value: '8',
    dot: false,
    size: 'base'
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Витрины вариантов ────────────────────────────────────────────────────────

export { Severity } from './examples/badge-severity.component';
export { Sizes } from './examples/badge-sizes.component';
export { Dot } from './examples/badge-dot.component';
