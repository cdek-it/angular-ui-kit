import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraBreadcrumbTemplateName = 'item';

/**
 * Именованный шаблон для слотов ExtraBreadcrumbComponent.
 *
 * Шаблон `item` подменяет содержимое ссылки элемента цепочки (иконку и подпись). Сама ссылка —
 * клик, `disabled`, `aria-current` у текущей страницы — остаётся за компонентом.
 *
 * ```html
 * <extra-breadcrumb [items]="items">
 *   <ng-template extraBreadcrumbTemplate="item" let-item>…</ng-template>
 * </extra-breadcrumb>
 * ```
 */
@Directive({
  selector: '[extraBreadcrumbTemplate]',
  standalone: true
})
export class ExtraBreadcrumbTemplateDirective {
  /** Имя слота: item. */
  @Input({ required: true }) extraBreadcrumbTemplate!: ExtraBreadcrumbTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
