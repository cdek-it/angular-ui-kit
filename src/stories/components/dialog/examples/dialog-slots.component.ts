import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent } from '../../../../lib/components/dialog/dialog.component';
import { ExtraDialogTemplateDirective } from '../../../../lib/components/dialog/dialog-template.directive';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="bg-surface-ground p-4">
  <extra-button (click)="visible = true" label="Все слоты"></extra-button>

  <extra-dialog
    [visible]="visible"
    (visibleChange)="visible = $event"
    [showMaximize]="true"
  >
    <ng-template extraDialogTemplate="header">
      <div class="flex items-center gap-2">
        <i class="ti ti-package text-primary text-xl"></i>
        <span class="font-semibold">Инвойс №CDEK-7842</span>
        <extra-tag severity="warning" value="ожидает оплаты"></extra-tag>
      </div>
    </ng-template>

    <p>Слот content — основное содержимое окна: любые элементы, формы, списки.</p>

    <ng-template extraDialogTemplate="footer">
      <extra-button variant="text" label="Скачать PDF" icon="ti ti-download"></extra-button>
      <extra-button label="Оплатить" icon="ti ti-credit-card" (click)="visible = false"></extra-button>
    </ng-template>
  </extra-dialog>
</div>
`;

@Component({
  selector: 'app-dialog-slots',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective, ExtraButtonComponent, ExtraTagComponent],
  template
})
export class DialogSlotsComponent {
  visible = false;
}

export const Slots: StoryObj = {
  render: () => ({
    template: `<app-dialog-slots></app-dialog-slots>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Все три слота: header (кастомный заголовок с иконкой и тегом), content (тело окна — проецируемый контент без директивы), footer (кнопки действий).'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraDialogComponent, ExtraDialogTemplateDirective } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-slots',
  standalone: true,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective],
  template: \`
    <extra-dialog [visible]="visible" (visibleChange)="visible = $event">
      <ng-template extraDialogTemplate="header">
        <span class="font-semibold">Заголовок</span>
      </ng-template>

      Основное содержимое окна

      <ng-template extraDialogTemplate="footer">
        <extra-button variant="text" label="Отмена" (click)="visible = false"></extra-button>
        <extra-button label="Подтвердить" (click)="visible = false"></extra-button>
      </ng-template>
    </extra-dialog>
  \`,
})
export class DialogSlotsComponent {
  visible = false;
}
        `
      }
    }
  }
};
