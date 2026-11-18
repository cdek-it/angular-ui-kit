import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import {
  ExtraPasswordComponent,
  ExtraPasswordHeaderDirective,
  ExtraPasswordFooterDirective
} from '../../../lib/components/password/password.component';
const INPUTS = [
  'showFeedback',
  'showMaskToggle',
  'placeholder',
  'size',
  'variant',
  'fluid',
  'label',
  'labelPosition',
  'floatLabel',
  'caption',
  'captionSeverity',
  'requiredMark',
  'clearable',
  'info',
  'promptLabel',
  'weakLabel',
  'mediumLabel',
  'strongLabel',
  'inputStyleClass',
  'ariaLabel',
  'ariaLabelledBy',
  'appendTo',
  'autofocus',
  'required',
  'name',
  'autocomplete',
  'maxLength',
  'tabindex',
  'readonly'
] as const;
type PasswordArgs = Pick<ExtraPasswordComponent, (typeof INPUTS)[number] | 'onFocus' | 'onBlur' | 'onClear'> & {
  value: string | null;
  disabled: boolean;
  invalid: boolean;
  templateMode: 'none' | 'rules' | 'header';
};
const escape = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
type RenderArgs = Pick<PasswordArgs, (typeof INPUTS)[number] | 'templateMode'>;
function template(args: RenderArgs): string {
  const attrs = ['[formControl]="fieldControl"'];
  for (const key of INPUTS) {
    const v = args[key];
    if (v === undefined) continue;
    attrs.push(typeof v === 'string' ? key + '="' + escape(v) + '"' : '[' + key + ']="' + v + '"');
  }
  attrs.push('(onFocus)="onFocus($event)"', '(onBlur)="onBlur($event)"', '(onClear)="onClear()"');
  let content = '';
  if (args.templateMode === 'header')
    content =
      '\n  <ng-template extraPasswordHeader><div class="font-semibold mb-2">Требования к паролю</div></ng-template>\n  <ng-template extraPasswordFooter><small>Не используйте пароль от других сервисов.</small></ng-template>\n';
  if (args.templateMode === 'rules')
    content =
      '\n  <ng-template extraPasswordFooter>\n    <div class="p-password-rules-divider" role="separator"></div>\n    <ul class="p-password-rules">\n' +
      ['Минимум одна строчная буква', 'Минимум одна заглавная буква', 'Минимум одна цифра', 'Не менее 8 символов']
        .map(
          (label, i) =>
            '      <li class="p-password-rule" [class.p-password-rule--success]="ruleMet(fieldControl.value, ' +
            i +
            ')" [class.p-password-rule--danger]="!!fieldControl.value && !ruleMet(fieldControl.value, ' +
            i +
            ')"><i [class]="ruleIcon(fieldControl.value, ' +
            i +
            ')" aria-hidden="true"></i><span>' +
            label +
            '</span></li>'
        )
        .join('\n') +
      '\n    </ul>\n  </ng-template>\n';
  return '<extra-password\n  ' + attrs.join('\n  ') + '\n>' + content + '</extra-password>';
}
const ruleMet = (value: string | null, index: number): boolean =>
  [/[a-z]/.test(value ?? ''), /[A-Z]/.test(value ?? ''), /\d/.test(value ?? ''), (value ?? '').length >= 8][index];
const meta: Meta<PasswordArgs> = {
  title: 'Components/Form/Password',
  component: ExtraPasswordComponent,
  tags: ['autodocs', 'password'],
  decorators: [
    moduleMetadata({
      imports: [ExtraPasswordComponent, ExtraPasswordHeaderDirective, ExtraPasswordFooterDirective, ReactiveFormsModule]
    })
  ],
  parameters: {
    controls: { expanded: true },
    designTokens: { prefix: '--p-password' },
    docs: {
      description: {
        component: `Поле ввода пароля с поддержкой индикатора надёжности и переключения видимости.

Шаблоны (передаются между тегами компонента):
- \`extraPasswordHeader\` — шапка панели надёжности
- \`extraPasswordFooter\` — подвал панели надёжности

\`\`\`typescript
import { ExtraPasswordComponent, ExtraPasswordHeaderDirective, ExtraPasswordFooterDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (_source: string, ctx: { args: PasswordArgs }) => template(ctx.args)
      }
    }
  },
  argTypes: {
    showFeedback: { control: 'boolean', description: 'Показывать индикатор надёжности пароля' },
    showMaskToggle: { control: 'boolean', description: 'Возможность показать/скрыть пароль' },
    placeholder: { control: 'text', description: 'Текст-подсказка' },
    size: { control: 'select', options: ['small', 'base', 'large', 'xlarge'], description: 'Размер поля' },
    variant: { control: 'select', options: ['filled', 'outlined'], description: 'Вариант отображения поля пароля' },
    fluid: { control: 'boolean', description: 'Растягивает поле на всю ширину контейнера' },
    label: { control: 'text', description: 'Текст лейбла поля' },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: 'Положение лейбла относительно поля (игнорируется при floatLabel=true)'
    },
    floatLabel: { control: 'boolean', description: 'Плавающая метка внутри поля (перекрывает labelPosition)' },
    caption: { control: 'text', description: 'Текст пояснения под полем' },
    captionSeverity: {
      control: 'select',
      options: ['base', 'success', 'warning', 'danger', 'info'],
      description: 'Тон подписи под полем: обычный, ошибка, успех, предупреждение'
    },
    requiredMark: { control: 'boolean', description: 'Показывает отметку обязательного поля' },
    clearable: { control: 'boolean', description: 'Показывает иконку очистки значения' },
    info: { control: 'text', description: 'Текст доп. информации в тултипе иконки ti-info-circle' },
    promptLabel: { control: 'text', description: 'Заголовок подсказки к паролю' },
    weakLabel: { control: 'text', description: 'Текст для слабого пароля' },
    mediumLabel: { control: 'text', description: 'Текст для среднего пароля' },
    strongLabel: { control: 'text', description: 'Текст для сильного пароля' },
    inputStyleClass: { control: 'text', description: 'CSS-класс нативного input' },
    ariaLabel: { control: 'text', description: 'Текст для скринридеров, если нет видимой подписи' },
    ariaLabelledBy: { control: 'text', description: 'id элемента, текст которого подписывает поле' },
    appendTo: { control: 'select', options: ['body', 'self'], description: 'Куда вставлять оверлей подсказки' },
    autofocus: { control: 'boolean', description: 'Ставит фокус на поле после первого рендера' },
    required: { control: 'boolean', description: 'Поле обязательное для заполнения' },
    name: { control: 'text', description: 'Имя поля в HTML-форме' },
    autocomplete: { control: 'text', description: 'Значение атрибута autocomplete нативного input' },
    maxLength: { control: 'number', description: 'Максимальная длина значения' },
    tabindex: { control: 'number', description: 'Порядок фокуса при навигации клавиатурой' },
    readonly: { control: 'boolean', description: 'Только для чтения: значение видно, но не редактируется' },
    onFocus: { control: false, description: 'Событие фокуса' },
    onBlur: { control: false, description: 'Событие потери фокуса' },
    onClear: { control: false, description: 'Событие очистки значения' },
    value: { control: 'text', description: 'Текущее значение поля' },
    disabled: { control: 'boolean', description: 'Отключённое состояние' },
    invalid: { control: 'boolean', description: 'Показывает состояние ошибки' },
    templateMode: {
      control: 'select',
      options: ['none', 'rules', 'header'],
      description: 'Режим работы с шаблоном поля'
    }
  },
  args: {
    showFeedback: true,
    showMaskToggle: true,
    placeholder: 'Password',
    size: 'base',
    variant: 'outlined',
    fluid: false,
    label: 'Label',
    labelPosition: 'top',
    floatLabel: false,
    caption: 'Caption',
    captionSeverity: 'base',
    requiredMark: true,
    clearable: false,
    info: 'Info',
    promptLabel: 'Введите пароль',
    weakLabel: 'Слабый',
    mediumLabel: 'Средний',
    strongLabel: 'Надёжный',
    inputStyleClass: undefined,
    ariaLabel: undefined,
    ariaLabelledBy: undefined,
    appendTo: 'body',
    autofocus: false,
    required: false,
    name: undefined,
    autocomplete: undefined,
    maxLength: undefined,
    tabindex: undefined,
    readonly: false,
    value: '',
    disabled: false,
    invalid: false,
    templateMode: 'none',
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn()
  },
  render: (args) => {
    const fieldControl = new FormControl<string | null>(
      { value: args.value, disabled: args.disabled },
      args.invalid ? () => ({ storyInvalid: true }) : []
    );
    if (args.invalid) fieldControl.markAsTouched();
    return {
      props: {
        ...Object.fromEntries(INPUTS.map((k) => [k, args[k]])),
        fieldControl,
        onFocus: args.onFocus,
        onBlur: args.onBlur,
        onClear: args.onClear,
        ruleMet,
        ruleIcon: (value: string | null, index: number) =>
          'ti ' + (ruleMet(value, index) ? 'ti-circle-check' : value ? 'ti-circle-x' : 'ti-point')
      },
      template: template(args)
    };
  }
};
export default meta;
type Story = StoryObj<PasswordArgs>;
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};
export const Error: Story = {
  args: { invalid: true },
  parameters: {
    docs: {
      description: {
        story:
          'Поле ввода пароля в состоянии ошибки валидации. `invalid` не публичный `@Input()` — вычисляется автоматически из состояния привязанного `FormControl` (невалидные `Validators` + touched).'
      }
    }
  }
};
export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          'Поле ввода пароля в отключённом состоянии. `disabled` не публичный `@Input()`, отключается через форму (`disabled: true` в `FormControl`), см. `ControlValueAccessor.setDisabledState`.'
      }
    }
  }
};
export const Readonly: Story = { args: { readonly: true } };
export const FloatLabel: Story = {
  args: { floatLabel: true, label: 'FloatLabel' },
  parameters: {
    docs: {
      description: {
        story: 'Интеграция с `floatLabel` — плавающая метка внутри поля. Кликните на поле чтобы увидеть анимацию.'
      }
    }
  }
};
export const Clearable: Story = { args: { clearable: true, value: 'Password' } };
export const Fluid: Story = { args: { fluid: true } };
export const ToggleMask: Story = {
  args: { showMaskToggle: true },
  parameters: { docs: { description: { story: 'Возможность показать/скрыть введённый пароль по иконке.' } } }
};
export const Feedback: Story = {
  args: { showFeedback: true, autofocus: true },
  parameters: {
    docs: { description: { story: 'Индикатор надёжности пароля с визуальной шкалой (слабый / средний / сильный).' } }
  }
};
export const Template: Story = {
  args: { showFeedback: true, autofocus: true, templateMode: 'rules' },
  parameters: {
    docs: {
      description: {
        story: 'Кастомный контент через `ng-template`: разделитель и список требований к паролю с tabler-иконками.'
      }
    }
  }
};
export const Header: Story = {
  args: { showFeedback: true, autofocus: true, templateMode: 'header' },
  parameters: {
    docs: {
      description: {
        story: 'Шапка панели через `extraPasswordHeader` (над правилами) и подвал через `extraPasswordFooter`.'
      }
    }
  }
};
export const LabelLeft: Story = { args: { labelPosition: 'left' } };
