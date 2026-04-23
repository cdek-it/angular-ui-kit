import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TimelineComponent } from '../../../lib/components/timeline/timeline.component';
import { TimelineHorizontalComponent, Horizontal } from './examples/timeline-horizontal.component';
import { TimelineDashedLineComponent, DashedLine } from './examples/timeline-dashed-line.component';
import { TimelineCustomIconComponent, CustomIcon } from './examples/timeline-custom-icon.component';
import { TimelineMarkerColorComponent, MarkerColor } from './examples/timeline-marker-color.component';

type TimelineArgs = TimelineComponent;
type Story = StoryObj<TimelineArgs>;

const meta: Meta<TimelineArgs> = {
  title: 'Components/Data/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TimelineComponent, TimelineHorizontalComponent, TimelineDashedLineComponent, TimelineCustomIconComponent, TimelineMarkerColorComponent],
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
    showCaption: {
      control: 'boolean',
      description: 'Показывать opposite-контент',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    line: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
      description: 'Стиль линии коннектора',
      table: {
        category: 'Props',
        defaultValue: { summary: "'solid'" },
        type: { summary: "'solid' | 'dashed' | 'dotted' | 'none'" },
      },
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки маркера (например `ti ti-check`)',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
      },
    },
    markerColor: {
      control: 'color',
      description: 'Кастомный цвет маркера',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' },
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
    showCaption: true,
    line: 'solid',
    icon: '',
    markerColor: '',
  },
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderStory(args: any) {
  const parts: string[] = [];

  parts.push(`[value]="value"`);
  if (args.align && args.align !== 'left') parts.push(`align="${args.align}"`);
  if (args.layout && args.layout !== 'vertical') parts.push(`layout="${args.layout}"`);
  if (args.showCaption === false) parts.push(`[showCaption]="false"`);
  if (args.line && args.line !== 'solid') parts.push(`line="${args.line}"`);
  if (args.icon) parts.push(`icon="${args.icon}"`);
  if (args.markerColor) parts.push(`markerColor="${args.markerColor}"`);

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
export { DashedLine };
export { CustomIcon };
export { MarkerColor };
