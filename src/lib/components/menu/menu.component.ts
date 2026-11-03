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

/** Пункт меню: действие или ссылка. */
export type ExtraMenuAction = {
  /** Текст пункта. */
  label?: string;
  /** Подпись под текстом: одна строка, без точки в конце. */
  caption?: string;
  /** CSS-класс иконки tabler перед текстом целиком, например `'ti ti-user'`. Пустая строка — иконки нет. */
  icon?: string;
  /** CSS-класс иконки tabler после текста целиком. Пустая строка — иконки нет. */
  iconEnd?: string;
  /** Пункт отмечен как текущий (активный раздел). */
  selected?: boolean;
  /** Пункт отображается. */
  visible?: boolean;
  /**
   * Адрес, куда ведёт пункт, — значение атрибута `href` ссылки. Переход выполняет браузер.
   * Если не задан, навигацию делает приложение в `command` или `onItemSelect`.
   */
  href?: string;
  /** Где открыть `href` — атрибут `target`: `'_self'` (в текущей вкладке), `'_blank'` (в новой). Без `href` не действует. */
  target?: string;
  /** Обработчик выбора пункта. Вызывается перед событием `onItemSelect`. */
  command?: (event: ExtraMenuItemSelectEvent) => void;
  /** Значение атрибута `id` у элемента пункта. */
  id?: string;
};

/** Группа пунктов с заголовком. Заголовок не фокусируется и не выбирается. */
export type ExtraMenuGroup = {
  /** Заголовок группы. */
  label?: string;
  /** Пункты группы и разделители между ними. Вложенных групп нет. */
  items: (ExtraMenuAction | ExtraMenuSeparator)[];
  /** Группа отображается. */
  visible?: boolean;
  /** Значение атрибута `id` у заголовка группы. */
  id?: string;
};

/** Разделитель между пунктами. */
export type ExtraMenuSeparator = {
  separator: true;
};

/** Пункт меню, группа или разделитель. */
export type ExtraMenuItem = ExtraMenuAction | ExtraMenuGroup | ExtraMenuSeparator;

/** Событие выбора пункта — передаётся в `command` пункта и в `onItemSelect` компонента. */
export interface ExtraMenuItemSelectEvent {
  /** Выбранный пункт — тот же объект, что передан в `items`. */
  item: ExtraMenuAction;
  /** Исходное событие браузера: клик мышью или нажатие клавиши. */
  originalEvent: Event;
}

/** Элемент или ref на него. */
export type ExtraMenuElementLike = HTMLElement | ElementRef<HTMLElement>;
/** Контейнер рендера всплывающего меню. */
export type ExtraMenuAppendTo = 'body' | 'self' | ExtraMenuElementLike;
/** Якорь всплывающего меню: событие (якорь — `event.currentTarget`), элемент, ref или координаты. */
export type ExtraMenuAnchorLike = Event | ExtraMenuElementLike | { x: number; y: number };

/** Поле PrimeNG-модели со ссылкой на исходный пункт — для контекста слота `itemEnd`. */
const EXTRA_ACTION = 'extraAction';

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
      <!--
        Вся строка пункта — одна ссылка: PrimeNG на Enter кликает первую <a> внутри пункта, а клик ловит
        его обёртка пункта (command, закрытие popup). Поэтому слот itemEnd тоже внутри ссылки.
      -->
      <ng-template pTemplate="item" let-item>
        <a class="p-menu-item-link" [attr.tabindex]="-1" [attr.href]="item.href || null" [attr.target]="item.target || null">
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
          @if (itemEndTpl) {
            <ng-container
              [ngTemplateOutlet]="itemEndTpl.template"
              [ngTemplateOutletContext]="{ $implicit: item.extraAction }"
            />
          }
          @if (item.iconEnd) {
            <span [class]="item.iconEnd + ' p-menu-item-icon-end'"></span>
          }
        </a>
      </ng-template>
    </p-menu>
  `
})
export class ExtraMenuComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {
  /** Пункты меню, группы и разделители. */
  @Input() items: ExtraMenuItem[] = [];
  /** Режим всплывающего меню: открывается методами `toggle()`/`show()` или через `open`. */
  @Input() popup = false;
  /** Видимость всплывающего меню (управляемое состояние). */
  @Input() open = false;
  /** Контейнер рендера всплывающего меню. */
  @Input() appendTo: ExtraMenuAppendTo = 'body';
  /** Метка для программ экранного доступа. */
  @Input() ariaLabel?: string;

  /** Выбор пункта. */
  @Output() onItemSelect = new EventEmitter<ExtraMenuItemSelectEvent>();
  /** Открытие всплывающего меню. */
  @Output() onShow = new EventEmitter<void>();
  /** Закрытие всплывающего меню. */
  @Output() onHide = new EventEmitter<void>();

  @ViewChild('menuRef') private menuRef!: Menu;

  @ContentChildren(ExtraMenuTemplateDirective) private templates!: QueryList<ExtraMenuTemplateDirective>;

  itemEndTpl?: ExtraMenuTemplateDirective;

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
    this.itemEndTpl = this.templates.find((tpl) => tpl.extraMenuTemplate === 'itemEnd');
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
        items: item.items.map((entry) => (isMenuSeparator(entry) ? { separator: true } : this.toPrimeAction(entry)))
      };
    }
    return this.toPrimeAction(item);
  }

  /**
   * Спека называет поле ссылки `href`, PrimeNG читает `url` для решения "это реальная ссылка,
   * не звать preventDefault()". Кладём оба: `href` читает наш шаблон пункта.
   * `extraAction` — исходный пункт для контекста слота `itemEnd`; живёт полем, а не в WeakMap,
   * потому что PrimeNG-объекты переиспользуются между обновлениями `items` (см. mergePrimeItems).
   */
  private toPrimeAction(action: ExtraMenuAction): MenuItem {
    return {
      label: action.label,
      caption: action.caption,
      icon: action.icon,
      iconEnd: action.iconEnd,
      selected: action.selected,
      visible: action.visible,
      id: action.id,
      styleClass: action.selected ? 'p-menuitem-checked' : undefined,
      href: action.href,
      target: action.target,
      url: action.href,
      [EXTRA_ACTION]: action,
      command: (event: MenuItemCommandEvent) => {
        const selectEvent: ExtraMenuItemSelectEvent = { item: action, originalEvent: event.originalEvent as Event };
        action.command?.(selectEvent);
        this.onItemSelect.emit(selectEvent);
      }
    };
  }
}
