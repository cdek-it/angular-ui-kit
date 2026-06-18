import { StoryObj } from '@storybook/angular';

export { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

export const Extra: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
<extra-button
  [label]="label"
  [variant]="variant"
  [severity]="severity"
  [size]="size"
  [rounded]="rounded"
  [iconPos]="iconPos"
  [iconOnly]="iconOnly"
  [icon]="icon"
  [disabled]="disabled"
  [loading]="loading"
  [badge]="badge"
  [badgeSeverity]="badgeSeverity"
  [showBadge]="showBadge"
  [fluid]="fluid"
  [ariaLabel]="ariaLabel"
  [autofocus]="autofocus"
  [tabindex]="tabindex"
  [text]="text"
></extra-button>`
  }),
  args: {
    label: 'Button',
    showBadge: false,
    fluid: false,
    autofocus: false,
    text: false
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text', 'link']
    },
    severity: {
      control: 'select',
      options: [null, 'success', 'warning', 'danger', 'info']
    },
    size: {
      control: 'select',
      options: ['small', 'base', 'large', 'xlarge']
    },
    rounded: { control: 'boolean' },
    iconPos: {
      control: 'select',
      options: [null, 'prefix', 'postfix']
    },
    iconOnly: { control: 'boolean' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    badge: { control: 'text' },
    badgeSeverity: {
      control: 'select',
      options: [null, 'success', 'warning', 'danger', 'info', 'secondary', 'contrast']
    },
    showBadge: { control: 'boolean' },
    fluid: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    autofocus: { control: 'boolean' },
    tabindex: { control: 'number' },
    text: { control: 'boolean' }
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивный пример с пропсами, соответствующими Figma-компоненту Button.'
      }
    }
  }
};

export const Badge: StoryObj = {
  render: (args) => ({
    props: args,
    template: `
<extra-button
  [label]="label"
  [badge]="badge"
  [badgeSeverity]="badgeSeverity"
  [showBadge]="showBadge"
  [severity]="severity"
></extra-button>`
  }),
  args: {
    label: 'Emails',
    badge: '8',
    badgeSeverity: 'danger',
    showBadge: true,
    severity: 'success'
  },
  parameters: {
    docs: {
      description: {
        story: 'Пример кнопки с бейджем для отображения уведомлений или счётчиков.'
      }
    }
  }
};
