import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  ExtraCarouselComponent,
  ExtraCarouselFooterDirective,
  ExtraCarouselHeaderDirective,
  ExtraCarouselItemDirective
} from '../../../lib/components/carousel/carousel.component';
import { CarouselVerticalComponent, Vertical as VerticalStory } from './examples/carousel-vertical.component';
import { Autoplay as AutoplayStory, CarouselAutoplayComponent } from './examples/carousel-autoplay.component';
import {
  CarouselHeaderFooterComponent,
  HeaderAndFooter as HeaderAndFooterStory
} from './examples/carousel-header-footer.component';

type CarouselArgs = Pick<
  ExtraCarouselComponent,
  'numVisible' | 'numScroll' | 'circular' | 'orientation' | 'autoplayInterval' | 'showIndicators' | 'showNavigators'
>;

const SLIDES = Array.from({ length: 8 }, (_, i) => ({
  title: `Lorem Ipsum ${i + 1}`,
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, saepe.'
}));

const meta: Meta<CarouselArgs> = {
  title: 'Components/Media/Carousel',
  component: ExtraCarouselComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraCarouselComponent,
        ExtraCarouselItemDirective,
        ExtraCarouselHeaderDirective,
        ExtraCarouselFooterDirective,
        CarouselVerticalComponent,
        CarouselAutoplayComponent,
        CarouselHeaderFooterComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент для отображения контента в виде слайдов с возможностью горизонтальной и вертикальной прокрутки, настройки количества видимых элементов и автовоспроизведения.

Шаблоны (передаются между тегами компонента):
- \`extraCarouselItem\` — элемент слайда (контекст \`let-item\`)
- \`extraCarouselHeader\` — шапка карусели
- \`extraCarouselFooter\` — подвал карусели

\`\`\`typescript
import { ExtraCarouselComponent, ExtraCarouselItemDirective, ExtraCarouselHeaderDirective, ExtraCarouselFooterDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-carousel' }
  },
  argTypes: {
    numVisible: {
      control: { type: 'number', min: 1 },
      description: 'Количество видимых слайдов',
      table: {
        category: 'Props',
        defaultValue: { summary: '1' },
        type: { summary: 'number' }
      }
    },
    numScroll: {
      control: { type: 'number', min: 1 },
      description: 'Количество слайдов для прокрутки за один шаг',
      table: {
        category: 'Props',
        defaultValue: { summary: '1' },
        type: { summary: 'number' }
      }
    },
    circular: {
      control: 'boolean',
      description: 'Бесконечная прокрутка',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Ориентация карусели',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" }
      }
    },
    autoplayInterval: {
      control: { type: 'number', min: 0 },
      description: 'Интервал автопрокрутки в миллисекундах (0 — отключено)',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' }
      }
    },
    showIndicators: {
      control: 'boolean',
      description: 'Показывать индикаторы (точки)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    showNavigators: {
      control: 'boolean',
      description: 'Показывать кнопки навигации',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    }
  },
  args: {
    numVisible: 5,
    numScroll: 1,
    circular: false,
    orientation: 'horizontal',
    autoplayInterval: 0,
    showIndicators: true,
    showNavigators: true
  }
};

export default meta;
type Story = StoryObj<CarouselArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: { ...args, slides: SLIDES },
    template: `
      <extra-carousel
        [value]="slides"
        [numVisible]="numVisible"
        [numScroll]="numScroll"
        [circular]="circular"
        [orientation]="orientation"
        [autoplayInterval]="autoplayInterval"
        [showIndicators]="showIndicators"
        [showNavigators]="showNavigators"
      >
        <ng-template extraCarouselItem let-item>
          <div class="flex flex-col gap-3 px-3 py-3 border rounded min-w-0 overflow-hidden">
            <span class="font-bold truncate">{{ item.title }}</span>
            <span>{{ item.subtitle }}</span>
          </div>
        </ng-template>
      </extra-carousel>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.'
      }
    }
  }
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = VerticalStory;

// ── Autoplay ──────────────────────────────────────────────────────────────────

export const Autoplay: Story = AutoplayStory;

// ── Header & Footer ───────────────────────────────────────────────────────────

export const HeaderAndFooter: Story = HeaderAndFooterStory;
