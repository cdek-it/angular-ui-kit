import { Meta, moduleMetadata } from '@storybook/angular';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';

import { AvatarBaseComponent, Base } from './examples/avatar-base.component';
import { AvatarIconComponent, Icon } from './examples/avatar-icon.component';
import { AvatarSizesComponent, Sizes } from './examples/avatar-sizes.component';
import { AvatarGroupComponent, Group } from './examples/avatar-group.component';

const meta: Meta = {
  title: 'PrimeNG/Avatar',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        Avatar,
        AvatarGroup,
        AvatarBaseComponent,
        AvatarIconComponent,
        AvatarSizesComponent,
        AvatarGroupComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: 'Компонент Avatar используется для представления пользователей с изображениями, иконками или текстом'
      }
    }
  }
};

export default meta;

export { Base, Icon, Sizes, Group };
