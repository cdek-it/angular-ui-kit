import { Component, ContentChild, HostBinding, Input, TemplateRef } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { SharedModule } from 'primeng/api';
import { NgTemplateOutlet } from '@angular/common';

export type ExtraTimelineLine = 'solid' | 'dashed' | 'dotted' | 'none';

@Component({
  selector: 'extra-timeline',
  standalone: true,
  imports: [Timeline, SharedModule, NgTemplateOutlet],
  template: `
    <p-timeline [value]="value" [align]="align" [layout]="layout">
      <ng-template pTemplate="content" let-event>
        <ng-container
          *ngTemplateOutlet="contentTemplate || defaultContent; context: { $implicit: event }"
        ></ng-container>
      </ng-template>

      <ng-template pTemplate="opposite" let-event>
        @if (showCaption) {
          @if (oppositeTemplate) {
            <ng-container *ngTemplateOutlet="oppositeTemplate; context: { $implicit: event }"></ng-container>
          } @else {
            <span>&nbsp;</span>
          }
        }
      </ng-template>

      @if (markerTemplate || icon) {
        <ng-template pTemplate="marker" let-event>
          @if (markerTemplate) {
            <ng-container *ngTemplateOutlet="markerTemplate; context: { $implicit: event }"></ng-container>
          } @else {
            <span class="p-timeline-event-marker">
              <i [class]="icon"></i>
            </span>
          }
        </ng-template>
      }
    </p-timeline>

    <ng-template #defaultContent let-event>
      {{ event }}
    </ng-template>
  `
})
export class ExtraTimelineComponent {
  @Input() value: any[] = [];
  @Input() align: 'left' | 'right' | 'alternate' | 'top' | 'bottom' = 'left';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() showCaption: boolean = true;
  @Input() line: ExtraTimelineLine = 'solid';
  @Input() icon = '';
  @Input() markerColor = '';

  @HostBinding('attr.data-line') get dataLine() {
    return this.line;
  }
  @HostBinding('style.--timeline-marker-color') get markerColorVar() {
    return this.markerColor || null;
  }

  @ContentChild('content') contentTemplate?: TemplateRef<any>;
  @ContentChild('opposite') oppositeTemplate?: TemplateRef<any>;
  @ContentChild('marker') markerTemplate?: TemplateRef<any>;
}
