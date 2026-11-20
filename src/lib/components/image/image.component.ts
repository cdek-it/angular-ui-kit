import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  ViewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Image } from 'primeng/image';
import { unblockBodyScroll } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';
import { ExtraImageTemplateDirective, ExtraImageTemplateName } from './image-template.directive';

/**
 * Обёртка над PrimeNG Image: картинка с предпросмотром (маска, тулбар, зум, поворот).
 *
 * Эталона в Figma нет, токены `components.image` собраны вручную (см. `image.figma.md`).
 */
@Component({
  selector: 'extra-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Image, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-image
      [src]="src"
      [alt]="alt"
      [width]="width"
      [height]="height"
      [preview]="preview"
      [imageClass]="imageClass"
      [styleClass]="styleClass"
      (onShow)="previewOpen = true"
      (onHide)="previewOpen = false"
    >
      @if (rotateRightTpl) {
        <ng-template pTemplate="rotaterighticon">
          <ng-container [ngTemplateOutlet]="rotateRightTpl!.template"></ng-container>
        </ng-template>
      }
      @if (rotateLeftTpl) {
        <ng-template pTemplate="rotatelefticon">
          <ng-container [ngTemplateOutlet]="rotateLeftTpl!.template"></ng-container>
        </ng-template>
      }
      @if (zoomOutTpl) {
        <ng-template pTemplate="zoomouticon">
          <ng-container [ngTemplateOutlet]="zoomOutTpl!.template"></ng-container>
        </ng-template>
      }
      @if (zoomInTpl) {
        <ng-template pTemplate="zoominicon">
          <ng-container [ngTemplateOutlet]="zoomInTpl!.template"></ng-container>
        </ng-template>
      }
      @if (closeTpl) {
        <ng-template pTemplate="closeicon">
          <ng-container [ngTemplateOutlet]="closeTpl!.template"></ng-container>
        </ng-template>
      }
    </p-image>
  `
})
export class ExtraImageComponent implements AfterContentInit, OnDestroy {
  /** URL изображения. */
  @Input({ required: true }) src = '';
  /** Альтернативный текст. */
  @Input() alt = '';
  /** Ширина изображения (строка, как в HTML-атрибуте). */
  @Input() width: string | undefined;
  /** Высота изображения (строка, как в HTML-атрибуте). */
  @Input() height: string | undefined;
  /** Включает предпросмотр по клику. */
  @Input() preview = false;
  /** CSS-класс самого изображения. */
  @Input() imageClass: string | undefined;
  /** CSS-класс корневого элемента. */
  @Input() styleClass: string | undefined;

  @ContentChildren(ExtraImageTemplateDirective) templates!: QueryList<ExtraImageTemplateDirective>;

  @ViewChild(Image) private image?: Image;

  /** Открыт ли предпросмотр: нужен, чтобы снять блокировку прокрутки при уничтожении. */
  previewOpen = false;

  rotateRightTpl?: ExtraImageTemplateDirective;
  rotateLeftTpl?: ExtraImageTemplateDirective;
  zoomOutTpl?: ExtraImageTemplateDirective;
  zoomInTpl?: ExtraImageTemplateDirective;
  closeTpl?: ExtraImageTemplateDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.rotateRightTpl = this.findTemplate('rotateRightIcon');
    this.rotateLeftTpl = this.findTemplate('rotateLeftIcon');
    this.zoomOutTpl = this.findTemplate('zoomOutIcon');
    this.zoomInTpl = this.findTemplate('zoomInIcon');
    this.closeTpl = this.findTemplate('closeIcon');
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    // PrimeNG блокирует прокрутку body на открытом preview и снимает блокировку только
    // в closePreview(). При уничтожении обёртки предпросмотр нужно закрыть самим.
    if (!this.previewOpen && !this.image?.previewVisible) return;
    this.image?.closePreview();
    unblockBodyScroll();
  }

  private findTemplate(name: ExtraImageTemplateName): ExtraImageTemplateDirective | undefined {
    return this.templates.find((tpl) => tpl.extraImageTemplate === name);
  }
}
