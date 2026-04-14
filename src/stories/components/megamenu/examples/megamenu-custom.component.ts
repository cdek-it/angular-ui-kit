import { Component } from '@angular/core';
import { MegaMenuComponent, MegaMenuModel } from '../../../../lib/components/megamenu/megamenu.component';

const template = `<megamenu [model]="items"></megamenu>`;

@Component({
  selector: 'app-megamenu-custom',
  standalone: true,
  imports: [MegaMenuComponent],
  template,
})
export class MegaMenuCustomComponent {
  items: MegaMenuModel[] = [
    {
      label: 'Products',
      icon: 'ti ti-box',
      items: [
        [
          {
            label: 'Components',
            items: [
              {
                label: 'Form',
                description: 'Input, Select, Checkbox',
                icon: 'ti ti-forms',
                badge: 'New',
              } as any,
              {
                label: 'Button',
                description: 'Actions and triggers',
                icon: 'ti ti-hand-click',
              } as any,
            ],
          },
        ],
        [
          {
            label: 'Charts',
            items: [
              {
                label: 'Bar Chart',
                description: 'Categorical comparison',
                icon: 'ti ti-chart-bar',
              } as any,
              {
                label: 'Line Chart',
                description: 'Trends over time',
                icon: 'ti ti-chart-line',
                badge: 'Beta',
              } as any,
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
              {
                label: 'Analytics',
                description: 'Reports and dashboards',
                icon: 'ti ti-chart-dots',
              } as any,
              {
                label: 'CRM',
                description: 'Customer management',
                icon: 'ti ti-users',
                badge: 'Pro',
              } as any,
            ],
          },
        ],
      ],
    },
  ];
}
