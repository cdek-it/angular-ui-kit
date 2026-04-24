import { Component } from '@angular/core';
import { MegaMenuComponent, MegaMenuModel } from '../../../../lib/components/megamenu/megamenu.component';

const template = `<megamenu [model]="items" orientation="vertical"></megamenu>`;

@Component({
  selector: 'app-megamenu-vertical',
  standalone: true,
  imports: [MegaMenuComponent],
  template,
})
export class MegaMenuVerticalComponent {
  items: MegaMenuModel[] = [
    {
      label: 'Products',
      icon: 'ti ti-box',
      items: [
        [
          {
            label: 'UI Components',
            items: [
              { label: 'Form', icon: 'ti ti-forms' },
              { label: 'Button', icon: 'ti ti-hand-click' },
              { label: 'Table', icon: 'ti ti-table' },
            ],
          },
        ],
        [
          {
            label: 'Charts',
            items: [
              { label: 'Bar Chart', icon: 'ti ti-chart-bar' },
              { label: 'Line Chart', icon: 'ti ti-chart-line' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Solutions',
      icon: 'ti ti-bulb',
      items: [
        [
          {
            label: 'Business',
            items: [
              { label: 'Analytics', icon: 'ti ti-chart-dots' },
              { label: 'CRM', icon: 'ti ti-users' },
            ],
          },
        ],
      ],
    },
    {
      label: 'Contact',
      icon: 'ti ti-mail',
      disabled: true,
    },
  ];
}
