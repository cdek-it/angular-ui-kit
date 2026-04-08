import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Card } from 'primeng/card';
import { PrimeTemplate, SharedModule } from 'primeng/api';

@Component({
  selector: 'card',
  host: { style: 'display: block' },
  standalone: true,
  imports: [Card, SharedModule, NgTemplateOutlet],
  template: `
    <p-card
      [header]="title"
      [subheader]="subtitle"
      [styleClass]="overlay ? 'shadow-md' : ''"
    >
      @if (headerTpl) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTpl.template"></ng-container>
        </ng-template>
      }
      @if (contentTpl) {
        <ng-template pTemplate="content">
          <ng-container [ngTemplateOutlet]="contentTpl.template"></ng-container>
        </ng-template>
      }
      @if (footerTpl) {
        <ng-template pTemplate="footer">
          <ng-container [ngTemplateOutlet]="footerTpl.template"></ng-container>
        </ng-template>
      }
    </p-card>
  `,
})
export class CardComponent implements AfterContentInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() overlay = false;

  @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

  headerTpl?: PrimeTemplate;
  contentTpl?: PrimeTemplate;
  footerTpl?: PrimeTemplate;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.templates.forEach(tpl => {
      switch (tpl.getType()) {
        case 'header':  this.headerTpl  = tpl; break;
        case 'content': this.contentTpl = tpl; break;
        case 'footer':  this.footerTpl  = tpl; break;
      }
    });
    this.cdr.detectChanges();
  }
}
