import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { ExtraAccordionPanelTemplateDirective } from './accordion-panel-template.directive';

let nextPanelId = 0;

/**
 * Отдельная панель аккордеона: заголовок (слот `header`) + раскрываемое тело (слот `content`,
 * реализован голым `<ng-content>`). Передаётся как дочерний элемент `ExtraAccordionComponent`.
 *
 * Сам по себе ничего не рендерит — `p-accordion-panel`/`p-accordion-header`/`p-accordion-content`
 * рендерит `ExtraAccordionComponent` в собственном шаблоне (см. его комментарий, почему).
 *
 * ```html
 * <extra-accordion>
 *   <extra-accordion-panel icon="ti ti-package" [expanded]="true">
 *     <ng-template extraAccordionPanelTemplate="header">Данные отправления</ng-template>
 *     Заказ №ЦД-00123456
 *   </extra-accordion-panel>
 * </extra-accordion>
 * ```
 */
@Component({
  selector: 'extra-accordion-panel',
  standalone: true,
  template: `<ng-template #bodyTpl><ng-content /></ng-template>`
})
export class ExtraAccordionPanelComponent implements AfterContentInit {
  /** CSS-класс иконки заголовка. */
  @Input() icon: string | undefined;
  /** Раскрыта ли панель изначально. Влияет только на стартовое состояние `ExtraAccordionComponent`. */
  @Input() expanded = false;
  /** Панель недоступна для раскрытия. */
  @Input() disabled = false;

  /** Уникальное значение панели для PrimeNG `p-accordion` (идентификатор, не порядковый индекс). */
  readonly panelId = nextPanelId++;

  @ViewChild('bodyTpl', { static: true }) bodyTpl!: TemplateRef<unknown>;

  @ContentChildren(ExtraAccordionPanelTemplateDirective)
  private templates!: QueryList<ExtraAccordionPanelTemplateDirective>;

  headerTpl?: ExtraAccordionPanelTemplateDirective;

  ngAfterContentInit(): void {
    this.headerTpl = this.templates.find((t) => t.extraAccordionPanelTemplate === 'header');
  }
}

/**
 * Контейнер из раскрывающихся панелей (`ExtraAccordionPanelComponent`). Оборачивает PrimeNG
 * `p-accordion`; какие панели раскрыты изначально — определяется их `[expanded]="true"`.
 *
 * `p-accordion-panel` (и header/content) рендерятся здесь, а не в шаблоне
 * `ExtraAccordionPanelComponent` — PrimeNG получает `Accordion` через `inject(forwardRef(() =>
 * Accordion))`, а DI спроецированного (`<ng-content>`) компонента резолвится по месту его
 * объявления у вызывающего, а не по месту фактического рендера. Поэтому реальные PrimeNG-теги
 * должны лежать прямо в шаблоне контейнера; `ExtraAccordionPanelComponent` — только держатель
 * данных/шаблонов (icon/expanded/disabled + TemplateRef на header и content), которые сюда
 * подставляются через `ngTemplateOutlet`.
 */
@Component({
  selector: 'extra-accordion',
  standalone: true,
  host: { style: 'display: block' },
  imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent, NgTemplateOutlet],
  template: `
    <p-accordion [multiple]="multiple" [value]="initialValue" (onOpen)="onOpen.emit()" (onClose)="onClose.emit()">
      @for (panel of panels; track panel.panelId) {
        <p-accordion-panel [value]="panel.panelId" [disabled]="panel.disabled">
          <p-accordion-header>
            @if (panel.icon) {
              <i [class]="panel.icon"></i>
            }
            @if (panel.headerTpl) {
              <ng-container [ngTemplateOutlet]="panel.headerTpl.template" />
            }
          </p-accordion-header>
          <p-accordion-content>
            <ng-container [ngTemplateOutlet]="panel.bodyTpl" />
          </p-accordion-content>
        </p-accordion-panel>
      }
    </p-accordion>
  `
})
export class ExtraAccordionComponent implements AfterContentInit {
  /** Разрешить несколько раскрытых панелей одновременно. */
  @Input() multiple = false;

  @Output() onOpen = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  @ContentChildren(ExtraAccordionPanelComponent) panels!: QueryList<ExtraAccordionPanelComponent>;

  /** Начальное значение `p-accordion` — вычисляется один раз из `[expanded]` дочерних панелей. */
  initialValue: number[] | number | null = null;

  ngAfterContentInit(): void {
    const expandedIds = this.panels.filter((panel) => panel.expanded).map((panel) => panel.panelId);
    this.initialValue = this.multiple ? expandedIds : (expandedIds[0] ?? null);
  }
}
