import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraDialogComponent, ExtraDialogSize } from '../../../../lib/components/dialog/dialog.component';
import { ExtraDialogTemplateDirective } from '../../../../lib/components/dialog/dialog-template.directive';
import { ExtraTagComponent } from '../../../../lib/components/tag/tag.component';

const template = `
<div class="p-4">
  <extra-button (click)="visible = true" label="Все слоты"></extra-button>

  <extra-dialog
    [visible]="visible"
    (visibleChange)="visible = $event"
    [showMaximize]="showMaximize"
    [size]="size"
    [showOverlay]="showOverlay"
    [showClose]="showClose"
    [dismissableMask]="dismissableMask"
    [closeOnEscape]="closeOnEscape"
    [focusOnShow]="focusOnShow"
    [appendTo]="appendTo"
  >
    <ng-template extraDialogTemplate="header">
      <div class="flex items-center gap-2">
        <i class="ti ti-package text-primary text-xl"></i>
        <span class="font-semibold">Инвойс №7842</span>
        <extra-tag severity="warning" value="ожидает"></extra-tag>
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
  @Input() size: ExtraDialogSize = 'default';
  @Input() visible = false;
  @Input() showOverlay = true;
  @Input() showMaximize = false;
  @Input() showClose = true;
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() focusOnShow = false;
  @Input() appendTo = 'body';
}

export const Slots: StoryObj = {
  args: { visible: false },
  render: (args) => ({
    props: args,
    template: `<app-dialog-slots [visible]="visible" [size]="size" [showOverlay]="showOverlay" [showMaximize]="showMaximize" [showClose]="showClose" [dismissableMask]="dismissableMask" [closeOnEscape]="closeOnEscape" [focusOnShow]="focusOnShow" [appendTo]="appendTo"></app-dialog-slots>`
  }),
  parameters: {
    controls: { exclude: ['header'] },
    docs: {
      description: {
        story:
          'Все три слота: header (кастомный заголовок с иконкой и тегом), content (тело окна — проецируемый контент без директивы), footer (кнопки действий).'
      },
      source: {
        language: 'ts',
        code: `
import { Component, Input } from '@angular/core';
import { ExtraDialogComponent, ExtraDialogTemplateDirective, ExtraDialogSize } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-dialog-slots',
  standalone: true,
  imports: [ExtraDialogComponent, ExtraDialogTemplateDirective],
  template: \`
    <extra-dialog [visible]="visible" (visibleChange)="visible = $event" [size]="size" [showOverlay]="showOverlay" [showMaximize]="showMaximize" [showClose]="showClose" [dismissableMask]="dismissableMask" [closeOnEscape]="closeOnEscape" [focusOnShow]="focusOnShow" [appendTo]="appendTo">
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
  @Input() size: ExtraDialogSize = 'default';
  @Input() visible = false;
  @Input() showOverlay = true;
  @Input() showMaximize = false;
  @Input() showClose = true;
  @Input() dismissableMask = false;
  @Input() closeOnEscape = true;
  @Input() focusOnShow = false;
  @Input() appendTo = 'body';
}
        `
      }
    }
  }
};
