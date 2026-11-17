import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraBreadcrumbComponent as BreadcrumbComponent } from '../../../lib/components/breadcrumb/breadcrumb.component';
import { Basic as BasicStory, BreadcrumbBasicComponent } from './examples/breadcrumb-basic.component';
import { BreadcrumbIconsOnlyComponent, IconsOnly as IconsOnlyStory } from './examples/breadcrumb-icons-only.component';
import { commonHome, commonItems, iconOnlyItems } from './breadcrumb.data';

type BreadcrumbArgs = BreadcrumbComponent;

const meta: Meta<BreadcrumbArgs> = {
  title: 'Components/Menu/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BreadcrumbComponent, BreadcrumbBasicComponent, BreadcrumbIconsOnlyComponent]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-breadcrumb' },
    docs: {
      description: {
        component: `Компонент навигации, показывающий путь к текущей странице.`
      },
      source: {
        language: 'html',
        type: 'code',
        transform: () => '<extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>'
      }
    }
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    model: {
      control: 'object',
      description: 'Массив элементов меню',
      table: {
        category: 'Props',
        type: { summary: 'ExtraMenuItem[]' }
      }
    },
    home: {
      control: 'object',
      description: 'Элемент для иконки «Домой»',
      table: {
        category: 'Props',
        type: { summary: 'ExtraMenuItem' }
      }
    }
  },
  args: {
    model: commonItems,
    home: commonHome
  }
};

export default meta;
type Story = StoryObj<BreadcrumbArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `<extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export const Basic: Story = {
  ...BasicStory,
  args: { model: commonItems, home: commonHome },
  parameters: {
    ...BasicStory.parameters,
    docs: {
      ...(BasicStory.parameters?.['docs'] ?? {}),
      description: { story: 'Хлебные крошки с текстом и иконками.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>'
      }
    }
  }
};

export const IconsOnly: Story = {
  ...IconsOnlyStory,
  args: { model: iconOnlyItems, home: commonHome },
  parameters: {
    ...IconsOnlyStory.parameters,
    docs: {
      ...(IconsOnlyStory.parameters?.['docs'] ?? {}),
      description: { story: 'Хлебные крошки только с иконками, без текста.' },
      source: {
        language: 'html',
        type: 'code',
        code: '<extra-breadcrumb [model]="model" [home]="home"></extra-breadcrumb>'
      }
    }
  }
};
