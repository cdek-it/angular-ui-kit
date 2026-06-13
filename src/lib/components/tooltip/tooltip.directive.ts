import { Directive, Input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

export type ExtraTooltipPosition = 'right' | 'left' | 'top' | 'bottom';
export type ExtraTooltipEvent = 'hover' | 'focus' | 'both';

@Directive({
  selector: '[extra-tooltip]',
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
export class ExtraTooltipDirective {
  @Input() tooltip: string | undefined;
  @Input() position: ExtraTooltipPosition = 'right';
  @Input() event: ExtraTooltipEvent = 'hover';
  @Input() showDelay: number | undefined;
  @Input() hideDelay: number | undefined;
  @Input() disabled: boolean = false;
}
