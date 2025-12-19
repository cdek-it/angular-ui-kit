import { Meta, moduleMetadata } from '@storybook/angular';
import { Badge } from 'primeng/badge';

import { BadgeBaseComponent, Base } from './examples/badge-base.component';
import { BadgeSizesComponent, Sizes } from './examples/badge-sizes.component';

const meta: Meta = {
  title: 'PrimeNG/Badge',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        Badge,
        BadgeBaseComponent,
        BadgeSizesComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент Badge используется для отображения числовых значений или статусов'
      }
    }
  }
};

export default meta;

export { Base, Sizes };
