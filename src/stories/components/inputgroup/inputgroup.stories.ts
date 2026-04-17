import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from '../../../lib/components/inputgroup/input-group.component';
import { InputGroupAddonComponent } from '../../../lib/components/inputgroup/input-group-addon.component';
import { InputTextComponent } from '../../../lib/components/inputtext/inputtext.component';
import { InputGroupWithTextComponent, WithText } from './examples/inputgroup-with-text.component';
import { InputGroupDisabledComponent, Disabled } from './examples/inputgroup-disabled.component';
import { InputGroupXlargeComponent, XLarge } from './examples/inputgroup-xlarge.component';
import { InputGroupAddonRightComponent, AddonRight } from './examples/inputgroup-addon-right.component';
import { InputGroupAddonBothComponent, AddonBoth } from './examples/inputgroup-addon-both.component';

const meta: Meta<InputGroupComponent> = {
  title: 'Components/Form/InputGroup',
  component: InputGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        InputGroupComponent,
        InputGroupAddonComponent,
        InputTextComponent,
        FormsModule,
        InputGroupWithTextComponent,
        InputGroupDisabledComponent,
        InputGroupXlargeComponent,
        InputGroupAddonRightComponent,
        InputGroupAddonBothComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Группа полей ввода для объединения с аддонами (иконками или текстом).

\`\`\`typescript
import { InputGroupComponent, InputGroupAddonComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-inputgroup' },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер группы (влияет на паддинги и шрифты аддонов)',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" },
      },
    },
  },
  args: {
    size: 'base',
  },
};

export default meta;
type Story = StoryObj<InputGroupComponent>;

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const groupParts: string[] = [];
    if (args.size && args.size !== 'base') groupParts.push(`size="${args.size}"`);

    const groupOpen = groupParts.length
      ? `<input-group ${groupParts.join(' ')}>`
      : `<input-group>`;

    const inputSize = args.size && args.size !== 'base' ? ` size="${args.size}"` : '';

    const template = `
${groupOpen}
  <input-group-addon><i class="ti ti-user"></i></input-group-addon>
  <input-text placeholder="Введите данные..."${inputSize} [(ngModel)]="value" [fluid]="true"></input-text>
</input-group>`;

    return { props: { ...args, value: '' }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример группы ввода с иконкой. Используйте Controls для изменения размера.',
      },
    },
  },
};

export { WithText, AddonRight, AddonBoth, Disabled, XLarge };
