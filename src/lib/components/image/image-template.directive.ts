import { Directive, Input, TemplateRef } from '@angular/core';

export type ExtraImageTemplateName = 'rotateRightIcon' | 'rotateLeftIcon' | 'zoomOutIcon' | 'zoomInIcon' | 'closeIcon';

/** Именованный шаблон иконки панели предпросмотра. */
@Directive({
  selector: '[extraImageTemplate]'
})
export class ExtraImageTemplateDirective {
  @Input({ required: true }) extraImageTemplate!: ExtraImageTemplateName;

  constructor(public template: TemplateRef<unknown>) {}
}
