import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraMenuTemplateName = 'itemEnd';

/**
 * Именованный шаблон для слотов ExtraMenuComponent.
 *
 * Шаблон `itemEnd` добавляет содержимое в конец пункта — после текста и `caption`, перед `iconEnd`
 * (например хоткей, `Badge`, `Tag`). Пункт целиком остаётся за компонентом: текст, иконки, выбор
 * и навигация.
 *
 * ```html
 * <extra-menu [items]="items">
 *   <ng-template extraMenuTemplate="itemEnd" let-item>…</ng-template>
 * </extra-menu>
 * ```
 */
@Directive({
  selector: '[extraMenuTemplate]'
})
export class ExtraMenuTemplateDirective {
  /** Имя слота: itemEnd. */
  @Input({ required: true }) extraMenuTemplate!: ExtraMenuTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
