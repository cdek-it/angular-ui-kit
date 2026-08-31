import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraMenuTemplateName = 'item' | 'submenuHeader' | 'start' | 'end';

/**
 * Именованный шаблон для слотов ExtraMenuComponent.
 *
 * ```html
 * <extra-menu [items]="items">
 *   <ng-template extraMenuTemplate="start">…</ng-template>
 *   <ng-template extraMenuTemplate="item" let-item>…</ng-template>
 *   <ng-template extraMenuTemplate="submenuHeader" let-group>…</ng-template>
 *   <ng-template extraMenuTemplate="end">…</ng-template>
 * </extra-menu>
 * ```
 */
@Directive({
  selector: '[extraMenuTemplate]'
})
export class ExtraMenuTemplateDirective {
  /** Имя слота: item | submenuHeader | start | end. */
  @Input({ required: true }) extraMenuTemplate!: ExtraMenuTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
