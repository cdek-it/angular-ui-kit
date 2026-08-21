import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { ExtraDialogTemplateDirective } from '../../../../lib/components/dialog/dialog-template.directive';

const template = `
<div class="bg-surface-ground p-4">
  <extra-button (click)="visible = true" label="Открыть окно"></extra-button>

  <extra-dialog
    header="Подтверждение заявки"
    [visible]="visible"
    (visibleChange)="visible = $event"
    (onShow)="log('onShow')"
    (onHide)="log('onHide')"
  >
    <p>Заявка на доставку груза №CDEK-2025-00478312 готова к оформлению. Вес отправления: 3,5 кг, габариты: 40×30×20 см. Ориентировочный срок доставки — 3 рабочих дня.</p>
    <ng-template extraDialogTemplate="footer">
      <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
      <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
    </ng-template>
  </extra-dialog>

  <div class="mt-3 text-sm">Лог событий: {{ logEntries().length ? logEntries().join(' → ') : '—' }}</div>
</div>
`;

@Component({
  selector: 'app-dialog-basic',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective, ExtraButtonComponent],
  template
})
export class DialogBasicComponent {
  visible = false;
  logEntries = signal<string[]>([]);

  log(entry: string): void {
    this.logEntries.update((entries) => [...entries, entry]);
  }
}

export const Basic: StoryObj = {
  render: () => ({
    template: `<app-dialog-basic></app-dialog-basic>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Базовое модальное окно: маска (showOverlay, по умолчанию), кнопка закрытия (showClose, по умолчанию), слоты content (тело) и footer (кнопки). onShow/onHide логируются.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, signal } from '@angular/core';
import { ExtraDialogComponent, ExtraDialogTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-basic',
  standalone: true,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective],
  template: \`
    <extra-button (click)="visible = true" label="Открыть окно"></extra-button>

    <extra-dialog
      header="Подтверждение заявки"
      [visible]="visible"
      (visibleChange)="visible = $event"
      (onShow)="onShow()"
      (onHide)="onHide()"
    >
      <p>Содержимое окна</p>
      <ng-template extraDialogTemplate="footer">
        <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
        <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
      </ng-template>
    </extra-dialog>
  \`,
})
export class DialogBasicComponent {
  visible = false;
}
        `
      }
    }
  }
};
