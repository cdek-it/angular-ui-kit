import { Directive, Input } from '@angular/core';
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Menubar } from 'primeng/menubar';
import { PrimeTemplate } from 'primeng/api';
import { ExtraMenuItem } from '../../shared';

@Directive({ selector: '[extraMenubarItem]', standalone: true })
export class ExtraMenubarItemDirective {}

@Component({
  selector: 'extra-menubar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menubar, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-menubar [model]="model">
      <ng-template pTemplate="item" let-item let-hasSubmenu="hasSubmenu" let-root="root">
        @if (itemTemplate) {
          <ng-container
            [ngTemplateOutlet]="itemTemplate"
            [ngTemplateOutletContext]="{ $implicit: item, hasSubmenu: hasSubmenu, root: root }"
          ></ng-container>
        } @else {
          <a class="p-menubar-item-link flex items-center gap-2">
            @if (item.icon) {
              <span [class]="'p-menubar-item-icon ' + item.icon"></span>
            }
            <span class="p-menubar-item-label">{{ item.label }}</span>
            @if (hasSubmenu) {
              <span
                [class]="root ? 'p-menubar-submenu-icon ti ti-chevron-down' : 'p-menubar-submenu-icon ti ti-chevron-right'"
              ></span>
            }
          </a>
        }
      </ng-template>
    </p-menubar>
  `
})
export class ExtraMenubarComponent {
  @Input() model: ExtraMenuItem[] = [];
  @ContentChild(ExtraMenubarItemDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any> | null = null;
}
