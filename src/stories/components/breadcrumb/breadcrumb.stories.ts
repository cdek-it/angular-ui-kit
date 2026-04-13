import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BreadcrumbComponent } from '../../../lib/components/breadcrumb/breadcrumb.component';
import { BreadcrumbBasicComponent } from './examples/breadcrumb-basic.component';
import { BreadcrumbIconsOnlyComponent } from './examples/breadcrumb-icons-only.component';
import { commonHome, commonItems, iconOnlyItems } from './breadcrumb.data';

type BreadcrumbArgs = BreadcrumbComponent;

const meta: Meta<BreadcrumbArgs> = {
  title: 'Components/Menu/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BreadcrumbComponent,
        BreadcrumbBasicComponent,
        BreadcrumbIconsOnlyComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-breadcrumb' },
    docs: {
      description: {
        component: `Компонент навигации, показывающий путь к текущей странице.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    model: {
      control: 'object',
      description: 'Массив элементов меню',
      table: {
        category: 'Props',
        type: { summary: 'MenuItem[]' },
      },
    },
    home: {
      control: 'object',
      description: 'Элемент для иконки «Домой»',
      table: {
        category: 'Props',
        type: { summary: 'MenuItem' },
      },
    },
  },
  args: {
    model: commonItems,
    home: commonHome,
  },
};

export default meta;
type Story = StoryObj<BreadcrumbArgs>;

const commonTemplate = `
<breadcrumb
  [model]="model"
  [home]="home"
></breadcrumb>
`;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `<breadcrumb [model]="model" [home]="home"></breadcrumb>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента.',
      },
    },
  },
};

// ── Basic ─────────────────────────────────────────────────────────────────────
export const Basic: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    model: commonItems,
    home: commonHome,
  },
  parameters: {
    docs: {
      description: { story: 'Хлебные крошки с текстом и иконками.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-breadcrumb-basic',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: \`
    <breadcrumb [model]="model" [home]="home"></breadcrumb>
  \`,
})
export class BreadcrumbBasicComponent {
  home = { icon: 'ti ti-home', url: '#' };
  model = [
    { label: 'Электроника', icon: 'ti ti-device-laptop', url: '#' },
    { label: 'Компьютеры', icon: 'ti ti-cpu', url: '#' },
    { label: 'Ноутбуки' },
  ];
}
        `,
      },
    },
  },
};

// ── IconsOnly ─────────────────────────────────────────────────────────────────
export const IconsOnly: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    model: iconOnlyItems,
    home: commonHome,
  },
  parameters: {
    docs: {
      description: { story: 'Хлебные крошки только с иконками, без текста.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { BreadcrumbComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-breadcrumb-icons-only',
  standalone: true,
  imports: [BreadcrumbComponent],
  template: \`
    <breadcrumb [model]="model" [home]="home"></breadcrumb>
  \`,
})
export class BreadcrumbIconsOnlyComponent {
  home = { icon: 'ti ti-home', url: '#' };
  model = [
    { icon: 'ti ti-device-laptop', url: '#' },
    { icon: 'ti ti-cpu', url: '#' },
    { icon: 'ti ti-book' },
  ];
}
        `,
      },
    },
  },
};
