import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';

export const basicItems: ExtraMenuItem[] = [
  {
    label: 'Отправления',
    icon: 'ti ti-package',
    items: [
      { label: 'Новые' },
      { label: 'В обработке' },
      { label: 'Доставленные' },
      {
        label: 'Возвраты',
        items: [{ label: 'Ожидают' }, { label: 'Завершённые' }],
      },
    ],
  },
  { label: 'Маршруты' },
  {
    label: 'Склады',
    items: [
      { label: 'Москва' },
      { label: 'Новосибирск' },
      { label: 'Екатеринбург' },
      {
        label: 'Регионы',
        items: [{ label: 'Урал' }, { label: 'Сибирь' }],
      },
    ],
  },
  {
    icon: 'ti ti-settings',
    label: 'Настройки',
    disabled: true,
    items: [
      { label: 'Профиль' },
      { label: 'Уведомления' },
    ],
  },
];
