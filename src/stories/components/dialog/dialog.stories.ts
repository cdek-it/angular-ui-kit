import { Meta, moduleMetadata } from '@storybook/angular';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

import { DialogBaseComponent, Base } from './examples/dialog-base.component';

const meta: Meta = {
  title: 'PrimeNG/Dialog',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        Dialog,
        Button,
        DialogBaseComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент Dialog отображает контент в модальном окне поверх страницы'
      }
    }
  }
};

export default meta;

export { Base };
