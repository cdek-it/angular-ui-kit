import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SharedModule } from 'primeng/api';
import { CardComponent } from '../../../lib/components/card/card.component';
import { ButtonComponent } from '../../../lib/components/button/button.component';
import { CardOverlayComponent } from './examples/card-overlay.component';
import { CardWithoutHeaderComponent } from './examples/card-without-header.component';
import { CardWithoutFooterComponent } from './examples/card-without-footer.component';
import { CardWithoutSubtitleComponent } from './examples/card-without-subtitle.component';

type CardArgs = CardComponent;

const meta: Meta<CardArgs> = {
  title: 'Components/Panel/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CardComponent,
        ButtonComponent,
        SharedModule,
        CardOverlayComponent,
        CardWithoutHeaderComponent,
        CardWithoutFooterComponent,
        CardWithoutSubtitleComponent,
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: `Гибкий контейнер для группировки контента с заголовком, подзаголовком, основным содержимым и действиями.

\`\`\`typescript
import { CardModule } from 'primeng/card';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-card' },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок карточки',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Подзаголовок карточки',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    overlay: {
      control: 'boolean',
      description: 'Тень вокруг карточки (shadow-md)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<CardArgs>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => {
    const parts: string[] = [];

    if (args.title) parts.push(`title="${args.title}"`);
    if (args.subtitle) parts.push(`subtitle="${args.subtitle}"`);
    if (args.overlay) parts.push(`[overlay]="true"`);

    const attrs = parts.length ? `\n  ${parts.join('\n  ')}` : '';
    const template = `<div class="bg-surface-ground">
  <card${attrs} style="width: 20rem">
    <ng-template pTemplate="header">
      <img alt="Заголовок" src="assets/mascot.jpg" class="w-full" />
    </ng-template>
    <ng-template pTemplate="content">
      <p class="text-sm">Контент карточки. Гибкая область для любого содержимого.</p>
    </ng-template>
    <ng-template pTemplate="footer">
      <button label="Действие" size="small" [fluid]="true" class="w-full"></button>
    </ng-template>
  </card>
</div>`;

    return { props: args, template };
  },
  args: {
    title: 'Заголовок',
    subtitle: 'Подзаголовок',
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример компонента. Используйте Controls для интерактивного изменения пропсов.',
      },
    },
  },
};

// ── Overlay ───────────────────────────────────────────────────────────────────

export const Overlay: Story = {
  render: () => ({
    template: `<app-card-overlay></app-card-overlay>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка с тенью (overlay).' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { CardComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-overlay',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <card title="Заголовок" subtitle="Подзаголовок" [overlay]="true" style="width: 20rem">
      <ng-template pTemplate="header">
        <div class="flex items-center justify-center h-8" style="background: var(--p-surface-100); color: var(--p-surface-400)">
          <i class="ti ti-photo text-3xl"></i>
        </div>
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка с тенью.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <button label="Действие" size="small" [fluid]="true"></button>
      </ng-template>
    </card>
  \`,
})
export class CardOverlayComponent {}
        `,
      },
    },
  },
};

// ── WithoutHeader ─────────────────────────────────────────────────────────────

export const WithoutHeader: Story = {
  render: () => ({
    template: `<app-card-without-header></app-card-without-header>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без изображения в шапке.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { CardComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-header',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без изображения в шапке.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <button label="Действие" size="small" [fluid]="true"></button>
      </ng-template>
    </card>
  \`,
})
export class CardWithoutHeaderComponent {}
        `,
      },
    },
  },
};

// ── WithoutFooter ─────────────────────────────────────────────────────────────

export const WithoutFooter: Story = {
  render: () => ({
    template: `<app-card-without-footer></app-card-without-footer>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без футера с действиями.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { CardComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-footer',
  standalone: true,
  imports: [CardComponent, SharedModule],
  template: \`
    <card title="Заголовок" subtitle="Подзаголовок" style="width: 20rem">
      <ng-template pTemplate="header">
        <div class="flex items-center justify-center h-8" style="background: var(--p-surface-100); color: var(--p-surface-400)">
          <i class="ti ti-photo text-3xl"></i>
        </div>
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без футера.</p>
      </ng-template>
    </card>
  \`,
})
export class CardWithoutFooterComponent {}
        `,
      },
    },
  },
};

// ── WithoutSubtitle ───────────────────────────────────────────────────────────

export const WithoutSubtitle: Story = {
  render: () => ({
    template: `<app-card-without-subtitle></app-card-without-subtitle>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Карточка без подзаголовка.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { CardComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-card-without-subtitle',
  standalone: true,
  imports: [CardComponent, ButtonComponent, SharedModule],
  template: \`
    <card title="Заголовок" style="width: 20rem">
      <ng-template pTemplate="header">
        <div class="flex items-center justify-center h-8" style="background: var(--p-surface-100); color: var(--p-surface-400)">
          <i class="ti ti-photo text-3xl"></i>
        </div>
      </ng-template>
      <ng-template pTemplate="content">
        <p class="text-sm">Карточка без подзаголовка.</p>
      </ng-template>
      <ng-template pTemplate="footer">
        <button label="Действие" size="small" [fluid]="true"></button>
      </ng-template>
    </card>
  \`,
})
export class CardWithoutSubtitleComponent {}
        `,
      },
    },
  },
};
