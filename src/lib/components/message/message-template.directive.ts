import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraMessageTemplateName = 'footer';

/**
 * Именованный шаблон для слотов ExtraMessageComponent.
 *
 * ```html
 * <extra-message message="..." caption="...">
 *   Контент после caption
 *   <ng-template extraMessageTemplate="footer">
 *     <extra-button label="Действие" />
 *   </ng-template>
 * </extra-message>
 * ```
 */
@Directive({
  selector: '[extraMessageTemplate]'
})
export class ExtraMessageTemplateDirective {
  /** Имя слота: footer. */
  @Input({ required: true }) extraMessageTemplate!: ExtraMessageTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
