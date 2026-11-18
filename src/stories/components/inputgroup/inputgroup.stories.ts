import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ExtraInputGroupComponent,
  ExtraInputGroupSize,
  ExtraInputGroupAddonPosition
} from '../../../lib/components/inputgroup/input-group.component';
import {
  ExtraInputGroupAddonComponent,
  ExtraInputGroupPosition,
  ExtraInputGroupAddonType
} from '../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../lib/components/inputtext/inputtext.component';

type Args = {
  size: ExtraInputGroupSize;
  addonPosition: ExtraInputGroupAddonPosition;
  position: ExtraInputGroupPosition;
  type: ExtraInputGroupAddonType;
  icon: string;
  text: string;
  disabled: boolean;
  value: string;
};

const attribute = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = (args: Args): string => {
  const addon = (position: ExtraInputGroupPosition) =>
    args.type === 'icon'
      ? `  <extra-input-group-addon position="${position}" type="icon" icon="${attribute(args.icon)}"></extra-input-group-addon>`
      : `  <extra-input-group-addon position="${position}" type="text">${attribute(args.text)}</extra-input-group-addon>`;
  const parts = [`<extra-input-group size="${args.size}" addonPosition="${args.addonPosition}">`];
  if (args.addonPosition !== 'right') parts.push(addon(args.position));
  parts.push(
    `  <extra-input-text size="${args.size}" placeholder="Placeholder" ariaLabel="Поле ввода" [fluid]="true" [formControl]="fieldControl"></extra-input-text>`
  );
  if (args.addonPosition !== 'left') parts.push(addon(args.addonPosition === 'both' ? 'right' : args.position));
  parts.push('</extra-input-group>');
  return parts.join('\n');
};

const meta: Meta<Args> = {
  title: 'Components/Form/InputGroup',
  component: ExtraInputGroupComponent,
  tags: ['autodocs', 'inputgroup'],
  decorators: [
    moduleMetadata({
      imports: [ExtraInputGroupComponent, ExtraInputGroupAddonComponent, ExtraInputTextComponent, ReactiveFormsModule]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Группа полей ввода для объединения с аддонами (иконками или текстом).

\`\`\`typescript
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_source: string, context: { args: Args }) => template(context.args)
      }
    },
    designTokens: { prefix: '--p-inputgroup' }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер группы (влияет на паддинги и шрифты аддонов)',
      table: { category: 'Свойства', defaultValue: { summary: "'base'" } }
    },
    addonPosition: {
      control: 'select',
      options: ['left', 'right', 'both'],
      description: 'Расположение аддона(ов) относительно поля (CSS-класс-хук, не переставляет DOM)',
      table: { category: 'Свойства', defaultValue: { summary: "'left'" } }
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      table: {
        category: 'Аддон',
        defaultValue: { summary: "'left'" },
        description: 'Позиция аддона относительно поля: слева или справа'
      }
    },
    type: {
      control: 'select',
      options: ['text', 'icon'],
      table: {
        category: 'Аддон',
        defaultValue: { summary: "'text'" },
        description: 'Тип аддона: текст, иконка или кнопка'
      }
    },
    icon: { control: 'text', table: { category: 'Аддон' }, description: 'CSS-класс иконки (tabler) для аддона-иконки' },
    text: { control: 'text', table: { category: 'Содержимое' }, description: 'Текст аддона' },
    disabled: { control: 'boolean', table: { category: 'FormControl' }, description: 'Отключённое состояние аддона' },
    value: { control: 'text', table: { category: 'FormControl' }, description: 'Значение поля ввода' }
  },
  args: {
    size: 'base',
    addonPosition: 'left',
    position: 'left',
    type: 'icon',
    icon: 'ti ti-user',
    text: 'text',
    disabled: false,
    value: ''
  },
  render: (args) => ({
    props: { ...args, fieldControl: new FormControl({ value: args.value, disabled: args.disabled }) },
    template: template(args)
  })
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: { story: 'Базовый пример группы ввода с иконкой. Используйте Controls для изменения размера.' }
    }
  }
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          'Отключённое состояние — управляется через FormControl; аддоны автоматически получают стили disabled вместе с полем ввода.'
      }
    }
  }
};

export const WithText: Story = {
  args: { type: 'text' },
  parameters: {
    docs: {
      description: {
        story: 'В качестве наполнения аддона можно использовать обычный текст — например, символ валюты или префикс.'
      }
    }
  }
};

export const AddonRight: Story = {
  args: { addonPosition: 'right', position: 'right' },
  parameters: {
    docs: {
      description: { story: 'Аддон расположен справа — используется для единиц измерения, валюты или суффиксов.' }
    }
  }
};

export const AddonBoth: Story = {
  args: { addonPosition: 'both' },
  parameters: {
    docs: { description: { story: 'Аддоны расположены с обеих сторон — например, иконка-префикс и кнопка поиска.' } }
  }
};
