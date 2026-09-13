import { Component, TemplateRef, ViewChild } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraToastComponent } from '../../../../lib/components/toast/toast.component';
import { ExtraToastService } from '../../../../lib/components/toast/toast.service';

const template = `
<extra-toast key="slots"></extra-toast>

<ng-template #contentOnly>
  <div class="mt-2 text-sm">Контент после caption (слот content)</div>
</ng-template>

<ng-template #footerOnly>
  <div class="flex gap-2">
    <extra-button label="Действие" size="sm"></extra-button>
    <extra-button label="Отмена" variant="tertiary" size="sm"></extra-button>
  </div>
</ng-template>

<div class="flex flex-wrap gap-2">
  <extra-button label="Только content" variant="tertiary" (click)="showContentOnly()"></extra-button>
  <extra-button label="Только footer" variant="tertiary" (click)="showFooterOnly()"></extra-button>
  <extra-button label="content + footer" variant="tertiary" (click)="showBoth()"></extra-button>
</div>
`;

@Component({
  selector: 'app-toast-slots',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template
})
export class ToastSlotsComponent {
  @ViewChild('contentOnly') contentTpl!: TemplateRef<unknown>;
  @ViewChild('footerOnly') footerTpl!: TemplateRef<unknown>;

  constructor(private readonly toastService: ExtraToastService) {}

  showContentOnly(): void {
    this.toastService.add({
      key: 'slots',
      severity: 'info',
      message: 'Сообщение',
      caption: 'caption',
      timer: false,
      showClose: true,
      content: this.contentTpl
    });
  }

  showFooterOnly(): void {
    this.toastService.add({
      key: 'slots',
      severity: 'danger',
      message: 'Сообщение',
      caption: 'caption',
      timer: false,
      showClose: true,
      footer: this.footerTpl
    });
  }

  showBoth(): void {
    this.toastService.add({
      key: 'slots',
      severity: 'success',
      message: 'Сообщение',
      caption: 'caption',
      timer: false,
      showClose: true,
      content: this.contentTpl,
      footer: this.footerTpl
    });
  }
}

export const Slots: StoryObj = {
  render: () => ({
    template: `<app-toast-slots></app-toast-slots>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Слот `content` — контент после `caption` (например, произвольный текст). Слот `footer` — контент футера (например, кнопки действий). Оба передаются как `TemplateRef` в `ExtraToastService.add()`.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ExtraButtonComponent, ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template: \`
    <extra-toast key="slots"></extra-toast>

    <!-- content: контент после caption -->
    <ng-template #contentOnly>
      <div>Контент после caption</div>
    </ng-template>

    <!-- footer: например, кнопки действий -->
    <ng-template #footerOnly>
      <div class="flex gap-2">
        <extra-button label="Действие" size="sm"></extra-button>
        <extra-button label="Отмена" variant="tertiary" size="sm"></extra-button>
      </div>
    </ng-template>

    <extra-button label="Показать" (click)="show()"></extra-button>
  \`,
})
export class ExampleComponent {
  @ViewChild('contentOnly') contentTpl!: TemplateRef<unknown>;
  @ViewChild('footerOnly') footerTpl!: TemplateRef<unknown>;

  constructor(private toastService: ExtraToastService) {}

  show(): void {
    this.toastService.add({
      key: 'slots',
      severity: 'success',
      message: 'Сообщение',
      caption: 'caption',
      timer: false,
      showClose: true,
      content: this.contentTpl,
      footer: this.footerTpl,
    });
  }
}
        `
      }
    }
  }
};
