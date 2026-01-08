import { Meta, moduleMetadata } from '@storybook/angular';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

import { ConfirmDialogBaseComponent, Base } from './examples/confirmdialog-base.component';

const meta: Meta = {
  title: 'PrimeNG/ConfirmDialog',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ConfirmDialog,
        Button,
        ConfirmDialogBaseComponent
      ],
      providers: [ConfirmationService]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент ConfirmDialog используется для подтверждения действий пользователя'
      }
    }
  }
};

export default meta;

export { Base };
