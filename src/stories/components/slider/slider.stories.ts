import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SliderComponent } from '../../../lib/components/slider/slider.component';
import { SliderRangeComponent } from './examples/slider-range.component';
import { SliderStepComponent } from './examples/slider-step.component';
import { SliderVerticalComponent } from './examples/slider-vertical.component';
import { SliderDisabledComponent } from './examples/slider-disabled.component';

const meta: Meta<SliderComponent> = {
  title: 'Components/Form/Slider',
  component: SliderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SliderComponent,
        SliderRangeComponent,
        SliderStepComponent,
        SliderVerticalComponent,
        SliderDisabledComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Слайдер позволяет выбрать числовое значение или диапазон путём перемещения ползунка.

\`\`\`typescript
import { SliderModule } from 'primeng/slider';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-slider' },
  },
  argTypes: {
    min: {
      control: 'number',
      description: 'Минимальное значение',
      table: {
        category: 'Props',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    max: {
      control: 'number',
      description: 'Максимальное значение',
      table: {
        category: 'Props',
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
      },
    },
    step: {
      control: 'number',
      description: 'Шаг изменения значения',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number | undefined' },
      },
    },
    range: {
      control: 'boolean',
      description: 'Режим выбора диапазона с двумя ползунками',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Ориентация слайдера',
      table: {
        category: 'Props',
        defaultValue: { summary: 'horizontal' },
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает взаимодействие с компонентом',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      control: false,
      description: 'Событие изменения значения при перетаскивании',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<SliderChangeEvent>' },
      },
    },
    onSlideEnd: {
      control: false,
      description: 'Событие завершения перетаскивания ползунка',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<SliderSlideEndEvent>' },
      },
    },
  },
};

const commonTemplate = `
<slider
  [min]="min"
  [max]="max"
  [step]="step"
  [range]="range"
  [orientation]="orientation"
  [disabled]="disabled"
></slider>
`;

export default meta;
type Story = StoryObj<SliderComponent>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.min !== 0)                    parts.push(`[min]="${args.min}"`);
    if (args.max !== 100)                  parts.push(`[max]="${args.max}"`);
    if (args.step !== undefined)           parts.push(`[step]="${args.step}"`);
    if (args.range)                        parts.push(`[range]="true"`);
    if (args.orientation !== 'horizontal') parts.push(`orientation="${args.orientation}"`);
    if (args.disabled)                     parts.push(`[disabled]="true"`);

    const template = parts.length
      ? `<slider\n  ${parts.join('\n  ')}\n></slider>`
      : `<slider></slider>`;

    return { props: args, template };
  },
  args: {
    min: 0,
    max: 100,
    step: undefined,
    range: false,
    orientation: 'horizontal',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Range ─────────────────────────────────────────────────────────────────────

export const Range: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    min: 0,
    max: 100,
    range: true,
    orientation: 'horizontal',
    disabled: false,
  },
  parameters: {
    docs: {
      description: { story: 'Выбор диапазона значений с двумя ползунками.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-range',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <slider [min]="0" [max]="100" [range]="true" [(value)]="value"></slider>
  \`,
})
export class SliderRangeComponent {
  value: number[] = [20, 80];
}
        `,
      },
    },
  },
};

// ── Step ──────────────────────────────────────────────────────────────────────

export const Step: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    min: 0,
    max: 100,
    step: 10,
    range: false,
    orientation: 'horizontal',
    disabled: false,
  },
  parameters: {
    docs: {
      description: { story: 'Слайдер с шагом изменения значения.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-step',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <slider [min]="0" [max]="100" [step]="10" [(value)]="value"></slider>
  \`,
})
export class SliderStepComponent {
  value = 50;
}
        `,
      },
    },
  },
};

// ── Vertical ──────────────────────────────────────────────────────────────────

export const Vertical: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    min: 0,
    max: 100,
    range: false,
    orientation: 'vertical',
    disabled: false,
  },
  parameters: {
    docs: {
      description: { story: 'Слайдер с вертикальной ориентацией.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-vertical',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <div style="height: 220px">
      <slider orientation="vertical" [(value)]="value" style="height: 200px"></slider>
    </div>
  \`,
})
export class SliderVerticalComponent {
  value = 50;
}
        `,
      },
    },
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    min: 0,
    max: 100,
    range: false,
    orientation: 'horizontal',
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: 'Слайдер в отключённом состоянии.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SliderComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-slider-disabled',
  standalone: true,
  imports: [SliderComponent],
  template: \`
    <slider [value]="50" [disabled]="true"></slider>
  \`,
})
export class SliderDisabledComponent {}
        `,
      },
    },
  },
};
