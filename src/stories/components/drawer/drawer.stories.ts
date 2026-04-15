import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DrawerComponent } from '../../../lib/components/drawer/drawer.component';
import { ButtonComponent } from '../../../lib/components/button/button.component';
import { DrawerSizesComponent, Sizes as SizesStory } from './examples/drawer-sizes.component';
import { DrawerPositionComponent, Position as PositionStory } from './examples/drawer-position.component';
import { DrawerWithFooterComponent, WithFooter as WithFooterStory } from './examples/drawer-with-footer.component';
import { DrawerFullScreenComponent, FullScreen as FullScreenStory } from './examples/drawer-full-screen.component';
import { DrawerWithoutModalComponent, WithoutModal as WithoutModalStory } from './examples/drawer-without-modal.component';

type DrawerArgs = DrawerComponent & { visible: boolean };

const meta: Meta<DrawerArgs> = {
  title: 'Components/Overlay/Drawer',
  component: DrawerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        DrawerComponent,
        ButtonComponent,
        DrawerSizesComponent,
        DrawerPositionComponent,
        DrawerWithFooterComponent,
        DrawerFullScreenComponent,
        DrawerWithoutModalComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Drawer — панель, отображаемая как оверлей у края экрана.

\`\`\`typescript
import { DrawerComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-drawer' },
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Видимость drawer (two-way binding)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    header: {
      control: 'text',
      description: 'Заголовок drawer',
      table: {
        category: 'Props',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string' },
      },
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Позиция drawer',
      table: {
        category: 'Props',
        defaultValue: { summary: 'right' },
        type: { summary: "'left' | 'right' | 'top' | 'bottom'" },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xlg'],
      description: 'Размер drawer',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'default' | 'sm' | 'lg' | 'xlg'" },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Показывать модальный оверлей',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    fullScreen: {
      control: 'boolean',
      description: 'Полноэкранный режим',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Закрытие по клику на оверлей',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showCloseIcon: {
      control: 'boolean',
      description: 'Показывать кнопку закрытия',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Закрытие по Escape',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    blockScroll: {
      control: 'boolean',
      description: 'Блокировка прокрутки страницы',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DrawerArgs>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: { ...args, visible: false },
    template: `
      <button label="Open Drawer" (click)="visible = true"></button>
      <drawer
        [(visible)]="visible"
        [header]="header"
        [position]="position"
        [size]="size"
        [modal]="modal"
        [fullScreen]="fullScreen"
        [dismissible]="dismissible"
        [showCloseIcon]="showCloseIcon"
        [closeOnEscape]="closeOnEscape"
        [blockScroll]="blockScroll"
      >
        <p>Drawer content.</p>
      </drawer>
    `,
  }),
  args: {
    header: 'Drawer',
    position: 'right',
    size: 'default',
    modal: true,
    fullScreen: false,
    dismissible: true,
    showCloseIcon: true,
    closeOnEscape: true,
    blockScroll: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = SizesStory;

// ── Position ──────────────────────────────────────────────────────────────────

export const Position: Story = PositionStory;

// ── WithFooter ────────────────────────────────────────────────────────────────

export const WithFooter: Story = WithFooterStory;

// ── FullScreen ────────────────────────────────────────────────────────────────

export const FullScreen: Story = FullScreenStory;

// ── WithoutModal ──────────────────────────────────────────────────────────────

export const WithoutModal: Story = WithoutModalStory;
