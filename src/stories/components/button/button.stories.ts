import { Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { ButtonBaseComponent, Default } from './examples/button-base.component';
import { ButtonSizesComponent, Sizes } from './examples/button-sizes.component';
import { ButtonRoundedComponent, Rounded } from './examples/button-rounded.component';
import { ButtonTextComponent, Text } from './examples/button-text.component';
import { ButtonLinkComponent, Link } from './examples/button-link.component';
import { ButtonIconComponent, Icons } from './examples/button-icon.component';
import { ButtonIconOnlyComponent, IconOnly } from './examples/button-icon-only.component';
import { ButtonDisabledComponent, Disabled } from './examples/button-disabled.component';
import { ButtonLoadingComponent, Loading } from './examples/button-loading.component';
import { ButtonBadgeComponent, Badge } from './examples/button-badge.component';
import { ButtonSeverityComponent, Severity } from './examples/button-severity.component';

const meta: Meta = {
  title: 'PrimeNG/Button',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ButtonModule,
        BadgeModule,
        OverlayBadgeModule,
        ButtonBaseComponent,
        ButtonSizesComponent,
        ButtonRoundedComponent,
        ButtonTextComponent,
        ButtonLinkComponent,
        ButtonIconComponent,
        ButtonIconOnlyComponent,
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
        component: 'Кнопка — базовый интерактивный элемент. [PrimeNG Button](https://primeng.org/button), [Figma Design](https://www.figma.com/design/HOLKdvQJ8jCLeX17s9d0Yf/UI-Kit--DS--v2.0?node-id=160-5223)'
      }
    }
  }
};
export default meta;

export { Default, Sizes, Icons, IconOnly, Severity, Text, Link, Rounded, Disabled, Loading, Badge };
