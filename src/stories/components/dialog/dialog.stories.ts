import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DialogComponent } from '../../../lib/components/dialog/dialog.component';
import { DialogDefaultComponent } from './examples/dialog-default.component';
import { DialogSmallComponent } from './examples/dialog-small.component';
import { DialogLargeComponent } from './examples/dialog-large.component';
import { DialogExtraLargeComponent } from './examples/dialog-extra-large.component';
import { DialogNoModalComponent } from './examples/dialog-no-modal.component';
import { DialogNoHeaderComponent } from './examples/dialog-no-header.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/Overlay/Dialog',
  component: DialogComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Dialog (модальное окно) — контейнер, отображающийся поверх основного содержимого страницы.

\`\`\`typescript
import { DialogComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-dialog' },
  },
  argTypes: {
    header: {
      control: 'text',
      description: 'Заголовок окна',
      table: {
        category: 'Props',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    headerTemplate: {
      control: false,
      description: 'Кастомный шаблон заголовка. При наличии заменяет строковый header',
      table: {
        category: 'Props',
        defaultValue: { summary: 'null' },
        type: { summary: 'TemplateRef<any> | null' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xlg'],
      description: 'Размер диалога',
      table: {
        category: 'Props',
        defaultValue: { summary: 'default' },
        type: { summary: "'sm' | 'default' | 'lg' | 'xlg'" },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Должно ли окно быть модальным (блокировать фон)',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    dismissableMask: {
      control: 'boolean',
      description: 'Закрывать ли окно при клике на маску',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Закрывать ли окно по нажатию Escape',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    showHeader: {
      control: 'boolean',
      description: 'Отображать ли заголовок',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    focusOnShow: {
      control: 'boolean',
      description: 'Фокус на первый элемент при открытии',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    appendTo: {
      control: 'text',
      description: 'Элемент, к которому прикрепляется диалог (например body или CSS-селектор)',
      table: {
        category: 'Props',
        defaultValue: { summary: "'body'" },
        type: { summary: 'string' },
      },
    },
    visibleChange: {
      control: false,
      description: 'Изменение видимости диалога',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<boolean>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogComponent>;

// ── Basic ─────────────────────────────────────────────────────────────────────

export const Basic: Story = {
  name: 'Basic',
  decorators: [moduleMetadata({ imports: [DialogDefaultComponent] })],
  render: () => ({ template: `<app-dialog-basic></app-dialog-basic>` }),
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример диалогового окна с заголовком, контентом и кнопками действий.',
      },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-basic',
  standalone: true,
  imports: [DialogComponent, Button],
  template: \`
    <p-button (onClick)="visible = true" label="Создать заявку"></p-button>

    <ng-template #footer>
      <p-button variant="text" label="Отмена" (onClick)="visible = false"></p-button>
      <p-button label="Подтвердить" (onClick)="visible = false"></p-button>
    </ng-template>

    <dialog
      header="Подтверждение заявки"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [footerTemplate]="footer"
    >
      <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
    </dialog>
  \`,
})
export class DialogBasicComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
        `,
      },
    },
  },
};

// ── Small ─────────────────────────────────────────────────────────────────────

export const Small: Story = {
  name: 'Small',
  decorators: [moduleMetadata({ imports: [DialogSmallComponent] })],
  render: () => ({ template: `<app-dialog-small></app-dialog-small>` }),
  parameters: {
    docs: {
      description: { story: 'Уменьшенный размер диалога (SM).' },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-small',
  standalone: true,
  imports: [DialogComponent, Button],
  template: \`
    <dialog
      header="Статус отправления"
      size="sm"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [footerTemplate]="footer"
    >
      <p>Отправление CDEK-2025-00478312 прибыло на сортировочный центр.</p>
    </dialog>
  \`,
})
export class DialogSmallComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
        `,
      },
    },
  },
};

// ── Large ─────────────────────────────────────────────────────────────────────

export const Large: Story = {
  name: 'Large',
  decorators: [moduleMetadata({ imports: [DialogLargeComponent] })],
  render: () => ({ template: `<app-dialog-large></app-dialog-large>` }),
  parameters: {
    docs: {
      description: { story: 'Увеличенный размер диалога (LG).' },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-large',
  standalone: true,
  imports: [DialogComponent, Button],
  template: \`
    <dialog
      header="Детали отправления"
      size="lg"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [footerTemplate]="footer"
    >
      <p>Отправление CDEK-2025-00478312 передано курьеру. Адрес: г. Новосибирск, ул. Ленина, 42.</p>
    </dialog>
  \`,
})
export class DialogLargeComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
        `,
      },
    },
  },
};

// ── Extra Large ───────────────────────────────────────────────────────────────

export const ExtraLarge: Story = {
  name: 'Extra Large',
  decorators: [moduleMetadata({ imports: [DialogExtraLargeComponent] })],
  render: () => ({ template: `<app-dialog-extra-large></app-dialog-extra-large>` }),
  parameters: {
    docs: {
      description: { story: 'Максимальный размер диалога (XLG).' },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-extra-large',
  standalone: true,
  imports: [DialogComponent, Button],
  template: \`
    <dialog
      header="Отчёт по доставкам за апрель 2025"
      size="xlg"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [footerTemplate]="footer"
    >
      <p>За апрель 2025 обработано 4 872 отправления. Успешно доставлено — 4 641 (95,3%).</p>
    </dialog>
  \`,
})
export class DialogExtraLargeComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
        `,
      },
    },
  },
};

// ── No Modal ──────────────────────────────────────────────────────────────────

export const NoModal: Story = {
  name: 'No Modal',
  decorators: [moduleMetadata({ imports: [DialogNoModalComponent] })],
  render: () => ({ template: `<app-dialog-no-modal></app-dialog-no-modal>` }),
  parameters: {
    docs: {
      description: { story: 'Окно не блокирует фон страницы.' },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-no-modal',
  standalone: true,
  imports: [DialogComponent, Button],
  template: \`
    <dialog
      header="Маршрут доставки"
      [modal]="false"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [footerTemplate]="footer"
    >
      <p>Маршрут: Москва → Новосибирск → пункт выдачи.</p>
    </dialog>
  \`,
})
export class DialogNoModalComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
        `,
      },
    },
  },
};

// ── Show Header ───────────────────────────────────────────────────────────────

export const NoHeader: Story = {
  name: 'Show Header',
  decorators: [moduleMetadata({ imports: [DialogNoHeaderComponent] })],
  render: () => ({ template: `<app-dialog-no-header></app-dialog-no-header>` }),
  parameters: {
    docs: {
      description: { story: 'Заголовок можно скрыть с помощью пропса showHeader: false.' },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-no-header',
  standalone: true,
  imports: [DialogComponent, Button],
  template: \`
    <ng-template #footer>
      <div class="flex justify-end w-full">
        <p-button label="Закрыть" (onClick)="visible = false"></p-button>
      </div>
    </ng-template>

    <dialog
      [showHeader]="false"
      [dismissableMask]="true"
      [visible]="visible"
      (visibleChange)="visible = $event"
      [footerTemplate]="footer"
    >
      <p>Заявка на доставку принята в обработку. Трек-номер будет присвоен в течение 15 минут.</p>
    </dialog>
  \`,
})
export class DialogNoHeaderComponent {
  @ViewChild('footer') footer!: TemplateRef<any>;
  visible = false;
}
        `,
      },
    },
  },
};
