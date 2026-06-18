import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ExtraInputGroupComponent } from '../../../lib/components/inputgroup/input-group.component';
import { ExtraInputGroupAddonComponent } from '../../../lib/components/inputgroup/input-group-addon.component';
import { ExtraInputTextComponent } from '../../../lib/components/inputtext/inputtext.component';
import { InputGroupWithTextComponent, WithText } from './examples/inputgroup-with-text.component';
import { Disabled, InputGroupDisabledComponent } from './examples/inputgroup-disabled.component';
import { InputGroupXlargeComponent, Sizes } from './examples/inputgroup-xlarge.component';
import { AddonRight, InputGroupAddonRightComponent } from './examples/inputgroup-addon-right.component';
import { AddonBoth, InputGroupAddonBothComponent } from './examples/inputgroup-addon-both.component';

const meta: Meta<ExtraInputGroupComponent> = {
  title: 'Components/Form/InputGroup',
  component: ExtraInputGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        ExtraInputGroupComponent,
        ExtraInputGroupAddonComponent,
        ExtraInputTextComponent,
        FormsModule,
        InputGroupWithTextComponent,
        InputGroupDisabledComponent,
        InputGroupXlargeComponent,
        InputGroupAddonRightComponent,
        InputGroupAddonBothComponent
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Группа полей ввода для объединения с аддонами (иконками или текстом).

\`\`\`typescript
import { ExtraInputGroupComponent, ExtraInputGroupAddonComponent } from '@cdek-it/angular-ui-kit';
\`\`\``
      }
    },
    designTokens: { prefix: '--p-inputgroup' }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge'],
      description: 'Размер группы (влияет на паддинги и шрифты аддонов)',
      table: {
        category: 'Props',
        defaultValue: { summary: "'base'" },
        type: { summary: "'small' | 'base' | 'large' | 'xlarge'" }
      }
    }
  },
  args: {
    size: 'base'
  }
};

export default meta;
type Story = StoryObj<ExtraInputGroupComponent>;

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const groupParts: string[] = [];
    if (args.size && args.size !== 'base') groupParts.push(`size="${args.size}"`);

    const groupOpen = groupParts.length ? `<extra-input-group ${groupParts.join(' ')}>` : `<extra-input-group>`;

    const inputSize = args.size && args.size !== 'base' ? ` size="${args.size}"` : '';

    const template = `
${groupOpen}
  <extra-input-group-addon><i class="ti ti-user"></i></extra-input-group-addon>
  <extra-input-text placeholder="Введите данные..."${inputSize} [(ngModel)]="value" [fluid]="true"></extra-input-text>
</extra-input-group>`;

    return { props: { ...args, value: '' }, template };
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример группы ввода с иконкой. Используйте Controls для изменения размера.'
      }
    }
  }
};

export { WithText, AddonRight, AddonBoth, Disabled, Sizes };
