import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraTabsComponent } from '../../../lib/components/tabs/tabs.component';
import { ExtraTabItemComponent } from '../../../lib/components/tabs/tab-item.component';
import { TabsDefaultComponent } from './examples/tabs-default.component';
import { TabsWithBadgeComponent, WithBadge } from './examples/tabs-with-badge.component';
import { TabsWithDisabledComponent, WithDisabled } from './examples/tabs-with-disabled.component';

const meta: Meta<TabsDefaultComponent> = {
  title: 'Components/Menu/Tabs',
  component: TabsDefaultComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraTabsComponent, ExtraTabItemComponent, TabsDefaultComponent, TabsWithBadgeComponent, TabsWithDisabledComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Организует контент по вкладкам с возможностью переключения между ними.

Реализовано по спецификации [tabs.md](https://github.com/cdek-it/angular-ui-kit/blob/main/docs/components-api/tabs.md).

\`\`\`typescript
import { ExtraTabsComponent, ExtraTabItemComponent } from '@cdek-it/angular-ui-kit';
\`\`\`

Вкладки задаются дочерними компонентами \`<extra-tab-item>\`, содержимое панели — через их собственный content projection.`
      }
    },
    designTokens: { prefix: '--p-tabs' }
  },
  argTypes: {
    scrollable: {
      control: 'boolean',
      description: 'Включает горизонтальную прокрутку списка вкладок',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    lazy: {
      control: 'boolean',
      description: 'Ленивая инициализация панелей — содержимое рендерится только при первом открытии',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    scrollable: false,
    lazy: false
  }
};

export default meta;
type Story = StoryObj<TabsDefaultComponent>;

// ── Default (интерактивная) ────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `<app-tabs-default [scrollable]="scrollable" [lazy]="lazy"></app-tabs-default>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример с тремя вкладками и иконками. Используйте Controls для `scrollable`/`lazy`.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraTabsComponent, ExtraTabItemComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraTabsComponent, ExtraTabItemComponent],
  template: \`
    <extra-tabs>
      <extra-tab-item name="Профиль" icon="ti ti-user">Данные профиля</extra-tab-item>
      <extra-tab-item name="Настройки" icon="ti ti-settings">Параметры аккаунта</extra-tab-item>
      <extra-tab-item name="Уведомления" icon="ti ti-bell">Настройки уведомлений</extra-tab-item>
    </extra-tabs>
  \`,
})
export class ExampleComponent {}
        `
      }
    }
  }
};

// ── Комбинаторные истории ──────────────────────────────────────────────────
export { WithBadge, WithDisabled };
