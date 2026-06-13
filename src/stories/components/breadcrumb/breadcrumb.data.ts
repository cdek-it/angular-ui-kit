import { ExtraMenuItem } from '../../../lib/shared';

export const commonHome: ExtraMenuItem = { icon: 'ti ti-home', url: '#' };

export const commonItems: ExtraMenuItem[] = [
  { label: 'Электроника', icon: 'ti ti-device-laptop', url: '#' },
  { label: 'Компьютеры', icon: 'ti ti-cpu', url: '#' },
  { label: 'Ноутбуки' }
];

export const iconOnlyItems: ExtraMenuItem[] = [
  { icon: 'ti ti-device-laptop', url: '#' },
  { icon: 'ti ti-cpu', url: '#' },
  { icon: 'ti ti-book' }
];
