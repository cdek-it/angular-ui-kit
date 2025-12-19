import { Meta, moduleMetadata } from '@storybook/angular';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

import { CheckboxBaseComponent, Base } from './examples/checkbox-base.component';
import { CheckboxGroupComponent, Group } from './examples/checkbox-group.component';

const meta: Meta = {
  title: 'PrimeNG/Checkbox',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        Checkbox,
        FormsModule,
        CheckboxBaseComponent,
        CheckboxGroupComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент Checkbox используется для выбора булевых значений или множественного выбора из списка'
      }
    }
  }
};

export default meta;

export { Base, Group };
