import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Card } from 'primeng/card';
import { PrimeTemplate } from 'primeng/api';
import { ExtraCardTemplateDirective } from './card-template.directive';

@Component({
  selector: 'extra-card',
  host: { style: 'display: block' },
  standalone: true,
  imports: [Card, PrimeTemplate, NgTemplateOutlet],
  template: `
    <p-card [styleClass]="overlay ? 'shadow-md' : ''">
      @if (headerTpl) {
        <ng-template pTemplate="header">
          <ng-container [ngTemplateOutlet]="headerTpl.template"></ng-container>
        </ng-template>
      }
      @if (title || subtitle) {
        <ng-template pTemplate="title">
          <div class="p-card-caption">
            @if (title) {
              <div class="p-card-title m-0" data-pc-section="title">{{ title }}</div>
            }
            @if (subtitle) {
              <div class="p-card-subtitle m-0" data-pc-section="subtitle">{{ subtitle }}</div>
            }
          </div>
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
