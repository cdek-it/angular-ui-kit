import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DialogComponent } from '../../../lib/components/dialog/dialog.component';
import { DialogDefaultComponent, template as dialogDefaultTemplate } from './examples/dialog-default.component';
import { DialogSmallComponent, template as dialogSmallTemplate } from './examples/dialog-small.component';
import { DialogLargeComponent, template as dialogLargeTemplate } from './examples/dialog-large.component';
import { DialogExtraLargeComponent, template as dialogExtraLargeTemplate } from './examples/dialog-extra-large.component';
import { DialogNoModalComponent, template as dialogNoModalTemplate } from './examples/dialog-no-modal.component';
import { DialogNoHeaderComponent, template as dialogNoHeaderTemplate } from './examples/dialog-no-header.component';
import { DialogDynamicComponent } from './examples/dialog-dynamic.component';

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
import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-basic',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template: \`${dialogDefaultTemplate}\`,
})
export class DialogBasicComponent {
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
import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-small',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template: \`${dialogSmallTemplate}\`,
})
export class DialogSmallComponent {
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
import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-large',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template: \`${dialogLargeTemplate}\`,
})
export class DialogLargeComponent {
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
import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-extra-large',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template: \`${dialogExtraLargeTemplate}\`,
})
export class DialogExtraLargeComponent {
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
import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-no-modal',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template: \`${dialogNoModalTemplate}\`,
})
export class DialogNoModalComponent {
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
import { Component } from '@angular/core';
import { DialogComponent, ButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-no-header',
  standalone: true,
  imports: [DialogComponent, ButtonComponent],
  template: \`${dialogNoHeaderTemplate}\`,
})
export class DialogNoHeaderComponent {
  visible = false;
}
        `,
      },
    },
  },
};

// ── Dynamic ───────────────────────────────────────────────────────────────────

export const Dynamic: Story = {
  name: 'Dynamic',
  decorators: [moduleMetadata({ imports: [DialogDynamicComponent] })],
  render: () => ({ template: `<app-dialog-dynamic></app-dialog-dynamic>` }),
  parameters: {
    docs: {
      description: {
        story: 'Программное открытие диалога через `UiDialogService`. Содержимое — любой Angular-компонент, получающий `DynamicDialogRef` для закрытия.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UiDialogService } from '@cdek-it/angular-ui-kit';

// Содержимое диалога
@Component({
  selector: 'app-dialog-dynamic-content',
  standalone: true,
  imports: [Button],
  template: \`
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
    <div class="flex justify-end gap-2 mt-4">
      <p-button variant="text" label="Отмена" (onClick)="ref.close()"></p-button>
      <p-button label="Подтвердить" (onClick)="ref.close(true)"></p-button>
    </div>
  \`,
})
export class DialogDynamicContentComponent {
  constructor(readonly ref: DynamicDialogRef) {}
}

// Компонент-триггер
@Component({
  selector: 'app-dialog-dynamic',
  standalone: true,
  imports: [Button],
  providers: [DialogService, UiDialogService],
  template: \`
    <p-button (onClick)="open()" label="Создать заявку"></p-button>
  \`,
})
export class DialogDynamicComponent {
  constructor(private readonly dialogService: UiDialogService) {}

  open(): void {
    this.dialogService.open(DialogDynamicContentComponent, {
      header: 'Подтверждение заявки',
      modal: true,
    });
  }
}`,
      },
    },
  },
};
