import { StoryObj } from '@storybook/angular';

export { ExtraButtonComponent } from '../../../../../components/button/button-extra.component';

export const Extra: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
<extra-button
  [label]="label"
  [variant]="variant"
  [severity]="severity"
  [size]="size"
  [rounded]="rounded"
  [iconPos]="iconPos"
  [iconOnly]="iconOnly"
  [icon]="icon"
  [disabled]="disabled"
  [loading]="loading"
></extra-button>`
  }),
  args: {
    label: 'Button',
    variant: 'primary',
    severity: null,
    size: 'base',
    rounded: false,
    iconPos: null,
    iconOnly: false,
    icon: '',
    disabled: false,
    loading: false
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст кнопки'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text', 'link'],
      description: 'Вариант отображения кнопки'
    },
    severity: {
      control: 'select',
      options: [null, 'success', 'warning', 'danger', 'info'],
      description: 'Цветовая схема кнопки'
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер кнопки'
    },
    rounded: {
      control: 'boolean',
      description: 'Скруглённая форма кнопки'
    },
    iconPos: {
      control: 'select',
      options: [null, 'prefix', 'postfix'],
      description: 'Позиция иконки (prefix — слева, postfix — справа)'
    },
    iconOnly: {
      control: 'boolean',
      description: 'Режим кнопки только с иконкой'
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например: ti ti-check)'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние'
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки с индикатором'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный пример с пропсами, соответствующими Figma-компоненту Button.'
      }
    }
  }
};
