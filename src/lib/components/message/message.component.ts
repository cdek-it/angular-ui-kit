import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Message } from 'primeng/message';
import { ButtonDirective } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { ExtraMessageTemplateDirective } from './message-template.directive';

export type ExtraMessageSeverity = 'info' | 'success' | 'warning' | 'danger';

export type ExtraMessageSize = 'sm' | 'base' | 'lg' | 'xlg' | 'fill';

type PrimeMessageSeverity = 'success' | 'info' | 'warn' | 'error';

const SEVERITY_ICONS: Record<ExtraMessageSeverity, string> = {
  info: 'ti ti-info-circle',
  success: 'ti ti-circle-check',
  warning: 'ti ti-alert-triangle',
  danger: 'ti ti-alert-circle'
};

/** Длительность таймера автоскрытия при [timer]="true" (мс). */
const TIMER_LIFE = 3000;

@Component({
  selector: 'extra-message',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Message, ButtonDirective, SharedModule, NgTemplateOutlet],
  template: `
    <p-message [severity]="primeSeverity" [closable]="false" [styleClass]="sizeClass">
      <ng-template pTemplate="container">
        <div class="p-message-accent-line"></div>
        @if (resolvedIcon) {
          <i [class]="resolvedIcon + ' p-message-icon'"></i>
        }
        <div class="p-message-text">
          @if (message) {
            <span class="p-message-summary">{{ message }}</span>
          }
          @if (caption) {
            <div class="p-message-detail">{{ caption }}</div>
          }
          <ng-content />
        </div>
        @if (showClose) {
          <button
            type="button"
            pButton
            [text]="true"
            icon="ti ti-x"
            class="p-message-close-button"
            (click)="close($event)"
          ></button>
        }
        @if (footerTpl) {
          <div class="p-message-footer">
            <ng-container [ngTemplateOutlet]="footerTpl.template" />
          </div>
        }
      </ng-template>
    </p-message>
  `
})
export class ExtraMessageComponent implements AfterContentInit, OnDestroy {
  @Input() severity: ExtraMessageSeverity = 'info';
  /** Таймер автоскрытия (3 с). */
  @Input() timer = false;
  @Input() message = '';
  @Input() caption = '';
  /** Класс иконки tabler icon; null скрывает иконку; undefined (не задан) — стандартная по severity. */
  @Input() icon: string | null | undefined = undefined;
  @Input() showClose = false;
  /** Ширина сообщения: sm 272 / base 336 / lg 400 / xlg 630 / fill — на всю ширину контейнера. */
  @Input() size: ExtraMessageSize = 'base';

  @Output() onClose = new EventEmitter<void>();

  @ViewChild(Message) private primeMessage?: Message;

  @ContentChildren(ExtraMessageTemplateDirective) templates!: QueryList<ExtraMessageTemplateDirective>;

  footerTpl?: ExtraMessageTemplateDirective;

  private closed = false;
  private timerId?: ReturnType<typeof setTimeout>;

  constructor(private cdr: ChangeDetectorRef) {}

  get resolvedIcon(): string | null {
    if (this.icon === null) return null;
    return this.icon ?? SEVERITY_ICONS[this.severity];
  }

  get sizeClass(): string {
    return this.size === 'base' ? '' : `p-message-size-${this.size}`;
  }

  get primeSeverity(): PrimeMessageSeverity {
    if (this.severity === 'warning') return 'warn';
    if (this.severity === 'danger') return 'error';
    return this.severity;
  }

  ngAfterContentInit(): void {
    this.footerTpl = this.templates.find((tpl) => tpl.extraMessageTemplate === 'footer');
    this.cdr.detectChanges();

    if (this.timer) {
      this.timerId = setTimeout(() => this.close(), TIMER_LIFE);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerId);
  }

  /** Закрывает сообщение (крестиком, программно или по таймеру) и эмитит onClose. */
  close(event?: Event): void {
    if (this.closed) return;
    this.closed = true;
    clearTimeout(this.timerId);
    this.primeMessage?.close(event as Event);
    this.onClose.emit();
  }
}
