import { ExtraMegaMenuItem } from '../../../lib/components/megamenu/megamenu.component';

export const commonItems: ExtraMegaMenuItem[] = [
  {
    label: 'Отправления',
    icon: 'ti ti-package',
    items: [
      [
        {
          label: 'Отправления',
          items: [
            { label: 'Создать', icon: 'ti ti-file-plus' },
            { label: 'Найти по трек-номеру', icon: 'ti ti-search' }
          ]
        }
      ],
      [
        {
          label: 'Доставка',
          items: [
            { label: 'Курьером', icon: 'ti ti-truck' },
            { label: 'В пункт выдачи', icon: 'ti ti-map-pin' }
          ]
        }
      ]
    ]
  },
  {
    label: 'Тарифы',
    icon: 'ti ti-calculator',
    items: [
      [
        {
          label: 'Тарифы',
          items: [
            { label: 'Калькулятор', icon: 'ti ti-calculator' },
            { label: 'Склады', icon: 'ti ti-building-warehouse' }
          ]
        }
      ]
    ]
  },
  { label: 'Поддержка', icon: 'ti ti-headset', href: '#' }
];

export const captionItems: ExtraMegaMenuItem[] = [
  {
    label: 'Документы',
    icon: 'ti ti-file-text',
    items: [
      [
        {
          label: 'Документы',
          items: [
            { label: 'Накладные', caption: 'Ctrl+N', icon: 'ti ti-file-invoice', selected: true },
            { label: 'Счета', caption: 'За текущий месяц', icon: 'ti ti-receipt' },
            { separator: true },
            { label: 'Шаблоны', icon: 'ti ti-file-text', iconEnd: 'ti ti-external-link', href: '#', target: '_blank' }
          ]
        }
      ]
    ]
  },
  { separator: true },
  { label: 'Настройки', icon: 'ti ti-settings', href: '#' }
];
