import { Meta, moduleMetadata } from '@storybook/angular';

import { ButtonModule } from 'primeng/button';

import { ButtonBaseComponent, Base } from './examples/button-base.component';
import { ButtonSizesComponent, Sizes } from './examples/button-sizes.component';
import { ButtonRoundedComponent, Rounded } from './examples/button-rounded.component';
import { ButtonOutlinedComponent, Outlined } from './examples/button-outlined.component';
import { ButtonTextComponent, Text } from './examples/button-text.component';
import { ButtonIconComponent, Icon } from './examples/button-icon.component';
import { ButtonDisabledComponent, Disabled } from './examples/button-disabled.component';
import { ButtonLoadingComponent, Loading } from './examples/button-loading.component';
import { ButtonBadgeComponent, Badge } from './examples/button-badge.component';
import { ButtonSeverityComponent, Severity } from './examples/button-severity.component';

const meta: Meta = {
  title: 'PrimeNG/Button',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ButtonModule,
        ButtonBaseComponent,
        ButtonSizesComponent,
        ButtonRoundedComponent,
        ButtonOutlinedComponent,
        ButtonTextComponent,
        ButtonIconComponent,
        ButtonDisabledComponent,
        ButtonLoadingComponent,
        ButtonBadgeComponent,
        ButtonSeverityComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент кнопки с различными стилями, состояниями и иконками'
      }
    }
  }
};
export default meta;

export { Base, Disabled, Loading, Sizes, Rounded, Outlined, Text, Icon, Badge, Severity };
