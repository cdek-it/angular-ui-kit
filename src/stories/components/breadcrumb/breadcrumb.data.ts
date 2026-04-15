import { MenuItem } from 'primeng/api';

export const commonHome: MenuItem = { icon: 'ti ti-home', url: '#' };

export const commonItems: MenuItem[] = [
  { label: 'Электроника', icon: 'ti ti-device-laptop', url: '#' },
  { label: 'Компьютеры', icon: 'ti ti-cpu', url: '#' },
  { label: 'Ноутбуки' },
];

export const iconOnlyItems: MenuItem[] = [
  { icon: 'ti ti-device-laptop', url: '#' },
  { icon: 'ti ti-cpu', url: '#' },
  { icon: 'ti ti-book' },
];
