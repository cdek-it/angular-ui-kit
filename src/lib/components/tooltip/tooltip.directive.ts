import { Directive, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

export type ExtraTooltipPosition = 'right' | 'left' | 'top' | 'bottom';
export type ExtraTooltipEvent = 'hover' | 'focus' | 'both';

@Directive({
  selector: '[extra-tooltip]',
  standalone: true,
  hostDirectives: [Tooltip]
})
export class ExtraTooltipDirective implements OnChanges {
  private readonly delegate = inject(Tooltip);

  /** Текст подсказки — соответствует Figma-свойству `text-tooltip`. */
  @Input('extra-tooltip') tooltip: string | undefined;

  /** Позиция подсказки относительно хост-элемента. */
  @Input() position: ExtraTooltipPosition = 'right';

  /** Событие, по которому показывается подсказка. */
  @Input() event: ExtraTooltipEvent = 'hover';

  /** Задержка перед появлением подсказки в миллисекундах. */
  @Input() showDelay: number | undefined;

  /** Задержка перед скрытием подсказки в миллисекундах. */
  @Input() hideDelay: number | undefined;

  /** Отключает подсказку. */
  @Input() disabled = false;

  ngOnChanges(_changes: SimpleChanges): void {
    // Пробрасываем своё типизированное API в опции PrimeNG Tooltip. PrimeNG
    // читает эти опции при показе (show → create/updateText/align), а
    // `tooltipEvent` — при навешивании слушателей в `onAfterViewInit`,
    // который выполняется строго после `ngOnChanges`.
    this.delegate.setOption({
      tooltipLabel: this.tooltip ?? null,
      tooltipPosition: this.position,
      tooltipEvent: this.event,
      showDelay: this.showDelay,
      hideDelay: this.hideDelay,
      disabled: this.disabled
    });
  }
}
