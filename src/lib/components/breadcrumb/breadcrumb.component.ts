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
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { ExtraBreadcrumbTemplateDirective } from './breadcrumb-template.directive';

/** Элемент навигационной цепочки (а также домашний элемент `home`). */
export interface ExtraBreadcrumbItem {
  /**
   * Текст элемента. Обязателен для элементов цепочки: без текста они нечитаемы.
   * У домашнего элемента не отображается — он показывается только иконкой.
   */
  label?: string;
  /** CSS-класс иконки tabler целиком, например `'ti ti-package'`. Пустая строка — иконки нет. */
  icon?: string;
  /** Элемент заблокирован: не является ссылкой, не фокусируется и не вызывает `command`/`onItemSelect`. */
  disabled?: boolean;
  /**
   * Адрес, куда ведёт элемент, — значение атрибута `href` ссылки. Переход выполняет браузер.
   * Если не задан, элемент не переходит сам: навигацию делает приложение в `command` или `onItemSelect`
   * (например, через Angular Router).
   */
  href?: string;
  /**
   * Где открыть адрес из `href` — значение атрибута `target` ссылки: `'_self'` (по умолчанию, в текущей
   * вкладке), `'_blank'` (в новой вкладке) или имя окна/фрейма. Без `href` не действует.
   */
  target?: string;
  /** Обработчик выбора элемента. Вызывается перед событием `onItemSelect` компонента. */
  command?: (event: ExtraBreadcrumbItemSelectEvent) => void;
  /** Значение атрибута `id` у элемента списка `<li>`. */
  id?: string;
}

/** Событие выбора элемента цепочки — передаётся в `command` элемента и в `onItemSelect` компонента. */
export interface ExtraBreadcrumbItemSelectEvent {
  /** Выбранный элемент — тот же объект, что передан в `items` или `home`. */
  item: ExtraBreadcrumbItem;
  /** Исходное событие браузера: клик мышью или нажатие Enter. */
  originalEvent: Event;
}

/** Иконка домашнего элемента, если в `home` не задана своя `icon`. */
const DEFAULT_HOME_ICON = 'ti ti-home';

/** Чем является элемент для отрисовки ссылки: домашний, текущая страница или обычное звено. */
interface ExtraBreadcrumbLink {
  item: ExtraBreadcrumbItem;
  home: boolean;
  current: boolean;
}

@Component({
  selector: 'extra-breadcrumb',
  host: { style: 'display: contents' },
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Breadcrumb, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-breadcrumb [model]="primeItems" [home]="primeHome" [homeAriaLabel]="homeAriaLabel" [pt]="pt">
      <ng-template pTemplate="item" let-primeItem>
        <ng-container [ngTemplateOutlet]="linkTpl" [ngTemplateOutletContext]="{ $implicit: linkOf(primeItem) }" />
      </ng-template>
    </p-breadcrumb>

    <ng-template #linkTpl let-link>
      <a
        class="p-breadcrumb-item-link"
        [attr.href]="isInteractive(link) ? link.item.href || null : null"
        [attr.target]="isInteractive(link) ? link.item.target || null : null"
        [attr.tabindex]="isInteractive(link) ? 0 : -1"
        [attr.aria-label]="link.home ? homeAriaLabel || null : null"
        [attr.aria-current]="link.current ? 'page' : null"
        [attr.aria-disabled]="link.item.disabled ? 'true' : null"
        (click)="handleClick($event, link)"
        (keydown.enter)="handleEnter($event, link)"
      >
        @if (itemTpl) {
          <ng-container [ngTemplateOutlet]="itemTpl.template" [ngTemplateOutletContext]="{ $implicit: link.item }" />
        } @else {
          @if (link.home) {
            <span [class]="'p-breadcrumb-item-icon ' + (link.item.icon || defaultHomeIcon)"></span>
          } @else {
            @if (link.item.icon) {
              <span [class]="'p-breadcrumb-item-icon ' + link.item.icon"></span>
            }
            @if (link.item.label) {
              <span class="p-breadcrumb-item-label">{{ link.item.label }}</span>
            }
          }
        }
      </a>
    </ng-template>
  `
})
export class ExtraBreadcrumbComponent implements OnChanges, AfterContentInit {
  /** Элементы цепочки; последний — текущая страница (`aria-current="page"`, приглушён, не ссылка). */
  @Input() items: ExtraBreadcrumbItem[] = [];
  /** Показывать домашний элемент в начале цепочки. */
  @Input() showHome = true;
  /** Домашний элемент: ссылка на корень раздела. Отображается только иконкой (по умолчанию `ti ti-home`). */
  @Input() home: ExtraBreadcrumbItem = { icon: DEFAULT_HOME_ICON };
  /** Метка домашнего элемента для скринридеров. Задаётся приложением: без неё у ссылки-иконки нет имени. */
  @Input() homeAriaLabel: string | undefined;
  /** Метка `<nav>` для скринридеров; нужна, если на странице несколько навигационных областей. */
  @Input() ariaLabel: string | undefined;

  /** Выбор элемента. Не срабатывает для текущей страницы и элементов с `disabled`. */
  @Output() onItemSelect = new EventEmitter<ExtraBreadcrumbItemSelectEvent>();

  @ContentChildren(ExtraBreadcrumbTemplateDirective) private templates!: QueryList<ExtraBreadcrumbTemplateDirective>;

  itemTpl?: ExtraBreadcrumbTemplateDirective;

  readonly defaultHomeIcon = DEFAULT_HOME_ICON;

  primeItems: MenuItem[] | undefined;
  primeHome: MenuItem | undefined;
  /** У p-breadcrumb нет инпута для подписи `<nav>` — ставим атрибут через PassThrough. */
  pt: { root: Record<string, string> } = { root: {} };

  private readonly cdr = inject(ChangeDetectorRef);

  /**
   * PrimeNG отдаёт в шаблон `item` свой MenuItem; по нему находим исходный элемент и его роль в
   * цепочке. WeakMap — чтобы не тащить в PrimeNG-модель служебные поля.
   */
  private links = new WeakMap<MenuItem, ExtraBreadcrumbLink>();

  ngOnChanges(): void {
    this.links = new WeakMap();
    // p-breadcrumb рисует разделитель после home при любом непустом-по-ссылке model (даже `[]`),
    // поэтому пустую цепочку передаём как undefined.
    this.primeItems = this.items.length
      ? this.items.map((item, index) => this.toPrimeItem(item, false, index === this.items.length - 1))
      : undefined;
    this.primeHome = this.showHome ? this.toPrimeItem(this.home, true, false) : undefined;
    this.pt = { root: this.ariaLabel ? { 'aria-label': this.ariaLabel } : {} };
  }

  ngAfterContentInit(): void {
    this.itemTpl = this.templates.find((tpl) => tpl.extraBreadcrumbTemplate === 'item');
    this.cdr.detectChanges();
  }

  linkOf(primeItem: MenuItem): ExtraBreadcrumbLink | undefined {
    return this.links.get(primeItem);
  }

  /** Текущая страница и заблокированные элементы — не ссылки: не фокусируются и не выбираются. */
  isInteractive(link: ExtraBreadcrumbLink): boolean {
    return !link.current && !link.item.disabled;
  }

  handleClick(event: MouseEvent, link: ExtraBreadcrumbLink): void {
    if (!this.isInteractive(link)) {
      event.preventDefault();
      return;
    }
    // Без href это не навигация браузера — переход делает приложение в command/onItemSelect.
    if (!link.item.href) event.preventDefault();
    this.select(event, link.item);
  }

  /** У `<a>` без href Enter не порождает click — дублируем выбор с клавиатуры. */
  handleEnter(event: Event, link: ExtraBreadcrumbLink): void {
    if (link.item.href || !this.isInteractive(link)) return;
    event.preventDefault();
    this.select(event, link.item);
  }

  private select(originalEvent: Event, item: ExtraBreadcrumbItem): void {
    const selectEvent: ExtraBreadcrumbItemSelectEvent = { item, originalEvent };
    item.command?.(selectEvent);
    this.onItemSelect.emit(selectEvent);
  }

  /**
   * В PrimeNG уходят только поля, влияющие на его собственную разметку `<li>`: id и класс
   * `p-disabled`. Ссылку целиком рисует наш шаблон `item`.
   */
  private toPrimeItem(item: ExtraBreadcrumbItem, home: boolean, current: boolean): MenuItem {
    const primeItem: MenuItem = { id: item.id, disabled: item.disabled };
    this.links.set(primeItem, { item, home, current });
    return primeItem;
  }
}
