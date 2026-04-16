import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TimelineComponent } from '../../../lib/components/timeline/timeline.component';
import { TimelineHorizontalComponent, Horizontal } from './examples/timeline-horizontal.component';

type TimelineArgs = TimelineComponent;
type Story = StoryObj<TimelineArgs>;

const meta: Meta<TimelineArgs> = {
  title: 'Components/Data/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TimelineComponent, TimelineHorizontalComponent],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-timeline' },
    docs: {
      description: {
        component:
          'Визуализация последовательности событий. Поддерживает вертикальную и горизонтальную ориентацию, а также выравнивание `left`, `right`, `alternate`.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'object',
      description: 'Массив событий',
      table: {
        category: 'Props',
        type: { summary: 'any[]' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'right', 'alternate', 'top', 'bottom'],
      description: 'Выравнивание контента относительно линии',
      table: {
        category: 'Props',
        defaultValue: { summary: "'left'" },
        type: { summary: "'left' | 'right' | 'alternate' | 'top' | 'bottom'" },
      },
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Ориентация',
      table: {
        category: 'Props',
        defaultValue: { summary: "'vertical'" },
        type: { summary: "'vertical' | 'horizontal'" },
      },
    },
    contentTemplate: { table: { disable: true } },
    oppositeTemplate: { table: { disable: true } },
    markerTemplate: { table: { disable: true } },
  },
  args: {
    value: ['Заказ создан', 'Оплата', 'Отправка', 'Доставлено'],
    align: 'left',
    layout: 'vertical',
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderStory(args: any) {
  const parts: string[] = [];

  parts.push(`[value]="value"`);
  if (args.align && args.align !== 'left') parts.push(`align="${args.align}"`);
  if (args.layout && args.layout !== 'vertical') parts.push(`layout="${args.layout}"`);

  const template = `<timeline\n  ${parts.join('\n  ')}\n></timeline>`;

  return { props: { ...args, value: args.value }, template };
}

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример. Используйте Controls для изменения ориентации и выравнивания.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { Horizontal };
