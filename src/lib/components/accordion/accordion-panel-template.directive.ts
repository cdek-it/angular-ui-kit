import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraAccordionPanelTemplateName = 'header';

/**
 * Именованный шаблон слота `header` для ExtraAccordionPanelComponent.
 * Слот `content` не требует директивы — это содержимое панели по умолчанию (`<ng-content>`).
 *
 * ```html
 * <extra-accordion-panel>
 *   <ng-template extraAccordionPanelTemplate="header">
 *     <strong>Кастомный заголовок</strong>
 *   </ng-template>
 *   Содержимое панели
 * </extra-accordion-panel>
 * ```
 */
@Directive({
  selector: '[extraAccordionPanelTemplate]'
})
export class ExtraAccordionPanelTemplateDirective {
  /** Имя слота: header. */
  @Input({ required: true }) extraAccordionPanelTemplate!: ExtraAccordionPanelTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
