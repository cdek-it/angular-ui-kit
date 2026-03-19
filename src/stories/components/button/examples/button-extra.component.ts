import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

type ExtraButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text' | 'link';
type ExtraButtonSeverity = 'success' | 'warning' | 'danger' | 'info' | null;
type ExtraButtonSize = 'small' | 'base' | 'large' | 'xlarge';
type ExtraButtonIconPos = 'prefix' | 'postfix' | null;

const template = `
<div class="bg-surface-ground p-4">
  <p-button
    [label]="iconOnly ? '' : label"
    [disabled]="disabled"
    [loading]="loading"
    [size]="primeSize"
    [class.p-button-xlg]="size === 'xlarge'"
    [rounded]="rounded"
    [outlined]="variant === 'outlined'"
    [text]="variant === 'text'"
    [link]="variant === 'link'"
    [icon]="icon"
    [iconPos]="primeIconPos"
    [severity]="primeSeverity"
  ></p-button>
</div>
`;

@Component({
  selector: 'extra-button',
  standalone: true,
  imports: [Button],
  template
})
export class ExtraButtonComponent {
  @Input() label = 'Button';
  @Input() variant: ExtraButtonVariant = 'primary';
  @Input() severity: ExtraButtonSeverity = null;
  @Input() size: ExtraButtonSize = 'base';
  @Input() rounded = false;
  @Input() iconPos: ExtraButtonIconPos = null;
  @Input() iconOnly = false;
  @Input() icon = '';
  @Input() disabled = false;
  @Input() loading = false;

  get primeSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  get primeIconPos(): 'left' | 'right' {
    return this.iconPos === 'postfix' ? 'right' : 'left';
  }

  get primeSeverity(): string | null {
    if (this.variant === 'secondary') return 'secondary';
    if (this.severity === 'warning') return 'warn';
    return this.severity;
  }
}

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
