import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Menu } from 'primeng/menu';
import { PrimeTemplate } from 'primeng/api';
import { ExtraMenuItem } from '../../shared';

export interface ExtraMenuModel extends ExtraMenuItem {
  caption?: string;
}

@Component({
  selector: 'extra-menu',
  host: { style: 'display: contents' },
  standalone: true,
  imports: [Menu, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-menu #menuRef [model]="model" [popup]="popup" [appendTo]="popup ? 'body' : null">
      <ng-template pTemplate="item" let-item>
        @if (itemTemplate) {
          <ng-container [ngTemplateOutlet]="itemTemplate" [ngTemplateOutletContext]="{ $implicit: item }">
          </ng-container>
        } @else {
          <a
            class="p-menu-item-link"
            role="menuitem"
            tabindex="0"
            [class.p-disabled]="item.disabled"
            [attr.href]="item.url || null"
            [attr.target]="item.target || null"
            (click)="!item.disabled && item.command && item.command({ originalEvent: $event, item: item })"
          >
            @if (item.icon) {
              <span [class]="item.icon + ' p-menu-item-icon'"></span>
            }
            @if ($any(item).caption) {
              <div class="menu-item-label">
                <span class="p-menu-item-label">{{ item.label }}</span>
                <small class="menu-item-caption">{{ $any(item).caption }}</small>
              </div>
            } @else {
              <span class="p-menu-item-label">{{ item.label }}</span>
            }
          </a>
        }
      </ng-template>
    </p-menu>
  `
})
export class ExtraMenuComponent {
  @ViewChild('menuRef') menuRef!: Menu;

  @Input() model: ExtraMenuModel[] = [];
  @Input() popup = false;
  @Input() itemTemplate: TemplateRef<any> | null = null;

  toggle(event: Event): void {
    this.menuRef.toggle(event);
  }
}
