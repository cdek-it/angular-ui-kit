import { Meta, moduleMetadata } from '@storybook/angular';
import { Divider } from 'primeng/divider';

import { DividerBaseComponent, Base } from './examples/divider-base.component';

const meta: Meta = {
  title: 'PrimeNG/Divider',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        Divider,
        DividerBaseComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент Divider используется для разделения контента'
      }
    }
  }
};

export default meta;

export { Base };
