import { Component, ContentChild, Directive, HostBinding, Input, TemplateRef } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { SharedModule } from 'primeng/api';
import { NgTemplateOutlet } from '@angular/common';

/** Позиция контента относительно оси; `opposite` — чередование сторон (PrimeNG `alternate`). */
export type ExtraTimelineAlign = 'left' | 'right' | 'opposite' | 'top' | 'bottom';

export type ExtraTimelineLayout = 'vertical' | 'horizontal';

export type ExtraTimelineLine = 'solid' | 'dashed' | 'dotted' | 'none';

@Directive({ selector: '[extraTimelineContent]', standalone: true })
export class ExtraTimelineContentDirective {}

@Directive({ selector: '[extraTimelineOpposite]', standalone: true })
export class ExtraTimelineOppositeDirective {}

@Directive({ selector: '[extraTimelineMarker]', standalone: true })
export class ExtraTimelineMarkerDirective {}

@Component({
  selector: 'extra-timeline',
  standalone: true,
  imports: [Timeline, SharedModule, NgTemplateOutlet],
  template: `
    <p-timeline [value]="value" [align]="primeAlign" [layout]="layout">
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
  @Input() align: ExtraTimelineAlign = 'left';
  @Input() layout: ExtraTimelineLayout = 'vertical';
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

  /** PrimeNG называет режим чередования `alternate`. */
  get primeAlign(): string {
    return this.align === 'opposite' ? 'alternate' : this.align;
  }

  @ContentChild(ExtraTimelineContentDirective, { read: TemplateRef }) contentTemplate?: TemplateRef<any>;
  @ContentChild(ExtraTimelineOppositeDirective, { read: TemplateRef }) oppositeTemplate?: TemplateRef<any>;
  @ContentChild(ExtraTimelineMarkerDirective, { read: TemplateRef }) markerTemplate?: TemplateRef<any>;
}
