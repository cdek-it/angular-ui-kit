import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import type { StoryContext } from '@storybook/angular';
import { ExtraDividerComponent as DividerComponent } from '../../../lib/components/divider/divider.component';
import {
  DividerWithContentComponent,
  WithContent as WithContentStory
} from './examples/divider-with-content.component';
import { DividerWithIconComponent, WithIcon as WithIconStory } from './examples/divider-with-icon.component';
import { AlignLeft as AlignLeftStory, DividerAlignLeftComponent } from './examples/divider-align-left.component';
import {
  AlignBottom as AlignBottomStory,
  DividerAlignBottomComponent
} from './examples/divider-align-bottom.component';

type DividerArgs = DividerComponent & { horizontalAlign: string; verticalAlign: string; content: string; icon?: string };

const meta: Meta<DividerArgs> = {
  title: 'Components/Panel/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DividerComponent,
        DividerWithContentComponent,
        DividerWithIconComponent,
        DividerAlignLeftComponent,
        DividerAlignBottomComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Разделитель для визуального разделения контента. Поддерживает горизонтальную и вертикальную ориентацию, различные стили линии и выравнивание.

\`\`\`typescript
import { ExtraDividerComponent } from '@cdek-it/angular-ui-kit/components/divider';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-divider' }
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    type: {
      control: 'select',
      options: ['solid', 'dash'],
      description: 'Стиль линии разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'solid' },
        type: { summary: "'solid' | 'dash'" }
      }
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'top', 'bottom'],
      description: 'Выравнивание контента разделителя'
    },
    horizontalAlign: {
      name: 'align',
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Выравнивание контента внутри разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'center' },
        type: { summary: "'left' | 'center' | 'right'" }
      },
      if: { arg: 'layout', eq: 'horizontal' }
    },
    verticalAlign: {
      name: 'align',
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Выравнивание контента внутри разделителя',
      table: {
        category: 'Props',
        defaultValue: { summary: 'center' },
        type: { summary: "'top' | 'center' | 'bottom'" }
      },
      if: { arg: 'layout', eq: 'vertical' }
    },
    content: {
      control: 'text',
      description: 'Контент разделителя (content projection); выравнивать без него нечего',
      table: {
        category: 'Слоты',
        type: { summary: 'ng-content' }
      }
    }
  }
};

const commonTemplate = `
<extra-divider
  [layout]="layout"
  [type]="type"
  [align]="align"
></extra-divider>
`;

const dividerHtml = (args: Record<string, unknown>, content = ''): string => {
  const layout = (args['layout'] as string | undefined) ?? 'horizontal';
  const type = (args['type'] as string | undefined) ?? 'solid';
  const align =
    (layout === 'vertical'
      ? (args['verticalAlign'] as string | undefined)
      : (args['horizontalAlign'] as string | undefined)) ?? 'center';
  const attrs = [
    layout !== 'horizontal' ? `layout="${layout}"` : '',
    type !== 'solid' ? `type="${type}"` : '',
    align !== 'center' ? `align="${align}"` : ''
  ].filter(Boolean);

  return `<extra-divider${attrs.length ? ` ${attrs.join(' ')}` : ''}>${content ? `\n  ${content}\n` : ''}</extra-divider>`;
};

export default meta;
type Story = StoryObj<DividerArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const layout = args.layout ?? 'horizontal';
    const align = layout === 'vertical' ? (args.verticalAlign ?? 'center') : (args.horizontalAlign ?? 'center');

    const parts: string[] = [];

    if (layout !== 'horizontal') parts.push(`layout="${layout}"`);
    if (args.type && args.type !== 'solid') parts.push(`type="${args.type}"`);
    if (align !== 'center') parts.push(`align="${align}"`);

    const attrs = parts.length ? `\n  ${parts.join('\n  ')}\n` : '';
    const content = args.content ? `\n  <span>${args.content}</span>\n` : '';
    const divider = `<extra-divider${attrs}>${content}</extra-divider>`;

    /* Вертикальному разделителю нужна высота от родителя: без неё он ровно по контенту,
       и выравнивать внутри нечего — top, center и bottom дают одно и то же. */
    const template = layout === 'vertical' ? `<div class="flex h-40">\n  ${divider}\n</div>` : divider;

    return { props: args, template };
  },
  args: {
    layout: 'horizontal',
    type: 'solid',
    horizontalAlign: 'center',
    verticalAlign: 'center',
    content: 'Отправитель'
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      },
      source: {
        language: 'html',
        transform: (_code: string, context: StoryContext) => {
          const args = context.args as Record<string, unknown>;
          const content = args['content'] ? `<span>${args['content']}</span>` : '';
          return dividerHtml(args, content);
        }
      }
    }
  }
};

// ── WithContent ───────────────────────────────────────────────────────────────

export const WithContent: Story = {
  ...(WithContentStory as Story),
  parameters: {
    ...(WithContentStory as Story).parameters,
    docs: {
      ...((WithContentStory as Story).parameters?.['docs'] ?? {}),
      description: { story: 'Разделитель с текстовым контентом по центру.' },
      source: {
        language: 'html',
        transform: (_code: string, context: StoryContext) => {
          const args = context.args as Record<string, unknown>;
          return dividerHtml(args, `<span>${args['content'] ?? 'Москва → Новосибирск'}</span>`);
        }
      }
    }
  }
};

// ── WithIcon ──────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  ...(WithIconStory as Story),
  argTypes: { icon: { control: 'text', description: 'Класс иконки tabler icon' } },
  parameters: {
    ...(WithIconStory as Story).parameters,
    docs: {
      ...((WithIconStory as Story).parameters?.['docs'] ?? {}),
      description: { story: 'Разделитель с иконкой.' },
      source: {
        language: 'html',
        transform: (_code: string, context: StoryContext) => {
          const args = context.args as Record<string, unknown>;
          return dividerHtml(args, `<i class="${args['icon'] ?? 'ti ti-map-pin'}"></i>`);
        }
      }
    }
  }
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    layout: 'vertical',
    type: 'solid',
    align: 'center'
  },
  parameters: {
    docs: {
      description: { story: 'Вертикальный разделитель для разделения контента по горизонтали.' },
      source: {
        code: `<extra-divider layout="vertical"></extra-divider>`
      }
    }
  }
};

// ── Type ──────────────────────────────────────────────────────────────────────

export const TypeDashed: Story = {
  name: 'Dashed',
  render: (args) => ({
    props: args,
    template: `<extra-divider [layout]="layout" [type]="type" [align]="align">
  <span>{{ content }}</span>
</extra-divider>`
  }),
  args: {
    layout: 'horizontal',
    type: 'dash',
    align: 'center',
    horizontalAlign: 'center',
    verticalAlign: 'center',
    content: 'Раздел'
  },
  parameters: {
    docs: {
      description: { story: 'Разделитель с пунктирной линией.' },
      source: {
        language: 'html',
        transform: (_code: string, context: StoryContext) => {
          const args = context.args as Record<string, unknown>;
          return dividerHtml(args, `<span>${args['content'] ?? 'Раздел'}</span>`);
        }
      }
    }
  }
};

// ── Align ─────────────────────────────────────────────────────────────────────

export const AlignLeft: Story = {
  ...(AlignLeftStory as Story),
  parameters: {
    ...(AlignLeftStory as Story).parameters,
    docs: {
      ...((AlignLeftStory as Story).parameters?.['docs'] ?? {}),
      description: { story: 'Контент разделителя выровнен по левому краю.' }
    }
  }
};

export const AlignBottom: Story = {
  ...(AlignBottomStory as Story),
  parameters: {
    ...(AlignBottomStory as Story).parameters,
    docs: {
      ...((AlignBottomStory as Story).parameters?.['docs'] ?? {}),
      description: { story: 'Контент вертикального разделителя выровнен по нижнему краю.' }
    }
  }
};
