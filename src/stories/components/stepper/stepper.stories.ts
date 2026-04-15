import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { StepperComponent } from '../../../lib/components/stepper/stepper.component';
import { StepperVerticalComponent, Vertical as VerticalStory } from './examples/stepper-vertical.component';
import { StepperLinearComponent, Linear as LinearStory } from './examples/stepper-linear.component';
import { StepperStepsOnlyComponent, StepsOnly as StepsOnlyStory } from './examples/stepper-steps-only.component';
import { StepperErrorComponent, Error as ErrorStory } from './examples/stepper-error.component';

const meta: Meta<StepperComponent> = {
  title: 'Components/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        StepperComponent,
        StepperVerticalComponent,
        StepperLinearComponent,
        StepperStepsOnlyComponent,
        StepperErrorComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Пошаговый навигационный компонент для отображения прогресса через последовательность шагов.

\`\`\`typescript
import { StepperComponent, StepperItem } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-stepper' },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение активного шага',
      table: {
        category: 'Props',
        defaultValue: { summary: '1' },
        type: { summary: 'string' },
      },
    },
    linear: {
      control: 'boolean',
      description: 'Запрещает переход к следующему шагу без завершения текущего',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация степпера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    showPanels: {
      control: 'boolean',
      description: 'Показывать панели контента',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    steps: {
      control: 'object',
      description: 'Массив шагов',
      table: {
        category: 'Props',
        type: { summary: 'StepperItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<StepperComponent>;

// ── Default (Horizontal) ─────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Horizontal',
  render: (args) => {
    const parts: string[] = [];

    parts.push(`[value]="value"`);
    parts.push(`[steps]="steps"`);
    if (args.linear)                          parts.push(`[linear]="true"`);
    if (args.orientation === 'vertical')      parts.push(`orientation="vertical"`);
    if (!args.showPanels)                     parts.push(`[showPanels]="false"`);

    const template = `<stepper\n  ${parts.join('\n  ')}\n></stepper>`;

    return { props: args, template };
  },
  args: {
    value: '1',
    steps: [
      { value: '1', label: 'Stepper', caption: 'caption', content: 'Step 1 Content' },
      { value: '2', label: 'Stepper', caption: 'caption', content: 'Step 2 Content' },
      { value: '3', label: 'Stepper', caption: 'caption', content: 'Step 3 Content' },
    ],
    linear: false,
    orientation: 'horizontal',
    showPanels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальный степпер. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = VerticalStory;

// ── Linear ────────────────────────────────────────────────────────────────────

export const Linear: Story = LinearStory;

// ── StepsOnly ─────────────────────────────────────────────────────────────────

export const StepsOnly: Story = StepsOnlyStory;

// ── Error ─────────────────────────────────────────────────────────────────────

export const Error: Story = ErrorStory;
