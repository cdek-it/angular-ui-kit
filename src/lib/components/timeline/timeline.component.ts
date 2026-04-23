import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { SharedModule } from 'primeng/api';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'timeline',
  standalone: true,
  imports: [Timeline, SharedModule, NgIf, NgTemplateOutlet],
  template: `
    <p-timeline
      [value]="value"
      [align]="align"
      [layout]="layout"
    >
      <ng-template pTemplate="content" let-event>
        <ng-container
          *ngTemplateOutlet="contentTemplate || defaultContent; context: { $implicit: event }"
        ></ng-container>
      </ng-template>

      <ng-template pTemplate="opposite" let-event>
        <ng-container *ngIf="showCaption">
          <ng-container *ngIf="oppositeTemplate; else emptyOpposite">
            <ng-container *ngTemplateOutlet="oppositeTemplate; context: { $implicit: event }"></ng-container>
          </ng-container>
          <ng-template #emptyOpposite><span>&nbsp;</span></ng-template>
        </ng-container>
      </ng-template>

      <ng-template *ngIf="markerTemplate" pTemplate="marker" let-event>
        <ng-container *ngTemplateOutlet="markerTemplate; context: { $implicit: event }"></ng-container>
      </ng-template>
    </p-timeline>

    <ng-template #defaultContent let-event>
      {{ event }}
    </ng-template>
  `,
})
export class TimelineComponent {
  @Input() value: any[] = [];
  @Input() align: 'left' | 'right' | 'alternate' | 'top' | 'bottom' = 'left';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() showCaption: boolean = true;

  @ContentChild('content') contentTemplate?: TemplateRef<any>;
  @ContentChild('opposite') oppositeTemplate?: TemplateRef<any>;
  @ContentChild('marker') markerTemplate?: TemplateRef<any>;
}
