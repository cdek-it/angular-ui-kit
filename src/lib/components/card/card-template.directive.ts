import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraCardTemplateName = 'header' | 'footer';

/**
 * Именованные шаблоны слотов `header`/`footer` для ExtraCardComponent.
 * Слот `content` не требует директивы — это содержимое карточки по умолчанию (`<ng-content>`).
 *
 * ```html
 * <extra-card title="Заголовок">
 *   <ng-template extraCardTemplate="header">
 *     <img alt="" src="cover.jpg" />
 *   </ng-template>
 *   <p>Содержимое карточки</p>
 *   <ng-template extraCardTemplate="footer">
 *     <extra-button label="Действие" />
 *   </ng-template>
 * </extra-card>
 * ```
 */
@Directive({
  selector: '[extraCardTemplate]'
})
export class ExtraCardTemplateDirective {
  /** Имя слота: header | footer. */
  @Input({ required: true }) extraCardTemplate!: ExtraCardTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
