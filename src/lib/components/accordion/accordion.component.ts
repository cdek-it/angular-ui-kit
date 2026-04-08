import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primeng/accordion';

export interface AccordionItem {
  value: string;
  header: string;
  content: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'accordion',
  host: { style: 'display: block' },
  standalone: true,
  imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent],
  template: `
    <p-accordion
      [multiple]="multiple"
      [value]="activeValue"
      (valueChange)="activeValueChange.emit($event)"
    >
      @for (item of items; track item.value) {
        <p-accordion-panel [value]="item.value" [disabled]="item.disabled ?? false">
          <p-accordion-header>
            <div>
              @if (item.icon) {
                <i [class]="item.icon"></i>
              }
              <span>{{ item.header }}</span>
            </div>
          </p-accordion-header>
          <p-accordion-content>{{ item.content }}</p-accordion-content>
        </p-accordion-panel>
      }
    </p-accordion>
  `,
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() multiple = false;
  @Input() activeValue: string | null = '0';
  @Output() activeValueChange = new EventEmitter<string | null>();
}
