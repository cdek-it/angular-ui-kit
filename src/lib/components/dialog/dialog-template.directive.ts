import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraDialogTemplateName = 'header' | 'footer';

/**
 * Именованный шаблон для слотов ExtraDialogComponent.
 *
 * ```html
 * <extra-dialog [visible]="visible">
 *   Основное содержимое окна (слот content)
 *   <ng-template extraDialogTemplate="header">…</ng-template>
 *   <ng-template extraDialogTemplate="footer">…</ng-template>
 * </extra-dialog>
 * ```
 */
@Directive({
  selector: '[extraDialogTemplate]'
})
export class ExtraDialogTemplateDirective {
  /** Имя слота: header | footer. */
  @Input({ required: true }) extraDialogTemplate!: ExtraDialogTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
