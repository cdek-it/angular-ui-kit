import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../../lib/components/rating/rating.component';
import { RatingReadonlyComponent, ReadOnly } from './examples/rating-readonly.component';
import { RatingDisabledComponent, Disabled } from './examples/rating-disabled.component';

type RatingArgs = RatingComponent;

const meta: Meta<RatingArgs> = {
  title: 'Prime/Form/Rating',
  component: RatingComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RatingComponent,
        FormsModule,
        RatingReadonlyComponent,
        RatingDisabledComponent,
      ],
    }),
  ],
  parameters: {
    designTokens: { prefix: '--p-rating' },
    docs: {
      description: {
        component: `Компонент для отображения и выбора оценки в виде звёзд.`,
      },
    },
  },
  argTypes: {
    // ── Props ────────────────────────────────────────────────
    stars: {
      control: 'number',
      description: 'Количество отображаемых звёзд',
      table: {
        category: 'Props',
        defaultValue: { summary: '5' },
        type: { summary: 'number' },
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения — значение нельзя изменить',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность взаимодействия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    autofocus: { table: { disable: true } },

    // ── Events ───────────────────────────────────────────────
    onRate: {
      control: false,
      description: 'Событие изменения оценки',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<RatingRateEvent>' },
      },
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' },
      },
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<FocusEvent>' },
      },
    },
  },
  args: {
    stars: 5,
    readonly: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<RatingArgs>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [`[(ngModel)]="value"`];
    if (args.stars !== 5) parts.push(`[stars]="${args.stars}"`);
    if (args.readonly) parts.push(`[readonly]="true"`);
    if (args.disabled) parts.push(`[disabled]="true"`);

    const template = `<rating\n  ${parts.join('\n  ')}\n></rating>`;
    return { props: { ...args, value: 3 }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Re-exports from example components ────────────────────────────────────
export { ReadOnly, Disabled };
