import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { ExtraCardTemplateDirective } from './card-template.directive';

@Component({
  selector: 'extra-card',
  host: {
    style: 'display: block',
    // title/subtitle — входы компонента, но как статические атрибуты Angular оставляет их
    // в DOM: нативный `title` даёт браузерный тултип на всю карточку, `subtitle` — просто
    // несуществующий атрибут. Снимаем оба с хоста.
    '[attr.title]': 'null',
    '[attr.subtitle]': 'null'
  },
  standalone: true,
  imports: [Card, PrimeTemplate, NgTemplateOutlet],
  template: `
    <!--
      Заголовок и подзаголовок отдаём штатными входами p-card: PrimeNG сам кладёт их
      в .p-card-title / .p-card-subtitle. Своя разметка в pTemplate="title" попадала
      внутрь .p-card-title и дублировала этот класс вложенным элементом.
    -->
    <p-card [header]="title" [subheader]="subtitle" [styleClass]="overlay ? 'shadow-md' : ''">
      @if (headerTpl) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTpl.template"></ng-container>
        </ng-template>
      }
      <ng-template pTemplate="content">
        <ng-content></ng-content>
      </ng-template>
      @if (footerTpl) {
        <ng-template pTemplate="footer">
          <ng-container [ngTemplateOutlet]="footerTpl.template"></ng-container>
        </ng-template>
      }
    </p-card>
  `
})
export class ExtraCardComponent implements AfterContentInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() overlay = false;

  @ContentChildren(ExtraCardTemplateDirective) templates!: QueryList<ExtraCardTemplateDirective>;

  headerTpl?: ExtraCardTemplateDirective;
  footerTpl?: ExtraCardTemplateDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.headerTpl = this.templates.find((t) => t.extraCardTemplate === 'header');
    this.footerTpl = this.templates.find((t) => t.extraCardTemplate === 'footer');
    this.cdr.detectChanges();
  }
}
