import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraTabsComponent } from '../../../lib/components/tabs/tabs.component';
import { TabsWithBadgeComponent, WithBadge } from './examples/tabs-with-badge.component';
import { TabsWithDisabledComponent, WithDisabled } from './examples/tabs-with-disabled.component';

const meta: Meta<ExtraTabsComponent> = {
  title: 'Components/Panel/Tabs',
  component: ExtraTabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraTabsComponent, TabsWithBadgeComponent, TabsWithDisabledComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Организует контент по вкладкам с возможностью переключения между ними.

\`\`\`typescript
import { ExtraTabsComponent, ExtraTabItem } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-tabs' }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение активной вкладки',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'string | number' }
      }
    },
    scrollable: {
      control: 'boolean',
      description: 'Включает горизонтальную прокрутку списка вкладок',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    lazy: {
      control: 'boolean',
      description: 'Ленивая инициализация панелей — содержимое рендерится только при первом открытии',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    tabs: {
      control: 'object',
      description: 'Массив вкладок',
      table: {
        category: 'Props',
        type: { summary: 'ExtraTabItem[]' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<ExtraTabsComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    parts.push(`value="${args.value}"`);
    parts.push(`[tabs]="tabs"`);
    if (args.scrollable) parts.push(`[scrollable]="true"`);
    if (args.lazy) parts.push(`[lazy]="true"`);

    const template = `<extra-tabs\n  ${parts.join('\n  ')}\n></extra-tabs>`;

    return { props: args, template };
  },
  args: {
    value: '0',
    tabs: [
      { value: '0', label: 'Tab 1', icon: 'ti ti-user', content: 'Tab 1 Content' },
      { value: '1', label: 'Tab 2', icon: 'ti ti-settings', content: 'Tab 2 Content' },
      { value: '2', label: 'Tab 3', icon: 'ti ti-bell', content: 'Tab 3 Content' }
    ],
    scrollable: false,
    lazy: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента с иконками. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

export { WithBadge, WithDisabled };
