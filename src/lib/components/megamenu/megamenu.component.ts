import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  QueryList
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MegaMenu } from 'primeng/megamenu';
import { MegaMenuItem, MenuItem, MenuItemCommandEvent, PrimeTemplate } from 'primeng/api';
import { ExtraMegaMenuTemplateDirective } from './megamenu-template.directive';

export type ExtraMegaMenuOrientation = 'horizontal' | 'vertical';

/** Разделитель между пунктами. */
export interface ExtraMegaMenuSeparator {
  separator: true;
}

/** Пункт верхнего уровня: простая ссылка или пункт, раскрывающий панель с колонками. */
export interface ExtraMegaMenuRootItem {
  /** Текст пункта. */
  label?: string;
  /** CSS-класс иконки tabler перед текстом целиком, например `'ti ti-package'`. Пустая строка — иконки нет. */
  icon?: string;
  /** Колонки раскрывающейся панели. Без них пункт — простая ссылка. */
  items?: ExtraMegaMenuColumn[];
  /** Пункт отображается. */
  visible?: boolean;
  /**
   * Адрес, куда ведёт пункт, — значение атрибута `href` ссылки. Переход выполняет браузер.
   * Если не задан, навигацию делает приложение в `command` или `onItemSelect`.
   */
  href?: string;
  /** Где открыть `href` — атрибут `target`: `'_self'` (в текущей вкладке), `'_blank'` (в новой). Без `href` не действует. */
  target?: string;
  /** Обработчик выбора пункта. Вызывается перед событием `onItemSelect`; у пункта с панелью не вызывается. */
  command?: (event: ExtraMegaMenuItemSelectEvent) => void;
  /** Значение атрибута `id` у элемента пункта. */
  id?: string;
}

/** Пункт верхнего уровня или разделитель. */
export type ExtraMegaMenuItem = ExtraMegaMenuRootItem | ExtraMegaMenuSeparator;

/** Колонка раскрывающейся панели — список групп. */
export type ExtraMegaMenuColumn = ExtraMegaMenuGroup[];

/** Группа пунктов в колонке панели. */
export interface ExtraMegaMenuGroup {
  /** Заголовок группы. Не фокусируется и не выбирается. */
  label?: string;
  /** Пункты группы и разделители между ними. */
  items: (ExtraMegaMenuAction | ExtraMegaMenuSeparator)[];
  /** Группа отображается. */
  visible?: boolean;
  /** Значение атрибута `id` у списка группы. */
  id?: string;
}

/** Пункт внутри раскрывающейся панели. */
export interface ExtraMegaMenuAction {
  /** Текст пункта. */
  label?: string;
  /** Подпись под текстом: дополняет `label` новой информацией и не повторяет его. */
  caption?: string;
  /** CSS-класс иконки tabler перед текстом целиком. Пустая строка — иконки нет. */
  icon?: string;
  /** CSS-класс иконки tabler после текста целиком. Пустая строка — иконки нет. */
  iconEnd?: string;
  /** Пункт отмечен как выбранный. */
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
  command?: (event: ExtraMegaMenuItemSelectEvent) => void;
  /** Значение атрибута `id` у элемента пункта. */
  id?: string;
}

/** Событие выбора пункта — передаётся в `command` пункта и в `onItemSelect` компонента. */
export interface ExtraMegaMenuItemSelectEvent {
  /** Выбранный пункт — тот же объект, что передан в `items`. */
  item: ExtraMegaMenuRootItem | ExtraMegaMenuAction;
  /** Исходное событие браузера: клик мышью или нажатие клавиши. */
  originalEvent: Event;
}

/** Чем является пункт для отрисовки: пункт верхнего уровня или пункт панели. */
interface ExtraMegaMenuLink {
  item: ExtraMegaMenuRootItem | ExtraMegaMenuAction;
  root: boolean;
  /** Пункт верхнего уровня раскрывает панель. */
  hasPanel: boolean;
}

function isSeparator(item: ExtraMegaMenuItem | ExtraMegaMenuAction): item is ExtraMegaMenuSeparator {
  return (item as ExtraMegaMenuSeparator).separator === true;
}

@Component({
  selector: 'extra-megamenu',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MegaMenu, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-megamenu
      [model]="primeItems"
      [orientation]="orientation"
      [breakpoint]="breakpoint"
      [scrollHeight]="scrollHeight ?? ''"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [tabindex]="tabindex"
    >
      <ng-template pTemplate="item" let-primeItem>
        <ng-container [ngTemplateOutlet]="linkTpl" [ngTemplateOutletContext]="{ $implicit: linkOf(primeItem) }" />
      </ng-template>
      <ng-template pTemplate="buttonicon">
        <span class="p-megamenu-mobile-button-icon ti ti-menu-2"></span>
      </ng-template>
    </p-megamenu>

    <!--
      Вся строка пункта — одна ссылка: PrimeNG на Enter/Space кликает первую <a> внутри пункта, а клик
      ловит его обёртка пункта (command, раскрытие панели). Поэтому слот itemEnd тоже внутри ссылки.
    -->
    <ng-template #linkTpl let-link>
      <a
        class="p-megamenu-item-link"
        tabindex="-1"
        [attr.href]="link.item.href || null"
        [attr.target]="link.item.target || null"
      >
        @if (link.item.icon) {
          <span [class]="'p-megamenu-item-icon ' + link.item.icon"></span>
        }
        @if (!link.root && link.item.caption) {
          <span class="megamenu-item-label">
            <span class="p-megamenu-item-label">{{ link.item.label }}</span>
            <small class="megamenu-item-caption">{{ link.item.caption }}</small>
          </span>
        } @else {
          <span class="p-megamenu-item-label">{{ link.item.label }}</span>
        }
        @if (!link.root && itemEndTpl) {
          <ng-container [ngTemplateOutlet]="itemEndTpl.template" [ngTemplateOutletContext]="{ $implicit: link.item }" />
        }
        @if (!link.root && link.item.iconEnd) {
          <span [class]="'p-megamenu-item-icon ' + link.item.iconEnd"></span>
        }
        @if (link.hasPanel) {
          <span class="p-megamenu-submenu-icon ti ti-chevron-right" aria-hidden="true"></span>
        }
      </a>
    </ng-template>
  `
})
export class ExtraMegaMenuComponent implements OnChanges, AfterContentInit {
  /** Пункты верхнего уровня. */
  @Input() items: ExtraMegaMenuItem[] = [];
  /** Раскладка пунктов: `horizontal` — строка в шапке, `vertical` — список в боковой панели. */
  @Input() orientation: ExtraMegaMenuOrientation = 'horizontal';
  /** Ширина экрана, ниже которой меню сворачивается в мобильную кнопку (CSS-значение). */
  @Input() breakpoint = '960px';
  /** Максимальная высота списка пунктов (корневого и списков в панели), CSS-значение. Не задано — без ограничения. */
  @Input() scrollHeight: string | undefined;
  /** Метка для программ экранного доступа. */
  @Input() ariaLabel: string | undefined;
  /** `id` внешнего элемента-метки для доступности. */
  @Input() ariaLabelledBy: string | undefined;
  /** Порядок перехода по Tab. */
  @Input() tabindex = 0;

  /** Выбор пункта. Не срабатывает у пункта верхнего уровня, раскрывающего панель. */
  @Output() onItemSelect = new EventEmitter<ExtraMegaMenuItemSelectEvent>();

  @ContentChildren(ExtraMegaMenuTemplateDirective) private templates!: QueryList<ExtraMegaMenuTemplateDirective>;

  itemEndTpl?: ExtraMegaMenuTemplateDirective;

  primeItems: MegaMenuItem[] = [];

  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * PrimeNG отдаёт в шаблон `item` свой MenuItem; по нему находим исходный пункт и его роль.
   * WeakMap — чтобы не тащить в PrimeNG-модель служебные поля.
   */
  private links = new WeakMap<MenuItem, ExtraMegaMenuLink>();

  ngOnChanges(): void {
    this.links = new WeakMap();
    this.primeItems = this.items.map((item) => (isSeparator(item) ? { separator: true } : this.toPrimeRoot(item)));
  }

  ngAfterContentInit(): void {
    this.itemEndTpl = this.templates.find((tpl) => tpl.extraMegaMenuTemplate === 'itemEnd');
    this.cdr.detectChanges();
  }

  linkOf(primeItem: MenuItem): ExtraMegaMenuLink | undefined {
    return this.links.get(primeItem);
  }

  private toPrimeRoot(item: ExtraMegaMenuRootItem): MegaMenuItem {
    const hasPanel = !!item.items?.length;
    const primeItem: MegaMenuItem = {
      ...this.toPrimeLinkFields(item),
      items: hasPanel
        ? item.items!.map((column) =>
            column.map((group) => ({
              label: group.label,
              visible: group.visible,
              id: group.id,
              items: group.items.map((entry) => (isSeparator(entry) ? { separator: true } : this.toPrimeAction(entry)))
            }))
          )
        : undefined,
      // Пункт с панелью только раскрывает её — это не выбор.
      command: hasPanel ? undefined : (event: MenuItemCommandEvent) => this.select(item, event)
    };
    this.links.set(primeItem, { item, root: true, hasPanel });
    return primeItem;
  }

  private toPrimeAction(item: ExtraMegaMenuAction): MenuItem {
    const primeItem: MenuItem = {
      ...this.toPrimeLinkFields(item),
      styleClass: item.selected ? 'p-megamenu-item-selected' : undefined,
      command: (event: MenuItemCommandEvent) => this.select(item, event)
    };
    this.links.set(primeItem, { item, root: false, hasPanel: false });
    return primeItem;
  }

  /**
   * Поля, которые читает разметка самого PrimeNG: aria-label пункта, видимость, id. Ссылку рисует
   * наш шаблон `item`, поэтому href/target в PrimeNG-модель не передаются.
   */
  private toPrimeLinkFields(item: ExtraMegaMenuRootItem | ExtraMegaMenuAction): MenuItem {
    return { label: item.label, visible: item.visible, id: item.id };
  }

  private select(item: ExtraMegaMenuRootItem | ExtraMegaMenuAction, event: MenuItemCommandEvent): void {
    const selectEvent: ExtraMegaMenuItemSelectEvent = { item, originalEvent: event.originalEvent as Event };
    item.command?.(selectEvent);
    this.onItemSelect.emit(selectEvent);
  }
}
