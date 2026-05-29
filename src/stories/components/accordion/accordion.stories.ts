import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ExtraAccordionComponent, ExtraAccordionItem } from '../../../lib/components/accordion/accordion.component';
import { AccordionMultipleComponent, Multiple } from './examples/accordion-multiple.component';
import { AccordionDisabledComponent, Disabled } from './examples/accordion-disabled.component';

const defaultItems: ExtraAccordionItem[] = [
  {
    value: '0',
    header: 'Данные отправления',
    icon: 'ti ti-package',
    content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»',
  },
  {
    value: '1',
    header: 'Маршрут доставки',
    icon: 'ti ti-map-pin',
    content: 'Принят в Москве 14 апр 09:15 → Сортировочный центр 14 апр 14:30 → Передан перевозчику → Прибыл в Новосибирск 15 апр 08:00 → Доставлен 15 апр 14:20',
  },
  {
    value: '2',
    header: 'Стоимость отправления',
    icon: 'ti ti-receipt',
    content: 'Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321',
  },
];

const meta: Meta<ExtraAccordionComponent> = {
  title: 'Components/Panel/Accordion',
  component: ExtraAccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraAccordionComponent,
        AccordionMultipleComponent,
        AccordionDisabledComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Группирует контент в раскрывающиеся панели. Поддерживает одиночное и множественное раскрытие.

\`\`\`typescript
import { AccordionModule } from 'primeng/accordion';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-accordion' },
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Позволяет открывать несколько панелей одновременно',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    activeValue: {
      control: 'text',
      description: 'Значение активной панели (value из ExtraAccordionItem)',
      table: {
        category: 'Props',
        defaultValue: { summary: "'0'" },
        type: { summary: 'string | null' },
      },
    },
    items: {
      table: { disable: true },
    },
    activeValueChange: {
      control: false,
      description: 'Событие смены активной панели',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<string | null>' },
      },
    },
  },
  args: {
    items: defaultItems,
    multiple: false,
    activeValue: '0',
  },
};

export default meta;
type Story = StoryObj<ExtraAccordionComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = ['[items]="items"'];

    if (args.multiple) parts.push(`[multiple]="true"`);
    if (args.activeValue && args.activeValue !== '0') parts.push(`activeValue="${args.activeValue}"`);

    const template = `<extra-accordion\n  ${parts.join('\n  ')}\n></extra-accordion>`;

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

export { Multiple, Disabled };
