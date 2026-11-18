import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fn } from 'storybook/test';
import { ExtraRatingComponent, ExtraRatingRateEvent } from '../../../lib/components/rating/rating.component';

type RatingArgs = Omit<Partial<ExtraRatingComponent>, 'onRate' | 'onClear' | 'onFocus' | 'onBlur'> & {
  disabled: boolean;
  value: number | null;
  onRate: (event: ExtraRatingRateEvent) => void;
  onClear: () => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
};
const escapeAttribute = (value: unknown): string =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');
const templateFor = (args: RatingArgs): string => {
  const parts = ['[formControl]="fieldControl"', '[stars]="' + args.stars + '"'];
  for (const name of ['readonly', 'clearable', 'autofocus', 'showLabels'] as const)
    parts.push('[' + name + ']="' + !!args[name] + '"');
  for (const name of [
    'size',
    'variant',
    'clearAriaLabel',
    'labelMin',
    'labelMax',
    'ariaLabel',
    'ariaLabelledBy'
  ] as const) {
    if (args[name] != null) parts.push(name + '="' + escapeAttribute(args[name]) + '"');
  }
  parts.push(
    '(onRate)="onRate($event)"',
    '(onClear)="onClear()"',
    '(onFocus)="onFocus($event)"',
    '(onBlur)="onBlur($event)"'
  );
  return '<extra-rating\n  ' + parts.join('\n  ') + '\n></extra-rating>';
};
const meta: Meta<RatingArgs> = {
  title: 'Components/Form/Rating',
  component: ExtraRatingComponent,
  tags: ['autodocs', 'rating'],
  decorators: [moduleMetadata({ imports: [ExtraRatingComponent, ReactiveFormsModule] })],
  parameters: {
    controls: { expanded: true },
    designTokens: { prefix: '--p-rating' },
    docs: {
      description: {
        component: `Компонент для отображения и выбора оценки в виде звёзд.

\`\`\`typescript
import { ExtraRatingComponent } from '@cdek-it/angular-ui-kit/components/rating';
\`\`\``
      },
      source: {
        language: 'html',
        type: 'code',
        transform: (_code: string, context: { args: RatingArgs }) => templateFor(context.args)
      }
    }
  },
  render: (args) => ({
    props: { ...args, fieldControl: new FormControl<number | null>({ value: args.value, disabled: args.disabled }) },
    template: templateFor(args)
  }),
  argTypes: {
    stars: { control: 'number', description: 'Количество отображаемых звёзд' },
    readonly: { control: 'boolean', description: 'Режим только для чтения — значение нельзя изменить' },
    clearable: { control: 'boolean', description: 'Показывать кнопку сброса оценки слева от звёзд' },
    autofocus: { control: 'boolean', description: 'Ставит фокус на рейтинг после первого рендера' },
    clearAriaLabel: { control: 'text', description: 'Текст для скринридеров у кнопки очистки' },
    size: { control: 'select', options: ['small', 'base', 'large'], description: 'Размер звёзд: small, base, large' },
    variant: { control: 'select', options: ['display', 'interactive'], description: 'Вариант отображения рейтинга' },
    showLabels: { control: 'boolean', description: 'Показывать текстовые подписи под звёздами' },
    labelMin: { control: 'text', description: 'Подпись минимальной оценки' },
    labelMax: { control: 'text', description: 'Подпись максимальной оценки' },
    ariaLabel: { control: 'text', description: 'Текст для скринридеров, если нет видимой подписи' },
    ariaLabelledBy: { control: 'text', description: 'id элемента, текст которого подписывает рейтинг' },
    disabled: { control: 'boolean', description: 'Отключённое состояние' },
    value: { control: 'number', description: 'Текущая оценка' },
    onRate: { control: false, description: 'Событие изменения оценки' },
    onClear: { control: false, description: 'Событие сброса оценки кнопкой (clearable)' },
    onFocus: { control: false, description: 'Событие фокуса' },
    onBlur: { control: false, description: 'Событие потери фокуса' }
  },
  args: {
    stars: 5,
    readonly: false,
    clearable: false,
    autofocus: false,
    clearAriaLabel: 'Сбросить оценку',
    size: 'small',
    variant: 'display',
    showLabels: false,
    labelMin: 'Неудобно',
    labelMax: 'Очень удобно',
    ariaLabel: 'Оценка',
    ariaLabelledBy: undefined,
    disabled: false,
    value: 3,
    onRate: fn(),
    onClear: fn(),
    onFocus: fn(),
    onBlur: fn()
  }
};
export default meta;
type Story = StoryObj<RatingArgs>;
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: { story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.' }
    }
  }
};
export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          'Заблокированное состояние — компонент недоступен для взаимодействия. `disabled` не публичный `@Input()`, отключается через форму (`disabled: true` в `FormControl`), см. `ControlValueAccessor.setDisabledState`.'
      }
    }
  }
};
export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: { description: { story: 'Режим только для чтения — значение отображается, но не может быть изменено.' } }
  }
};
export const Interactive: Story = { args: { variant: 'interactive' } };
export const Clearable: Story = {
  args: { clearable: true, variant: 'interactive' },
  parameters: {
    docs: {
      description: { story: 'Кнопка сброса оценки (`clearable`) слева от звёзд — сбрасывает значение в `null`.' }
    }
  }
};
export const ShowLabels: Story = { args: { showLabels: true } };
