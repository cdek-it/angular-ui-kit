import { Directive, Input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

export type TooltipPosition = 'right' | 'left' | 'top' | 'bottom';
export type TooltipEvent = 'hover' | 'focus' | 'both';

@Directive({
  selector: '[tooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: Tooltip,
      inputs: [
        'pTooltip: tooltip',
        'tooltipPosition: position',
        'tooltipEvent: event',
        'showDelay: showDelay',
        'hideDelay: hideDelay',
        'tooltipDisabled: disabled',
        'escape: escape',
        'autoHide: autoHide',
        'fitContent: fitContent',
        'hideOnEscape: hideOnEscape',
        'positionTop: positionTop',
        'positionLeft: positionLeft'
      ]
    }
  ]
})
export class TooltipDirective {
  @Input() tooltip: string | undefined;
  @Input() position: TooltipPosition = 'right';
  @Input() event: TooltipEvent = 'hover';
  @Input() showDelay: number | undefined;
  @Input() hideDelay: number | undefined;
  @Input() disabled: boolean = false;
}
