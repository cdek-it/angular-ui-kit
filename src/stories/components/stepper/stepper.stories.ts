import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraStepperComponent } from '../../../lib/components/stepper/stepper.component';
import { ExtraStepperItemComponent } from '../../../lib/components/stepper/stepper-item.component';
import { ExtraButtonComponent } from '../../../lib/components/button/button.component';
import { StepperDefaultComponent } from './examples/stepper-default.component';
import { StepperVerticalComponent, Vertical } from './examples/stepper-vertical.component';
import { StepperLinearComponent, Linear } from './examples/stepper-linear.component';
import { StepperStatesComponent, States } from './examples/stepper-states.component';

const meta: Meta<StepperDefaultComponent> = {
  title: 'Components/Panel/Stepper',
  component: StepperDefaultComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraStepperComponent,
        ExtraStepperItemComponent,
        ExtraButtonComponent,
        StepperDefaultComponent,
        StepperVerticalComponent,
        StepperLinearComponent,
        StepperStatesComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Мастер пошаговых действий (wizard): последовательность этапов с индикатором и панелью контента.

Реализовано по спецификации [stepper.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/stepper.md).

\`\`\`typescript
import { ExtraStepperComponent, ExtraStepperItemComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Шаги задаются дочерними компонентами \`<extra-stepper-item>\`, содержимое панели — через их собственный content projection. Для навигации используйте \`#stepper="extraStepper"\` и \`stepper.next()\`/\`stepper.prev()\`.`
      }
    },
    designTokens: { prefix: '--p-stepper' }
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация степпера',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "'horizontal'" },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    line: {
      control: 'boolean',
      description: 'Соединительная линия между заголовками шагов',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    linear: {
      control: 'boolean',
      description: 'Запрещает переход к следующему шагу без завершения текущего',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    orientation: 'horizontal',
    line: true,
    linear: false
  }
};

export default meta;
type Story = StoryObj<StepperDefaultComponent>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `<app-stepper-default [orientation]="orientation" [line]="line" [linear]="linear"></app-stepper-default>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Три шага с навигацией «Назад»/«Вперёд» через `#stepper="extraStepper"`. Используйте Controls для `orientation`/`line`/`linear`.'
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { Vertical, Linear, States };
