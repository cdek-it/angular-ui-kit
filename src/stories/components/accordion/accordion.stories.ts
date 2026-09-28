import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  ExtraAccordionComponent,
  ExtraAccordionPanelComponent
} from '../../../lib/components/accordion/accordion.component';
import { ExtraAccordionPanelTemplateDirective } from '../../../lib/components/accordion/accordion-panel-template.directive';
import { AccordionMultipleComponent, Multiple } from './examples/accordion-multiple.component';
import { AccordionDisabledComponent, Disabled } from './examples/accordion-disabled.component';
import { AccordionSlotsComponent, Slots } from './examples/accordion-slots.component';

type AccordionArgs = ExtraAccordionComponent;

const meta: Meta<AccordionArgs> = {
  title: 'Components/Panel/Accordion',
  component: ExtraAccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraAccordionComponent,
        ExtraAccordionPanelComponent,
        ExtraAccordionPanelTemplateDirective,
        AccordionMultipleComponent,
        AccordionDisabledComponent,
        AccordionSlotsComponent
      ]
    })
  ],
  parameters: {
    designTokens: { prefix: '--p-accordion' },
    docs: {
      description: {
        component: `Группирует контент в раскрывающиеся панели. Панели передаются декларативно как дочерние \`<extra-accordion-panel>\`, заголовок — через именованный шаблон \`extraAccordionPanelTemplate="header"\`.

Реализован по спецификации \`docs/components-api/accordion.md\`.

\`\`\`typescript
import { ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    }
  },
  argTypes: {
    // ── Свойства ─────────────────────────────────────────────
    multiple: {
      control: 'boolean',
      description: 'Позволяет открывать несколько панелей одновременно',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    // Hidden internal members
    initialValue: { table: { disable: true } },
    // ── События ────────────────────────────────────────────────
    onOpen: {
      control: false,
      description: 'Срабатывает при раскрытии любой панели',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    },
    onClose: {
      control: false,
      description: 'Срабатывает при сворачивании любой панели',
      table: { category: 'События', type: { summary: 'EventEmitter<void>' } }
    }
  },
  args: {
    multiple: false
  }
};

export default meta;
type Story = StoryObj<AccordionArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const attrs = args.multiple ? ' [multiple]="true"' : '';

    const template = `
      <extra-accordion${attrs}>
        <extra-accordion-panel icon="ti ti-package" [expanded]="true">
          <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
          Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места · Отправитель: ООО «Логистика+»
        </extra-accordion-panel>
        <extra-accordion-panel icon="ti ti-map-pin">
          <ng-template extraAccordionPanelTemplate="header">Маршрут доставки</ng-template>
          Принят в Москве 14 апр 09:15 → Сортировочный центр 14 апр 14:30 → Передан перевозчику → Доставлен 15 апр
          14:20
        </extra-accordion-panel>
        <extra-accordion-panel icon="ti ti-receipt">
          <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
          Стоимость доставки: 450 ₽ · НДС: 75 ₽ · Итого: 525 ₽ · Оплачено: карта *4321
        </extra-accordion-panel>
      </extra-accordion>
    `;

    return { props: args, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для переключения `multiple`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [ExtraAccordionComponent, ExtraAccordionPanelComponent, ExtraAccordionPanelTemplateDirective],
  template: \`
    <extra-accordion>
      <extra-accordion-panel icon="ti ti-package" [expanded]="true">
        <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
        Заказ №ЦД-00123456 · Москва → Новосибирск · 2.5 кг · 3 места
      </extra-accordion-panel>
      <extra-accordion-panel icon="ti ti-map-pin">
        <ng-template extraAccordionPanelTemplate="header">Маршрут доставки</ng-template>
        Принят в Москве 14 апр 09:15 → Доставлен 15 апр 14:20
      </extra-accordion-panel>
      <extra-accordion-panel icon="ti ti-receipt">
        <ng-template extraAccordionPanelTemplate="header">Стоимость отправления</ng-template>
        Итого: 525 ₽ · Оплачено: карта *4321
      </extra-accordion-panel>
    </extra-accordion>
  \`,
})
export class AccordionDemoComponent {}
        `
      }
    }
  }
};

// ── Re-exports from example components ────────────────────────────────────
export { Multiple, Disabled, Slots };
