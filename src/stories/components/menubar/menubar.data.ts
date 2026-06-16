import { ExtraMenuItem } from '@cdek-it/angular-ui-kit/shared';

export const basicItems: ExtraMenuItem[] = [
  {
    label: 'Features'
  },
  {
    label: 'Projects',
    items: [
      { label: 'Components' },
      { label: 'Blocks' },
      { label: 'UI Kit' },
      {
        label: 'Templates',
        items: [{ label: 'Apollo' }, { label: 'Ultima' }]
      }
    ]
  },
  {
    icon: 'ti ti-user',
    label: 'Contact',
    disabled: true,
    items: [
      { label: 'Components' },
      { label: 'Blocks' },
      { label: 'UI Kit' },
      {
        label: 'Templates',
        items: [{ label: 'Apollo' }, { label: 'Ultima' }]
      }
    ]
  }
];
