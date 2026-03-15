import { Component, Input } from '@angular/core';
import { Button, ButtonIconPosition } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-button
    [label]="label"
    [disabled]="disabled"
    [loading]="loading"
    [size]="size === 'xlarge' ? undefined : size"
    [class.p-button-xlg]="size === 'xlarge'"
    [rounded]="rounded"
    [outlined]="variant === 'outlined'"
    [text]="variant === 'text'"
    [link]="variant === 'link'"
    [icon]="icon"
    [iconPos]="iconPos"
    [badge]="badge"
    [severity]="severity"
  >
  </p-button>
</div>
`;

@Component({
  selector: 'app-button-base',
  standalone: true,
  imports: [Button],
  template
})
export class ButtonBaseComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size: 'small' | 'large' | 'xlarge' | undefined;
  @Input() rounded = false;
  @Input() variant: 'outlined' | 'text' | 'link' | null = null;
  @Input() icon: string = '';
  @Input() iconPos: ButtonIconPosition = 'left';
  @Input() badge: string = '';
  @Input() severity: Extract<Button['severity'], string | null> = null;
}

export const Default: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
<app-button-base
  [label]="label"
  [disabled]="disabled"
  [loading]="loading"
  [size]="size"
  [rounded]="rounded"
  [variant]="variant"
  [icon]="icon"
  [iconPos]="iconPos"
  [badge]="badge"
  [severity]="severity"
>
</app-button-base>`
  }),
  args: {
    label: 'Button',
    disabled: false,
    loading: false,
    size: null,
    rounded: false,
    variant: null,
    icon: '',
    iconPos: 'left',
    badge: '',
    severity: null
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст кнопки'
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние'
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки с индикатором'
    },
    size: {
      control: 'select',
      options: [null, 'small', 'large', 'xlarge'],
      description: 'Размер кнопки'
    },
    rounded: {
      control: 'boolean',
      description: 'Скруглённая форма кнопки'
    },
    variant: {
      control: 'select',
      options: [null, 'outlined', 'text', 'link'],
      description: 'Вариант отображения кнопки'
    },
    icon: {
      control: 'text',
      description: 'CSS-класс иконки (например: ti ti-check)'
    },
    iconPos: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Позиция иконки относительно текста'
    },
    badge: {
      control: 'text',
      description: 'Текст для отображения в виде бейджа на кнопке'
    },
    severity: {
      control: 'select',
      options: [null, 'secondary', 'contrast', 'success', 'info', 'warn', 'help', 'danger'],
      description: 'Семантический вариант кнопки'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};
