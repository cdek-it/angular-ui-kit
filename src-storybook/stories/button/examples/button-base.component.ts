import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { StoryObj } from '@storybook/angular';

const template = `
<div class="bg-surface-ground p-4">
  <p-button 
    [label]="label" 
    [disabled]="disabled" 
    [loading]="loading"
    [size]="size" 
    [rounded]="rounded"
    [outlined]="outlined"
    [text]="text"
    [icon]="icon"
    [iconPos]="iconPos"
    [badge]="badge"
    [severity]="severity"
  >
  </p-button>
</div>
`;
const styles = ``;

@Component({
  selector: 'app-button-base',
  standalone: true,
  imports: [Button],
  template,
  styles,
})
export class ButtonBaseComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size: 'small' | 'large' | null = null;
  @Input() rounded = false;
  @Input() outlined = false;
  @Input() text = false;
  @Input() icon: string = '';
  @Input() iconPos: 'left' | 'right' | null = null;
  @Input() badge: string = '';
  @Input() severity: 'success' | 'info' | 'warning' | 'primary' | 'help' | 'danger' | null = null;
}

export const Base: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
<app-button-base 
  [label]="label" 
  [disabled]="disabled" 
  [loading]="loading" 
  [size]="size" 
  [rounded]="rounded" 
  [outlined]="outlined" 
  [text]="text" 
  [icon]="icon"
  [iconPos]="iconPos"
  [badge]="badge"
  [severity]="severity"
>
</app-button-base>`,
  }),
  args: {
    label: 'Base button',
    disabled: false,
    loading: false,
    size: null,
    rounded: false,
    outlined: false,
    text: false,
    icon: '',
    iconPos: null,
    badge: '',
    severity: null,
  },
  argTypes: {
    label: {
      description: 'Текст кнопки.',
    },
    disabled: {
      description: 'При наличии указывает, что компонент должен быть отключен.',
    },
    loading: {
      description: 'Находится ли кнопка в состоянии загрузки.',
    },
    // TODO Добавить xlarge после фикса в либе.
    size: {
      description: 'Определяет размер кнопки.',
      control: { type: 'select' },
      options: [null, 'small', 'large'],
      table: {
        type: { summary: `'small' | 'large' | null` }, // <-- тип в документации
      },
    },
    rounded: {
      description: 'При наличии делает кнопку с закругленными краями.',
    },
    outlined: {
      description: 'При наличии делает кнопку с контуром без фона.',
    },
    text: {
      description: 'При наличии делает кнопку текстовой без фона и границ.',
    },
    icon: {
      description: 'Имя иконки для отображения в кнопке.',
    },
    iconPos: {
      description: 'Позиция иконки относительно текста.',
      control: { type: 'select' },
      options: [null, 'left', 'right'],
      table: {
        type: { summary: `'left' | 'right' | null` },
      },
    },
    badge: {
      description: 'Текст для отображения в виде бейджа на кнопке.',
    },
    severity: {
      description: 'Определяет цветовую схему кнопки.',
      control: { type: 'select' },
      options: [null, 'success', 'info', 'warning', 'primary', 'help', 'danger'],
      table: {
        type: {
          summary: `'success' | 'info' | 'warning' | 'primary' | 'help' | 'danger' | null`,
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Стандартная кнопка',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
        
@Component({
  selector: 'app-button-base',
  standalone: true,
  imports: [
    Button
  ],
  template: ${template},
  styles: ${styles}
})
export class ButtonBaseComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size: 'small' | 'large' | null = null;
  @Input() rounded = false;
}
        `,
      },
    },
  },
};
