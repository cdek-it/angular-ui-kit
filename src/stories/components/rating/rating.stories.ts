import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraRatingComponent } from '../../../lib/components/rating/rating.component';
import { RatingReadonlyComponent, ReadOnly } from './examples/rating-readonly.component';
import { Disabled, RatingDisabledComponent } from './examples/rating-disabled.component';
import { Clearable, RatingClearableComponent } from './examples/rating-clearable.component';

type RatingArgs = ExtraRatingComponent;

const meta: Meta<RatingArgs> = {
  title: 'Components/Form/Rating',
  component: ExtraRatingComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraRatingComponent,
        FormsModule,
        RatingReadonlyComponent,
        RatingDisabledComponent,
        RatingClearableComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-rating' },
    docs: {
      description: {
        component: `Компонент для отображения и выбора оценки в виде звёзд.

\`\`\`typescript
import { ExtraRatingComponent } from '@cdek-it/angular-ui-kit/components/rating';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства ────────────────────────────────────────────────
    stars: {
      control: 'number',
      description: 'Количество отображаемых звёзд',
      table: {
        category: 'Свойства',
        defaultValue: { summary: '5' },
        type: { summary: 'number' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Режим только для чтения — значение нельзя изменить',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Показывать кнопку сброса оценки слева от звёзд',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    autofocus: { table: { disable: true } },
    clearAriaLabel: { table: { disable: true } },

    // ── События ───────────────────────────────────────────────
    onRate: {
      control: false,
      description: 'Событие изменения оценки',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<ExtraRatingRateEvent>' }
      }
    },
    onClear: {
      control: false,
      description: 'Событие сброса оценки кнопкой (clearable)',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<void>' }
      }
    },
    onFocus: {
      control: false,
      description: 'Событие фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    },
    onBlur: {
      control: false,
      description: 'Событие потери фокуса',
      table: {
        category: 'События',
        type: { summary: 'EventEmitter<FocusEvent>' }
      }
    }
  },
  args: {
    stars: 5,
    readonly: false,
    clearable: false
  }
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
    if (args.clearable) parts.push(`[clearable]="true"`);

    const template = `<extra-rating\n  ${parts.join('\n  ')}\n></extra-rating>`;
    return { props: { ...args, value: 3 }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { ReadOnly, Disabled, Clearable };
