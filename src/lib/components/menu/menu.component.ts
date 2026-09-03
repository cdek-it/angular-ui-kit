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
  @Output() onShow = new EventEmitter<void>();
  @Output() onHide = new EventEmitter<void>();

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

  primeItems: MenuItem[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) this.syncPrimeItems();
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
    this.syncOpen(true);
    this.onShow.emit();
  }

  handleHide(): void {
    this.syncOpen(false);
    this.onHide.emit();
  }

  /**
   * PrimeNG раздаёт `model` через *ngFor без trackBy: новый объект пункта — это пересоздание
   * <li>, вместе с которым обрывается CSS-переход. Поэтому элементы живут между обновлениями
   * `items`, меняются только их поля — это и сохраняет identity для *ngFor.
   *
   * Сам массив-обёртка при этом всегда новый: p-menu — отдельный OnPush-компонент, и если бы
   * [model] получал ту же ссылку, что и в прошлый раз, Angular не гарантирует p-menu корректный
   * повторный проход (наблюдалось состояние, где заголовок группы обновился, а её дети — нет).
   * Одна лишняя аллокация маленького массива несравнимо дешевле такой рассинхронизации.
   */
  private syncPrimeItems(): void {
    this.primeItems = [
      ...this.mergePrimeItems(this.primeItems, this.items.map((item) => this.toPrimeItem(item)))
    ];
  }

  private mergePrimeItems(current: MenuItem[], next: MenuItem[]): MenuItem[] {
    if (current.length !== next.length) return next;
    next.forEach((item, index) => {
      const target = current[index];
      const nested = target.items;
      this.resetToShapeOf(target, item);
      Object.assign(target, item);
      if (nested && item.items) target.items = this.mergePrimeItems(nested, item.items);
    });
    return current;
  }

  /**
   * Object.assign не удаляет поля, которых нет в источнике. Если на том же индексе пункт сменил
   * "вид" (была группа с `items`, стал экшен без него, или наоборот) — старые поля продолжали бы
   * висеть на объекте: например, стейл `items` заставлял бы PrimeNG `hasSubMenu()` и дальше
   * считать пункт группой. Стираем всё, чего нет в новой форме, перед тем как наложить её поля.
   */
  private resetToShapeOf(target: MenuItem, shape: MenuItem): void {
    for (const key of Object.keys(target)) {
      if (!(key in shape)) delete (target as Record<string, unknown>)[key];
    }
  }

  /** Держит [open] в согласии с реальной видимостью после show()/hide() или клика по пункту. */
  private syncOpen(open: boolean): void {
    if (this.open === open) return;
    this.suppressOpenSync = true;
    this.open = open;
    this.suppressOpenSync = false;
  }

  /** PrimeNG `show()` вычисляет якорь из `event.currentTarget` — нормализуем под это. */
  private toPrimeAnchorEvent(anchor?: ExtraMenuAnchorLike): { currentTarget: HTMLElement } {
    if (!anchor) return { currentTarget: this.elementRef.nativeElement };
    if (anchor instanceof Event) return { currentTarget: this.resolveEventAnchor(anchor) };
    if (anchor instanceof ElementRef) return { currentTarget: anchor.nativeElement };
    if (anchor instanceof HTMLElement) return { currentTarget: anchor };
    return { currentTarget: this.createCoordinateAnchor(anchor.x, anchor.y) };
  }

  /**
   * Обёртки кита (`<extra-button>`) — инлайновые элементы: их getBoundingClientRect() описывает
   * строку текста, а не отрисованную кнопку, и меню всплывает поверх триггера. Берём из цепочки
   * события ближайший интерактивный элемент — он и есть реальный якорь.
   */
  private resolveEventAnchor(event: Event): HTMLElement {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const trigger = (event.target as HTMLElement | null)?.closest<HTMLElement>('button, a, [role="button"]');
    if (trigger && currentTarget?.contains(trigger)) return trigger;
    return currentTarget ?? (event.target as HTMLElement) ?? this.elementRef.nativeElement;
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
      styleClass: action.selected ? 'p-menuitem-checked' : undefined,
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
