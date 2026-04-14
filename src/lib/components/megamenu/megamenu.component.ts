import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MegaMenu } from 'primeng/megamenu';
import { MegaMenuItem, PrimeTemplate } from 'primeng/api';
import { Badge } from 'primeng/badge';

export type MegaMenuOrientation = 'horizontal' | 'vertical';

export interface MegaMenuModel extends MegaMenuItem {
  description?: string;
  badge?: string;
}

@Component({
  selector: 'megamenu',
  host: { style: 'display: contents' },
  standalone: true,
  imports: [MegaMenu, PrimeTemplate, NgTemplateOutlet, Badge],
  template: `
    <p-megamenu
      [model]="model"
      [orientation]="orientation"
      [breakpoint]="breakpoint"
      [scrollHeight]="scrollHeight"
      [disabled]="disabled"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [tabindex]="tabindex"
    >
      <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu">
        @if (itemTemplate) {
          <ng-container [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item, hasSubmenu: hasSubmenu }">
          </ng-container>
        } @else {
          <a
            class="p-megamenu-item-link"
            role="menuitem"
            tabindex="0"
            [class.p-disabled]="item.disabled"
            [attr.href]="item.url || null"
            [attr.target]="item.target || null"
          >
            @if (item.icon) {
              <span [class]="item.icon + ' p-megamenu-item-icon'"></span>
            }
            @if ($any(item).description) {
              <div class="megamenu-item-label">
                <span class="p-megamenu-item-label">{{ item.label }}</span>
                <small class="megamenu-item-caption">{{ $any(item).description }}</small>
              </div>
            } @else {
              <span class="p-megamenu-item-label">{{ item.label }}</span>
            }
            @if ($any(item).badge) {
              <p-badge [value]="$any(item).badge"></p-badge>
            }
            @if (hasSubmenu) {
              <span class="p-megamenu-submenu-icon ti ti-chevron-down"></span>
            }
          </a>
        }
      </ng-template>
    </p-megamenu>
  `,
})
export class MegaMenuComponent {
  @Input() model: MegaMenuModel[] = [];
  @Input() orientation: MegaMenuOrientation = 'horizontal';
  @Input() breakpoint: string = '960px';
  @Input() scrollHeight: string = '';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string | undefined = undefined;
  @Input() ariaLabelledBy: string | undefined = undefined;
  @Input() tabindex: number = 0;
  @Input() itemTemplate: TemplateRef<any> | null = null;
}
