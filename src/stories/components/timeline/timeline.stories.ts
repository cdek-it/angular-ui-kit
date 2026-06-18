import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  ExtraTimelineComponent as TimelineComponent,
  ExtraTimelineContentDirective,
  ExtraTimelineMarkerDirective,
  ExtraTimelineOppositeDirective
} from '../../../lib/components/timeline/timeline.component';

type TimelineArgs = TimelineComponent & { verticalAlign: string; horizontalAlign: string };
type Story = StoryObj<TimelineArgs>;

const defaultEvents = [
  { value: 'Заказ создан', caption: '15 апр 2026, 10:00' },
  { value: 'Принят на склад', caption: '16 апр 2026, 14:30' },
  { value: 'В пути', caption: '17 апр 2026, 09:15' },
  { value: 'Доставлен', caption: '18 апр 2026, 11:45' }
];

const meta: Meta<TimelineArgs> = {
  title: 'Components/Data/Timeline',
  component: TimelineComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TimelineComponent,
        ExtraTimelineContentDirective,
        ExtraTimelineOppositeDirective,
        ExtraTimelineMarkerDirective
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-timeline' },
    docs: {
      description: {
        component:
          "Компонент для визуализации последовательности событий в хронологическом порядке. Поддерживает горизонтальную и вертикальную ориентацию, кастомные маркеры.\n\nШаблоны (передаются между тегами компонента):\n- `extraTimelineContent` — контент события (контекст `let-event`)\n- `extraTimelineOpposite` — контент с противоположной стороны линии (контекст `let-event`)\n- `extraTimelineMarker` — кастомный маркер (контекст `let-event`)\n\n```typescript\nimport { ExtraTimelineComponent as TimelineComponent, ExtraTimelineContentDirective, ExtraTimelineOppositeDirective, ExtraTimelineMarkerDirective } from '@cdek-it/angular-ui-kit';\n```"
      }
    }
  },
  argTypes: {
    value: {
      control: 'object',
      description: 'Массив событий для отображения',
      table: {
        category: 'Props',
        type: { summary: '{ value: string, caption?: string }[]' }
      }
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Ориентация таймлайна',
      table: {
        category: 'Props',
        defaultValue: { summary: "'vertical'" },
        type: { summary: "'vertical' | 'horizontal'" }
      }
    },
    align: { table: { disable: true } },
    verticalAlign: {
      name: 'align',
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Положение контента относительно маркера',
      table: {
        category: 'Props',
        defaultValue: { summary: "'left'" },
        type: { summary: "'left' | 'right' | 'alternate'" }
      },
      if: { arg: 'layout', eq: 'vertical' }
    },
    horizontalAlign: {
      name: 'align',
      control: 'select',
      options: ['top', 'bottom', 'alternate'],
      description: 'Положение контента относительно маркера',
      table: {
        category: 'Props',
        defaultValue: { summary: "'top'" },
        type: { summary: "'top' | 'bottom' | 'alternate'" }
      },
      if: { arg: 'layout', eq: 'horizontal' }
    },
    showCaption: {
      control: 'boolean',
      description: 'Показывать описание (caption) под основным контентом',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    line: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'none'],
      description: 'Стиль линии коннектора',
      table: {
        category: 'Props',
        defaultValue: { summary: "'solid'" },
        type: { summary: "'solid' | 'dashed' | 'dotted' | 'none'" }
      }
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки маркера (например `ti ti-check`)',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    markerColor: {
      control: 'color',
      description: 'Кастомный цвет маркера',
      table: {
        category: 'Props',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    }
  },
  args: {
    value: defaultEvents,
    layout: 'vertical',
    verticalAlign: 'left',
    horizontalAlign: 'top',
    showCaption: true,
    line: 'solid',
    icon: '',
    markerColor: ''
  }
};

export default meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderStory(args: any) {
  const layout = args.layout ?? 'vertical';
  const align = layout === 'horizontal' ? (args.horizontalAlign ?? 'top') : (args.verticalAlign ?? 'left');

  const defaultAlign = layout === 'horizontal' ? 'top' : 'left';

  const parts: string[] = [];

  parts.push(`[value]="value"`);
  if (align !== defaultAlign) parts.push(`align="${align}"`);
  if (layout !== 'vertical') parts.push(`layout="${layout}"`);
  parts.push(`[showCaption]="${args.showCaption}"`);
  if (args.line && args.line !== 'solid') parts.push(`line="${args.line}"`);
  if (args.icon) parts.push(`icon="${args.icon}"`);
  if (args.markerColor) parts.push(`markerColor="${args.markerColor}"`);

  const attrs = parts.join('\n  ');

  const template = `<extra-timeline
  ${attrs}
>
  <ng-template extraTimelineContent let-event>
    <div>{{ event.value }}</div>
    @if (${args.showCaption}) {<small>{{ event.caption }}</small>}
  </ng-template>
</extra-timeline>`;

  return { props: { ...args, value: args.value }, template };
}

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => renderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример. Используйте Controls для изменения ориентации и выравнивания.'
      }
    }
  }
};

// ── Horizontal ───────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  name: 'Horizontal',
  render: (args) => renderStory(args),
  args: {
    layout: 'horizontal',
    horizontalAlign: 'top'
  },
  parameters: {
    docs: {
      description: {
        story: 'Горизонтальная ориентация через `layout="horizontal"` и `align="top"`.'
      }
    }
  }
};

// ── Opposite ─────────────────────────────────────────────────────────────────
export const Opposite: Story = {
  name: 'Opposite',
  render: (args) => {
    const layout = args.layout ?? 'vertical';
    const align = layout === 'horizontal' ? (args.horizontalAlign ?? 'top') : (args.verticalAlign ?? 'left');

    const defaultAlign = layout === 'horizontal' ? 'top' : 'left';

    const parts: string[] = [];

    parts.push(`[value]="value"`);
    if (align !== defaultAlign) parts.push(`align="${align}"`);
    if (layout !== 'vertical') parts.push(`layout="${layout}"`);
    parts.push(`[showCaption]="${args.showCaption}"`);
    if (args.line && args.line !== 'solid') parts.push(`line="${args.line}"`);
    if (args.icon) parts.push(`icon="${args.icon}"`);
    if (args.markerColor) parts.push(`markerColor="${args.markerColor}"`);

    const attrs = parts.join('\n  ');

    const template = `<extra-timeline
  ${attrs}
>
  <ng-template extraTimelineContent let-event>{{ event.value }}</ng-template>
  <ng-template extraTimelineOpposite let-event>
    <small>{{ event.caption }}</small>
  </ng-template>
</extra-timeline>`;

    return { props: { ...args, value: args.value }, template };
  },
  args: {
    verticalAlign: 'alternate'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Контент по другую сторону линии через директиву `extraTimelineOpposite`. Отображается при `align="alternate"`, `"right"`, `"bottom"`.'
      }
    }
  }
};

// ── Dashed Line ──────────────────────────────────────────────────────────────
export const DashedLine: Story = {
  name: 'Dashed Line',
  render: (args) => renderStory(args),
  args: {
    line: 'dashed'
  },
  parameters: {
    docs: {
      description: {
        story: 'Пунктирная линия коннектора через проп `line="dashed"`. Другие варианты: `solid`, `dotted`, `none`.'
      }
    }
  }
};

// ── Custom Icon ──────────────────────────────────────────────────────────────
export const CustomIcon: Story = {
  name: 'Custom Icon',
  render: (args) => renderStory(args),
  args: {
    icon: 'ti ti-check',
    markerColor: '#3182ce'
  },
  parameters: {
    docs: {
      description: {
        story: 'Кастомная иконка вместо маркера через проп `icon` (CSS-класс иконки, например Tabler Icons).'
      }
    }
  }
};

// ── Marker Color ─────────────────────────────────────────────────────────────
export const MarkerColor: Story = {
  name: 'Marker Color',
  render: (args) => renderStory(args),
  args: {
    markerColor: '#e53e3e'
  },
  parameters: {
    docs: {
      description: {
        story: 'Кастомный цвет маркера через проп `markerColor`.'
      }
    }
  }
};

// ── Custom Marker ─────────────────────────────────────────────────────────────
export const CustomMarker: Story = {
  name: 'Custom Marker',
  render: (args) => ({
    props: { ...args, value: defaultEvents },
    template: `
      <extra-timeline [value]="value" layout="vertical" align="left">
        <ng-template extraTimelineContent let-event>
          <div>{{ event.value }}</div>
          <small>{{ event.caption }}</small>
        </ng-template>
        <ng-template extraTimelineMarker let-event>
          <span
            class="inline-flex items-center justify-center rounded-full"
            style="width: 28px; height: 28px; background: var(--p-primary-color, #3b82f6); color: #fff;"
          >
            <i class="ti ti-check"></i>
          </span>
        </ng-template>
      </extra-timeline>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Полностью кастомный маркер через директиву `extraTimelineMarker` (контекст `let-event`). Заменяет дефолтный маркер и проп `icon`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraTimelineComponent as TimelineComponent,
  ExtraTimelineContentDirective,
  ExtraTimelineMarkerDirective,
} from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [TimelineComponent, ExtraTimelineContentDirective, ExtraTimelineMarkerDirective],
  template: \`
    <extra-timeline [value]="events" layout="vertical" align="left">
      <ng-template extraTimelineContent let-event>
        <div>{{ event.value }}</div>
        <small>{{ event.caption }}</small>
      </ng-template>
      <ng-template extraTimelineMarker let-event>
        <span class="inline-flex items-center justify-center rounded-full"
          style="width: 28px; height: 28px; background: #3b82f6; color: #fff;">
          <i class="ti ti-check"></i>
        </span>
      </ng-template>
    </extra-timeline>
  \`,
})
export class TimelineCustomMarkerExample {
  events = [ /* ... */ ];
}
        `
      }
    }
  }
};
