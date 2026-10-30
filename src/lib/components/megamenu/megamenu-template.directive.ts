import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraMegaMenuTemplateName = 'itemEnd';

/**
 * Именованный шаблон для слотов ExtraMegaMenuComponent.
 *
 * Шаблон `itemEnd` добавляет содержимое в конец пункта панели — после текста и `caption`, перед
 * `iconEnd`. Пункт целиком остаётся за компонентом: текст, иконки, выбор и навигация.
 *
 * ```html
 * <extra-megamenu [items]="items">
 *   <ng-template extraMegaMenuTemplate="itemEnd" let-item>…</ng-template>
 * </extra-megamenu>
 * ```
 */
@Directive({
  selector: '[extraMegaMenuTemplate]',
  standalone: true
})
export class ExtraMegaMenuTemplateDirective {
  /** Имя слота: itemEnd. */
  @Input({ required: true }) extraMegaMenuTemplate!: ExtraMegaMenuTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
