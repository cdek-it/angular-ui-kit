import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraCardComponent as CardComponent } from '../../../lib/components/card/card.component';
import { ExtraCardTemplateDirective } from '../../../lib/components/card/card-template.directive';
import { ExtraButtonComponent as ButtonComponent } from '../../../lib/components/button/button.component';
import { CardOverlayComponent, Overlay } from './examples/card-overlay.component';
import { CardWithoutHeaderComponent, WithoutHeader } from './examples/card-without-header.component';
import { CardWithoutFooterComponent, WithoutFooter } from './examples/card-without-footer.component';
import { CardWithoutSubtitleComponent, WithoutSubtitle } from './examples/card-without-subtitle.component';
import { CardMinimalComponent, Minimal } from './examples/card-minimal.component';

type CardArgs = CardComponent;

const meta: Meta<CardArgs> = {
  title: 'Components/Panel/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CardComponent,
        ExtraCardTemplateDirective,
        ButtonComponent,
        CardOverlayComponent,
        CardWithoutHeaderComponent,
        CardWithoutFooterComponent,
        CardWithoutSubtitleComponent,
        CardMinimalComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Гибкий контейнер для группировки контента с заголовком, подзаголовком, основным содержимым и действиями. Слоты \`header\`/\`footer\` — через директиву \`extraCardTemplate\`, \`content\` — обычный \`<ng-content>\`.

Реализован по спецификации \`docs/components-api/card.md\`.

\`\`\`typescript
import { ExtraCardComponent, ExtraCardTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-card' }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    title: {
      control: 'text',
      description: 'Заголовок карточки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    subtitle: {
      control: 'text',
      description: 'Подзаголовок карточки',
      table: {
        category: 'Свойства',
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    overlay: {
      control: 'boolean',
      description: 'Тень вокруг карточки (shadow-md)',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // Hidden internal members
    templates: { table: { disable: true } },
    headerTpl: { table: { disable: true } },
    footerTpl: { table: { disable: true } }
  }
};

export default meta;
type Story = StoryObj<CardArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.title) parts.push(`title="${args.title}"`);
    if (args.subtitle) parts.push(`subtitle="${args.subtitle}"`);
    if (args.overlay) parts.push(`[overlay]="true"`);

    const attrs = parts.length ? `\n  ${parts.join('\n  ')}` : '';
    const template = `<div class="bg-surface-ground">
  <extra-card${attrs} style="width: 20rem">
    <ng-template extraCardTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <p class="text-sm">Контент карточки. Гибкая область для любого содержимого.</p>
    <ng-template extraCardTemplate="footer">
      <extra-button label="Действие" size="small" [fluid]="true"></extra-button>
    </ng-template>
  </extra-card>
</div>`;

    return { props: args, template };
  },
  args: {
    title: 'Заголовок',
    subtitle: 'Подзаголовок',
    overlay: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { Overlay, WithoutHeader, WithoutFooter, WithoutSubtitle, Minimal };
