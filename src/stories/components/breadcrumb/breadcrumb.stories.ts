import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ExtraBreadcrumbComponent as BreadcrumbComponent } from '../../../lib/components/breadcrumb/breadcrumb.component';
import { Basic, BreadcrumbBasicComponent } from './examples/breadcrumb-basic.component';
import { BreadcrumbIconsOnlyComponent, IconsOnly } from './examples/breadcrumb-icons-only.component';
import { commonHome, commonItems } from './breadcrumb.data';

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
export { Basic, IconsOnly };
