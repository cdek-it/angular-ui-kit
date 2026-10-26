import { ExtraBreadcrumbItem } from '../../../lib/components/breadcrumb/breadcrumb.component';

export const commonItems: ExtraBreadcrumbItem[] = [
  { label: 'Заказы', icon: 'ti ti-package', href: '#' },
  { label: 'Документы', icon: 'ti ti-file-text', href: '#' },
  { label: 'Накладная', icon: 'ti ti-file-invoice' }
];

export const disabledItems: ExtraBreadcrumbItem[] = [
  { label: 'Заказы', icon: 'ti ti-package', href: '#' },
  { label: 'Архив', icon: 'ti ti-archive', disabled: true },
  { label: 'Накладная', icon: 'ti ti-file-invoice' }
];
