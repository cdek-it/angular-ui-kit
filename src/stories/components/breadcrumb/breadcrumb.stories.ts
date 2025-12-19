import { Meta, moduleMetadata } from '@storybook/angular';
import { Breadcrumb } from 'primeng/breadcrumb';

import { BreadcrumbBaseComponent, Base } from './examples/breadcrumb-base.component';

const meta: Meta = {
  title: 'PrimeNG/Breadcrumb',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        Breadcrumb,
        BreadcrumbBaseComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент Breadcrumb отображает путь навигации для текущей страницы'
      }
    }
  }
};

export default meta;

export { Base };
