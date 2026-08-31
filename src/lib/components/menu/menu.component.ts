import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Menu } from 'primeng/menu';
import { MenuItem, MenuItemCommandEvent, PrimeTemplate } from 'primeng/api';
import { ExtraMenuTemplateDirective } from './menu-template.directive';

export type ExtraMenuAction = {
  label?: string;
  caption?: string;
  icon?: string;
  iconEnd?: string;
  selected?: boolean;
  disabled?: boolean;
  visible?: boolean;
  href?: string;
  target?: string;
  command?: (event: ExtraMenuItemSelectEvent) => void;
  id?: string;
};

export type ExtraMenuGroup = {
  label?: string;
  items: ExtraMenuAction[];
  visible?: boolean;
  id?: string;
};

export type ExtraMenuSeparator = {
  separator: true;
};

export type ExtraMenuItem = ExtraMenuAction | ExtraMenuGroup | ExtraMenuSeparator;

export interface ExtraMenuItemSelectEvent {
  item: ExtraMenuAction;
  originalEvent: unknown;
}

export type ExtraMenuElementLike = HTMLElement | ElementRef<HTMLElement>;
export type ExtraMenuAppendTo = 'body' | 'self' | ExtraMenuElementLike;
export type ExtraMenuAnchorLike = Event | ExtraMenuElementLike | { x: number; y: number };

function isMenuSeparator(item: ExtraMenuItem): item is ExtraMenuSeparator {
  return (item as ExtraMenuSeparator).separator === true;
}

function isMenuGroup(item: ExtraMenuItem): item is ExtraMenuGroup {
  return Array.isArray((item as ExtraMenuGroup).items);
}

@Component({
  selector: 'extra-menu',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-menu
      #menuRef
      [model]="primeItems"
      [popup]="popup"
      [appendTo]="resolvedAppendTo"
      [ariaLabel]="ariaLabel"
      (onShow)="handleShow()"
      (onHide)="handleHide()"
    >
      @if (startTpl) {
        <ng-template pTemplate="start">
          <ng-container [ngTemplateOutlet]="startTpl.template"></ng-container>
        </ng-template>
      }
      <ng-template pTemplate="submenuheader" let-submenu>
        @if (submenuHeaderTpl) {
          <ng-container
            [ngTemplateOutlet]="submenuHeaderTpl.template"
            [ngTemplateOutletContext]="{ $implicit: submenu }"
          ></ng-container>
        } @else {
          {{ submenu.label }}
        }
      </ng-template>
      <ng-template pTemplate="item" let-item>
        @if (itemTpl) {
          <ng-container
            [ngTemplateOutlet]="itemTpl.template"
            [ngTemplateOutletContext]="{ $implicit: item }"
          ></ng-container>
        } @else {
          <a
            class="p-menu-item-link"
            [attr.tabindex]="-1"
            [class.p-disabled]="item.disabled"
            [class.p-menu-item-selected]="item.selected"
            [attr.href]="item.href || null"
            [attr.target]="item.target || null"
          >
            @if (item.icon) {
              <span [class]="item.icon + ' p-menu-item-icon'"></span>
            }
            @if (item.caption) {
              <div class="menu-item-label">
                <span class="p-menu-item-label">{{ item.label }}</span>
                <small class="menu-item-caption">{{ item.caption }}</small>
              </div>
            } @else {
              <span class="p-menu-item-label">{{ item.label }}</span>
            }
            @if (item.iconEnd) {
              <span [class]="item.iconEnd + ' p-menu-item-icon-end'"></span>
            }
          </a>
        }
      </ng-template>
      @if (endTpl) {
        <ng-template pTemplate="end">
          <ng-container [ngTemplateOutlet]="endTpl.template"></ng-container>
        </ng-template>
      }
    </p-menu>
  `
})
export class ExtraMenuComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() items: ExtraMenuItem[] = [];
  @Input() popup = false;
  @Input() open = false;
  @Input() appendTo: ExtraMenuAppendTo = 'body';
  @Input() ariaLabel?: string;

  @Output() onItemSelect = new EventEmitter<ExtraMenuItemSelectEvent>();
  @Output() onOpenChange = new EventEmitter<boolean>();

  @ViewChild('menuRef') private menuRef!: Menu;

  @ContentChildren(ExtraMenuTemplateDirective) private templates!: QueryList<ExtraMenuTemplateDirective>;

  itemTpl?: ExtraMenuTemplateDirective;
  submenuHeaderTpl?: ExtraMenuTemplateDirective;
  startTpl?: ExtraMenuTemplateDirective;
  endTpl?: ExtraMenuTemplateDirective;

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly cdr = inject(ChangeDetectorRef);

  private syntheticAnchor?: HTMLElement;
  private suppressOpenSync = false;

  get resolvedAppendTo(): 'body' | HTMLElement | undefined {
    if (this.appendTo === 'self') return undefined;
    if (this.appendTo === 'body') return 'body';
    return this.appendTo instanceof ElementRef ? this.appendTo.nativeElement : this.appendTo;
  }

  get primeItems(): MenuItem[] {
    return this.items.map((item) => this.toPrimeItem(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && !changes['open'].firstChange && !this.suppressOpenSync) {
      if (this.open) this.show();
      else this.hide();
    }
  }

  ngAfterContentInit(): void {
    this.itemTpl = this.templates.find((tpl) => tpl.extraMenuTemplate === 'item');
    this.submenuHeaderTpl = this.templates.find((tpl) => tpl.extraMenuTemplate === 'submenuHeader');
    this.startTpl = this.templates.find((tpl) => tpl.extraMenuTemplate === 'start');
    this.endTpl = this.templates.find((tpl) => tpl.extraMenuTemplate === 'end');
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    if (this.open) this.show();
  }

  ngOnDestroy(): void {
    this.clearSyntheticAnchor();
  }

  /** Переключить всплывающее меню. */
  toggle(anchor?: ExtraMenuAnchorLike): void {
    if (this.menuRef.visible) this.hide();
    else this.show(anchor);
  }

  /** Открыть всплывающее меню. При отсутствии anchor используется хост-элемент компонента. */
  show(anchor?: ExtraMenuAnchorLike): void {
    this.menuRef.show(this.toPrimeAnchorEvent(anchor));
  }

  /** Закрыть всплывающее меню. */
  hide(): void {
    this.menuRef.hide();
    this.clearSyntheticAnchor();
  }

  handleShow(): void {
    this.emitOpenChange(true);
  }

  handleHide(): void {
    this.emitOpenChange(false);
  }

  private emitOpenChange(open: boolean): void {
    if (this.open === open) return;
    this.suppressOpenSync = true;
    this.open = open;
    this.onOpenChange.emit(open);
    this.suppressOpenSync = false;
  }

  /** PrimeNG `show()` вычисляет якорь из `event.currentTarget` — нормализуем под это. */
  private toPrimeAnchorEvent(anchor?: ExtraMenuAnchorLike): { currentTarget: HTMLElement } {
    if (!anchor) return { currentTarget: this.elementRef.nativeElement };
    if (anchor instanceof Event) {
      return { currentTarget: (anchor.currentTarget as HTMLElement) ?? (anchor.target as HTMLElement) };
    }
    if (anchor instanceof ElementRef) return { currentTarget: anchor.nativeElement };
    if (anchor instanceof HTMLElement) return { currentTarget: anchor };
    return { currentTarget: this.createCoordinateAnchor(anchor.x, anchor.y) };
  }

  /** Координатный якорь: PrimeNG позиционирует меню через getBoundingClientRect() реального элемента. */
  private createCoordinateAnchor(x: number, y: number): HTMLElement {
    this.clearSyntheticAnchor();
    const el = this.document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = '0';
    el.style.height = '0';
    this.document.body.appendChild(el);
    this.syntheticAnchor = el;
    return el;
  }

  private clearSyntheticAnchor(): void {
    this.syntheticAnchor?.remove();
    this.syntheticAnchor = undefined;
  }

  private toPrimeItem(item: ExtraMenuItem): MenuItem {
    if (isMenuSeparator(item)) return { separator: true };
    if (isMenuGroup(item)) {
      return {
        label: item.label,
        visible: item.visible,
        id: item.id,
        items: item.items.map((action) => this.toPrimeAction(action))
      };
    }
    return this.toPrimeAction(item);
  }

  /**
   * Спека называет поле ссылки `href`, PrimeNG читает `url` для решения "это реальная ссылка,
   * не звать preventDefault()". Кладём оба — `href` остаётся в контексте слота `item` как есть.
   */
  private toPrimeAction(action: ExtraMenuAction): MenuItem {
    return {
      label: action.label,
      caption: action.caption,
      icon: action.icon,
      iconEnd: action.iconEnd,
      selected: action.selected,
      disabled: action.disabled,
      visible: action.visible,
      id: action.id,
      href: action.href,
      target: action.target,
      url: action.href,
      command: (event: MenuItemCommandEvent) => {
        const selectEvent: ExtraMenuItemSelectEvent = { item: action, originalEvent: event.originalEvent };
        action.command?.(selectEvent);
        this.onItemSelect.emit(selectEvent);
      }
    };
  }
}
