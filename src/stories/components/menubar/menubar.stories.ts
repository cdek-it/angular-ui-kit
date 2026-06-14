import { Meta, moduleMetadata } from '@storybook/angular';
import { ExtraMenubarComponent } from '../../../lib/components/menubar/menubar.component';
import { Basic, MenubarBasicComponent } from './examples/menubar-basic.component';
import { MenubarWithIconComponent, WithIcon } from './examples/menubar-with-icon.component';
import { Custom, MenubarCustomComponent } from './examples/menubar-custom.component';

const meta: Meta<ExtraMenubarComponent> = {
  title: 'Components/Menu/Menubar',
  component: ExtraMenubarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ExtraMenubarComponent, MenubarBasicComponent, MenubarWithIconComponent, MenubarCustomComponent]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Горизонтальная навигационная панель с поддержкой вложенных выпадающих подменю.

Шаблон (передаётся между тегами компонента):
- \`extraMenubarItem\` — кастомный рендер пункта меню (контекст \`let-item\`, \`let-hasSubmenu="hasSubmenu"\`)

\`\`\`typescript
import { ExtraMenubarComponent, ExtraMenubarItemDirective } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-menubar' },
    controls: { disable: true }
  }
};

export default meta;

export { Basic, WithIcon, Custom };
