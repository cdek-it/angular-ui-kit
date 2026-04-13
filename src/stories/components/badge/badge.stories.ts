import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from '../../../lib/components/badge/badge.component';
import { BadgeSeverityComponent } from './examples/badge-severity.component';
import { BadgeSizesComponent } from './examples/badge-sizes.component';
import { BadgeDotComponent } from './examples/badge-dot.component';

export { Severity } from './examples/badge-severity.component';
export { Sizes } from './examples/badge-sizes.component';
export { Dot } from './examples/badge-dot.component';

const meta: Meta<BadgeComponent> = {
  title: 'Components/Misc/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BadgeComponent, BadgeSeverityComponent, BadgeSizesComponent, BadgeDotComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Компактный индикатор статуса или числового значения. Используется для отображения счётчиков, меток и статусов.

\`\`\`typescript
import { BadgeModule } from 'primeng/badge';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-badge' },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    value: {
      control: 'text',
      description: 'Отображаемое значение бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string | number' },
      },
    },
    severity: {
      control: 'select',
      options: ['primary', 'success', 'info', 'warning', 'danger'],
      description: 'Цветовая схема бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'success' | 'info' | 'warning' | 'danger'" },
      },
    },
    size: {
      control: 'select',
      options: ['base', 'large', 'xlarge'],
      description: 'Размер бейджа',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'base' | 'large' | 'xlarge'" },
      },
    },
  },
  args: {
    value: '8',
    severity: 'primary',
    size: 'base',
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `<app-badge-severity [value]="value" [severity]="severity" [size]="size"></app-badge-severity>`,
  }),
  args: {
    value: '8',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};
