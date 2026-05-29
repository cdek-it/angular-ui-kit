import { MeterItem } from 'primeng/metergroup';

export const defaultValue: MeterItem[] = [
  { label: 'Space used', color: '#34d399', value: 16 },
  { label: 'Unused', color: '#fbbf24', value: 8 },
  { label: 'System', color: '#60a5fa', value: 24 },
];

export const iconValue: MeterItem[] = [
  { label: 'Apps', color: '#34d399', value: 16, icon: 'ti ti-apps' },
  { label: 'Messages', color: '#fbbf24', value: 8, icon: 'ti ti-message' },
  { label: 'System', color: '#60a5fa', value: 24, icon: 'ti ti-cpu' },
];
