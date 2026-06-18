import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import {
  ExtraConfirmDialogComponent,
  ExtraConfirmDialogFooterDirective,
  ExtraConfirmDialogHeaderDirective
} from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ExtraConfirmDialogService } from '../../../../lib/components/confirm-dialog/confirm-dialog.service';

const template = `
<div class="bg-surface-ground">
  <extra-button label="Показать диалог" severity="info" (click)="showConfirm()"></extra-button>

  <extra-confirm-dialog key="cd-templates">
    <ng-template extraConfirmDialogHeader let-message let-onReject="onReject">
      <div class="p-dialog-header">
        <div class="p-dialog-title">
          <i [class]="message.icon"></i>
          <span>{{ message.header }}</span>
        </div>
        <extra-button
          styleClass="p-dialog-close-button"
          variant="text"
          icon="ti ti-x"
          [rounded]="true"
          [iconOnly]="true"
          (click)="onReject()"
        ></extra-button>
      </div>
    </ng-template>

    <ng-template extraConfirmDialogFooter let-message let-onAccept="onAccept" let-onReject="onReject">
      <div class="p-dialog-footer">
        <extra-button [label]="message.rejectLabel" variant="text" (click)="onReject()"></extra-button>
        <extra-button [label]="message.acceptLabel" (click)="onAccept()"></extra-button>
      </div>
    </ng-template>
  </extra-confirm-dialog>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-templates',
  standalone: true,
  imports: [
    ExtraConfirmDialogComponent,
    ExtraConfirmDialogHeaderDirective,
    ExtraConfirmDialogFooterDirective,
    ExtraButtonComponent
  ],
  template
})
export class ConfirmDialogTemplatesComponent {
  constructor(private confirmDialogService: ExtraConfirmDialogService) {}

  showConfirm(): void {
    this.confirmDialogService.confirm({
      key: 'cd-templates',
      message: 'Отправка отчёта будет выполнена в течение нескольких минут.',
      header: 'Подтверждение отправки',
      icon: 'ti ti-mail',
      acceptLabel: 'Отправить',
      rejectLabel: 'Отмена',
      accept: () => {},
      reject: () => {}
    });
  }
}

export const Templates: StoryObj = {
  name: 'Templates',
  render: () => ({ template: `<app-confirm-dialog-templates></app-confirm-dialog-templates>` }),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Кастомные шаблоны заголовка и футера через директивы `extraConfirmDialogHeader` и `extraConfirmDialogFooter`. Контекст шаблона: `let-message`, `let-onAccept="onAccept"`, `let-onReject="onReject"`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import {
  ExtraConfirmDialogComponent,
  ExtraConfirmDialogHeaderDirective,
  ExtraConfirmDialogFooterDirective,
  ExtraConfirmDialogService,
  ExtraButtonComponent,
} from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-confirm-dialog-templates',
  standalone: true,
  imports: [
    ExtraConfirmDialogComponent,
    ExtraConfirmDialogHeaderDirective,
    ExtraConfirmDialogFooterDirective,
    ExtraButtonComponent,
  ],
  template: \`
    <extra-button label="Показать диалог" (click)="showConfirm()"></extra-button>

    <extra-confirm-dialog key="cd-templates">
      <ng-template extraConfirmDialogHeader let-message let-onReject="onReject">
        <div class="p-dialog-header">
          <div class="p-dialog-title">
            <i [class]="message.icon"></i>
            <span>{{ message.header }}</span>
          </div>
          <extra-button variant="text" icon="ti ti-x" [rounded]="true" [iconOnly]="true" (click)="onReject()"></extra-button>
        </div>
      </ng-template>

      <ng-template extraConfirmDialogFooter let-message let-onAccept="onAccept" let-onReject="onReject">
        <div class="p-dialog-footer">
          <extra-button [label]="message.rejectLabel" variant="text" (click)="onReject()"></extra-button>
          <extra-button [label]="message.acceptLabel" (click)="onAccept()"></extra-button>
        </div>
      </ng-template>
    </extra-confirm-dialog>
  \`,
})
export class ConfirmDialogTemplatesComponent {
  constructor(private confirmDialogService: ExtraConfirmDialogService) {}

  showConfirm(): void {
    this.confirmDialogService.confirm({
      key: 'cd-templates',
      message: 'Отправка отчёта будет выполнена в течение нескольких минут.',
      header: 'Подтверждение отправки',
      icon: 'ti ti-mail',
      acceptLabel: 'Отправить',
      rejectLabel: 'Отмена',
      accept: () => {},
      reject: () => {},
    });
  }
}
        `
      }
    }
  }
};
