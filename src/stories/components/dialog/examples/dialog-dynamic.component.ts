import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { DynamicDialogRef, ExtraDialogService } from '../../../../lib/components/dialog/dialog-open.service';

// ── Содержимое диалога ────────────────────────────────────────────────────────

@Component({
  selector: 'app-dialog-dynamic-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template: `
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению.</p>
    <p>Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок — 3 рабочих дня.</p>
    <div class="flex justify-end gap-2 mt-4">
      <extra-button variant="text" label="Отмена" (click)="ref.close()"></extra-button>
      <extra-button label="Подтвердить" (click)="ref.close(true)"></extra-button>
    </div>
  `
})
export class DialogDynamicContentComponent {
  // Инжектится именно класс (не type-алиас) — иначе DI не резолвит токен (NG0202)
  constructor(readonly ref: DynamicDialogRef) {}
}

// ── Компонент-триггер ─────────────────────────────────────────────────────────

const template = `
<div class="bg-surface-ground p-4">
  <extra-button (click)="open()" label="Создать заявку"></extra-button>
</div>
`;

@Component({
  selector: 'app-dialog-dynamic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template
})
export class DialogDynamicComponent {
  constructor(private readonly dialogService: ExtraDialogService) {}

  open(): void {
    this.dialogService.open(DialogDynamicContentComponent, {
      header: 'Подтверждение заявки',
      modal: true
    });
  }
}

export const Dynamic: StoryObj = {
  render: () => ({
    template: `<app-dialog-dynamic></app-dialog-dynamic>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Программное открытие окна через ExtraDialogService (поверх спецификации): содержимое — любой Angular-компонент, получающий DynamicDialogRef для закрытия.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent, ExtraDialogService, DynamicDialogRef } from '@cdek-it/angular-ui-kit';

// Содержимое диалога
@Component({
  selector: 'app-dialog-dynamic-content',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <p>Содержимое окна</p>
    <div class="flex justify-end gap-2 mt-4">
      <extra-button variant="text" label="Отмена" (click)="ref.close()"></extra-button>
      <extra-button label="Подтвердить" (click)="ref.close(true)"></extra-button>
    </div>
  \`,
})
export class DialogDynamicContentComponent {
  // Инжектится именно класс (не type-алиас) — иначе DI не резолвит токен (NG0202)
  constructor(readonly ref: DynamicDialogRef) {}
}

// Компонент-триггер
@Component({
  selector: 'app-dialog-dynamic',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: '<extra-button (click)="open()" label="Создать заявку"></extra-button>',
})
export class DialogDynamicComponent {
  constructor(private readonly dialogService: ExtraDialogService) {}

  open(): void {
    this.dialogService.open(DialogDynamicContentComponent, {
      header: 'Подтверждение заявки',
      modal: true
    });
  }
}
        `
      }
    }
  }
};
