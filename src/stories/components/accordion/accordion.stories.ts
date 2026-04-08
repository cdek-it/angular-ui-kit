import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AccordionComponent, AccordionItem } from '../../../lib/components/accordion/accordion.component';
import { AccordionMultipleComponent } from './examples/accordion-multiple.component';
import { AccordionDisabledComponent } from './examples/accordion-disabled.component';

const defaultItems: AccordionItem[] = [
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

const commonTemplate = `
<accordion
  [items]="items"
  [multiple]="multiple"
  [activeValue]="activeValue"
></accordion>
`;

const meta: Meta<AccordionComponent> = {
  title: 'Components/Panel/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        AccordionComponent,
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
      description: 'Значение активной панели (value из AccordionItem)',
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
type Story = StoryObj<AccordionComponent>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = ['[items]="items"'];

    if (args.multiple) parts.push(`[multiple]="true"`);
    if (args.activeValue && args.activeValue !== '0') parts.push(`activeValue="${args.activeValue}"`);

    const template = `<accordion\n  ${parts.join('\n  ')}\n></accordion>`;

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

export const Multiple: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: { multiple: true, activeValue: '0' },
  parameters: {
    docs: {
      description: { story: 'Режим множественного раскрытия — несколько панелей могут быть открыты одновременно.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { AccordionComponent, AccordionItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-multiple',
  standalone: true,
  imports: [AccordionComponent],
  template: \`
    <accordion [items]="items" [multiple]="true" activeValue="0"></accordion>
  \`,
})
export class AccordionMultipleComponent {
  items: AccordionItem[] = [
    {
      value: '0',
      header: 'Данные отправления',
      icon: 'ti ti-package',
      content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места',
    },
    {
      value: '1',
      header: 'Маршрут доставки',
      icon: 'ti ti-map-pin',
      content: 'Принят в Москве 14 апр 09:15 → Доставлен 15 апр 14:20',
    },
    {
      value: '2',
      header: 'Стоимость отправления',
      icon: 'ti ti-receipt',
      content: 'Итого: 525 ₽ · Оплачено: карта *4321',
    },
  ];
}
        `,
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => ({ props: args, template: commonTemplate }),
  args: {
    items: [
      {
        value: '0',
        header: 'Данные отправления',
        icon: 'ti ti-package',
        content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»',
      },
      {
        value: '1',
        header: 'Документы (недоступно)',
        icon: 'ti ti-file-description',
        content: 'Документация по отправлению временно недоступна.',
        disabled: true,
      },
      {
        value: '2',
        header: 'Стоимость отправления',
        icon: 'ti ti-receipt',
        content: 'Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321',
      },
    ],
    multiple: false,
    activeValue: '0',
  },
  parameters: {
    docs: {
      description: { story: 'Заблокированная панель — элемент недоступен для взаимодействия.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { AccordionComponent, AccordionItem } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-disabled',
  standalone: true,
  imports: [AccordionComponent],
  template: \`
    <accordion [items]="items" activeValue="0"></accordion>
  \`,
})
export class AccordionDisabledComponent {
  items: AccordionItem[] = [
    {
      value: '0',
      header: 'Данные отправления',
      icon: 'ti ti-package',
      content: 'Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места',
    },
    {
      value: '1',
      header: 'Документы (недоступно)',
      icon: 'ti ti-file-description',
      content: 'Документация по отправлению временно недоступна.',
      disabled: true,
    },
    {
      value: '2',
      header: 'Стоимость отправления',
      icon: 'ti ti-receipt',
      content: 'Итого: 525 ₽ · Оплачено: карта *4321',
    },
  ];
}
        `,
      },
    },
  },
};
