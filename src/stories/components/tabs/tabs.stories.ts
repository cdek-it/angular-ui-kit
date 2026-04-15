import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TabsComponent } from '../../../lib/components/tabs/tabs.component';
import { TabsWithBadgeComponent, WithBadge as WithBadgeStory } from './examples/tabs-with-badge.component';
import { TabsWithDisabledComponent, WithDisabled as WithDisabledStory } from './examples/tabs-with-disabled.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Menu/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TabsComponent,
        TabsWithBadgeComponent,
        TabsWithDisabledComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Организует контент по вкладкам с возможностью переключения между ними.

\`\`\`typescript
import { TabsComponent, TabItem } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-tabs' },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Значение активной вкладки',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'string | number' },
      },
    },
    scrollable: {
      control: 'boolean',
      description: 'Включает горизонтальную прокрутку списка вкладок',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    lazy: {
      control: 'boolean',
      description: 'Ленивая инициализация панелей — содержимое рендерится только при первом открытии',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    tabs: {
      control: 'object',
      description: 'Массив вкладок',
      table: {
        category: 'Props',
        type: { summary: 'TabItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
      <tabs
        [value]="value"
        [tabs]="tabs"
        [scrollable]="scrollable"
        [lazy]="lazy"
      ></tabs>
    `,
  }),
  args: {
    value: '0',
    tabs: [
      { value: '0', label: 'Tab 1', icon: 'ti ti-user', content: 'Tab 1 Content' },
      { value: '1', label: 'Tab 2', icon: 'ti ti-settings', content: 'Tab 2 Content' },
      { value: '2', label: 'Tab 3', icon: 'ti ti-bell', content: 'Tab 3 Content' },
    ],
    scrollable: false,
    lazy: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента с иконками. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── WithBadge ─────────────────────────────────────────────────────────────────

export const WithBadge: Story = WithBadgeStory;

// ── WithDisabled ──────────────────────────────────────────────────────────────

export const WithDisabled: Story = WithDisabledStory;
