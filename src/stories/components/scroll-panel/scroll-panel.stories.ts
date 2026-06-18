import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraScrollPanelComponent } from '../../../lib/components/scroll-panel/scroll-panel.component';
import { ScrollPanelHorizontalComponent } from './examples/scroll-panel-horizontal.component';
import { ScrollPanelBothComponent } from './examples/scroll-panel-both.component';

const TRACKING_CONTENT = `
  <div class="p-3">
    <p class="font-semibold m-0 mb-2">Заказ №ЦД-00123456 · Москва → Новосибирск</p>
    <p class="m-0 mb-1 text-sm">14 апр, 09:15 — Принят в сортировочном центре «Москва-Север»</p>
    <p class="m-0 mb-1 text-sm">14 апр, 14:30 — Передан перевозчику CDEK</p>
    <p class="m-0 mb-1 text-sm">14 апр, 23:50 — Отправлен из Москвы</p>
    <p class="m-0 mb-1 text-sm">15 апр, 08:00 — Прибыл в сортировочный центр «Новосибирск»</p>
    <p class="m-0 mb-1 text-sm">15 апр, 12:00 — Передан курьеру Петрову А.В.</p>
    <p class="m-0 mb-1 text-sm">15 апр, 14:20 — Попытка доставки (получатель отсутствовал)</p>
    <p class="m-0 mb-1 text-sm">15 апр, 18:00 — Ожидает получения в ПВЗ на ул. Ленина, 42</p>
    <p class="m-0 mb-1 text-sm">16 апр, 10:30 — Доставлен получателю</p>
  </div>
`;

const HORIZONTAL_CONTENT = `
  <p style="white-space: nowrap; margin: 0; line-height: 1.5">
    Заказ №ЦД-00123456 · Москва → Новосибирск · Принят 14 апр 09:15 · Передан перевозчику 14 апр 14:30 · Отправлен из Москвы 14 апр 23:50 · Прибыл в Новосибирск 15 апр 08:00 · Передан курьеру Петрову А.В. 15 апр 12:00 · Доставлен получателю 15 апр 14:20
  </p>
`;

const BOTH_CONTENT = `
  <div style="width: max-content">
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Принят 14 апр 09:15 · Доставлен 15 апр 14:20</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123457 · Санкт-Петербург → Казань · 0.8 кг · 1 место · Принят 13 апр 11:00 · Доставлен 15 апр 10:30</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123458 · Екатеринбург → Краснодар · 5.2 кг · 2 места · Принят 12 апр 08:45 · В пути</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123459 · Нижний Новгород → Омск · 1.1 кг · 1 место · Принят 14 апр 15:00 · Ожидает отправки</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123460 · Самара → Ростов-на-Дону · 3.7 кг · 4 места · Принят 11 апр 13:20 · Доставлен 14 апр 09:00</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123461 · Уфа → Владивосток · 7.3 кг · 5 мест · Принят 10 апр 10:00 · Задержан на сортировке</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123462 · Пермь → Иркутск · 2.0 кг · 2 места · Принят 13 апр 09:30 · В пути</p>
    <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123463 · Воронеж → Красноярск · 4.5 кг · 3 места · Принят 12 апр 16:00 · В пути</p>
  </div>
`;

const meta: Meta<ExtraScrollPanelComponent> = {
  title: 'Components/Panel/ScrollPanel',
  component: ExtraScrollPanelComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraScrollPanelComponent,
        ScrollPanelHorizontalComponent,
        ScrollPanelBothComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Кроссбраузерная панель с кастомной полосой прокрутки. Заменяет стандартный скроллбар браузера на стилизованный в соответствии с темой.

\`\`\`typescript
import { ScrollPanelModule } from 'primeng/scrollpanel';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-scrollpanel' },
  },
  argTypes: {
    step: {
      control: 'number',
      description: 'Шаг прокрутки при нажатии клавиш со стрелками (в пикселях)',
      table: {
        category: 'Props',
        defaultValue: { summary: '10' },
        type: { summary: 'number' },
      },
    },
    height: {
      control: 'text',
      description: 'Высота области прокрутки',
      table: {
        category: 'Props',
        defaultValue: { summary: '100px' },
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      description: 'Ширина области прокрутки',
      table: {
        category: 'Props',
        defaultValue: { summary: '100%' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    step: 10,
    height: '100px',
    width: '100%',
  },
};

export default meta;
type Story = StoryObj<ExtraScrollPanelComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.height && args.height !== '100px') parts.push(`height="${args.height}"`);
    if (args.width && args.width !== '100%') parts.push(`width="${args.width}"`);
    if (args.step !== 10) parts.push(`[step]="${args.step}"`);

    const attrStr = parts.length ? `\n  ${parts.join('\n  ')}\n` : '';
    const template = `<extra-scroll-panel${attrStr}>${TRACKING_CONTENT}</extra-scroll-panel>`;

    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Stories ──────────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: (args) => ({
    props: args,
    template: `<extra-scroll-panel [step]="step" height="80px" [width]="width">${HORIZONTAL_CONTENT}</extra-scroll-panel>`,
  }),
  args: { step: 10, height: '80px', width: '100%' },
  parameters: {
    docs: {
      description: { story: 'Горизонтальная прокрутка. Контент без переносов выходит за ширину контейнера.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraScrollPanelComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-scroll-panel-horizontal',
  standalone: true,
  imports: [ExtraScrollPanelComponent],
  template: \`
    <extra-scroll-panel height="80px">
      <p style="white-space: nowrap; margin: 0; line-height: 1.5">
        Заказ №ЦД-00123456 · Москва → Новосибирск · Принят 14 апр 09:15 · Передан перевозчику 14 апр 14:30 · Отправлен из Москвы 14 апр 23:50 · Прибыл в Новосибирск 15 апр 08:00 · Доставлен получателю 15 апр 14:20
      </p>
    </extra-scroll-panel>
  \`,
})
export class ScrollPanelHorizontalComponent {}
        `,
      },
    },
  },
};

export const Both: Story = {
  render: (args) => ({
    props: args,
    template: `<extra-scroll-panel [step]="step" [height]="height" [width]="width">${BOTH_CONTENT}</extra-scroll-panel>`,
  }),
  args: { step: 10, height: '200px', width: '50%' },
  parameters: {
    docs: {
      description: { story: 'Прокрутка в обоих направлениях — таблица отправлений шире и длиннее контейнера.' },
      source: {
        language: 'ts',
        code: `

@Component({
  selector: 'app-scroll-panel-both',
  standalone: true,
  imports: [ExtraScrollPanelComponent],
  template: \`
    <extra-scroll-panel height="200px" width="50%">
      <div style="width: max-content">
        <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Принят 14 апр · Доставлен 15 апр</p>
        <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123457 · Санкт-Петербург → Казань · 0.8 кг · 1 место · Принят 13 апр · Доставлен 15 апр</p>
        <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123458 · Екатеринбург → Краснодар · 5.2 кг · 2 места · Принят 12 апр · В пути</p>
        <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123459 · Нижний Новгород → Омск · 1.1 кг · 1 место · Принят 14 апр · Ожидает отправки</p>
        <p style="white-space: nowrap; margin: 0 0 0.5rem 0">№ЦД-00123460 · Самара → Ростов-на-Дону · 3.7 кг · 4 места · Принят 11 апр · Доставлен 14 апр</p>
      </div>
    </extra-scroll-panel>
  \`,
})
export class ScrollPanelBothComponent {}
        `,
      },
    },
  },
};
