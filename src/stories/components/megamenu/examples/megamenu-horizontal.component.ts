import { Component } from '@angular/core';
import { ExtraMegaMenuComponent, MegaMenuModel } from '../../../../lib/components/megamenu/megamenu.component';

const template = `<extra-megamenu [model]="items"></extra-megamenu>`;

@Component({
  selector: 'app-megamenu-horizontal',
  standalone: true,
  imports: [ExtraMegaMenuComponent],
  template
})
export class MegaMenuHorizontalComponent {
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
              { label: 'Table', icon: 'ti ti-table' }
            ]
          }
        ],
        [
          {
            label: 'Charts',
            items: [
              { label: 'Bar Chart', icon: 'ti ti-chart-bar' },
              { label: 'Line Chart', icon: 'ti ti-chart-line' }
            ]
          }
        ]
      ]
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
              { label: 'CRM', icon: 'ti ti-users' }
            ]
          }
        ]
      ]
    },
    {
      label: 'Contact',
      icon: 'ti ti-mail',
      disabled: true
    }
  ];
}
