import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import { ExtraToastComponent } from '../../../../lib/components/toast/toast.component';
import { ExtraToastService } from '../../../../lib/components/toast/toast.service';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' },
] as const;

const template = `
<extra-toast key="with-content"></extra-toast>

<div class="flex flex-col gap-4">
  @for (s of severities; track s.type) {
    <div [class]="'p-toast-message p-toast-message-' + s.type">
      <div class="p-toast-message-content">
        <div class="p-toast-accent-line"></div>
        <i [class]="s.icon + ' p-toast-message-icon'"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">Сообщение</span>
          <div class="p-toast-detail">Подпись</div>
          <div class="mt-4">
            <div class="text-sm">Дополнительный контент</div>
          </div>
          <div class="flex gap-2 mt-2">
            <div class="text-sm">Ячейка 1</div>
            <div class="text-sm">Ячейка 2</div>
          </div>
        </div>
        <button
          type="button"
          class="p-button p-component p-button-text p-toast-close-button"
        >
          <span class="p-button-icon ti ti-x"></span>
        </button>
      </div>
    </div>
  }
</div>

<div class="flex flex-wrap gap-2 mt-6">
  @for (s of severities; track s.type) {
    <extra-button
      [label]="'Показать: ' + s.label"
      [severity]="s.type === 'error' ? 'danger' : s.type === 'warn' ? 'warning' : null"
      variant="outlined"
      (click)="show(s.type, s.icon)"
    ></extra-button>
  }
</div>
`;
const styles = '';

@Component({
  selector: 'app-toast-with-content',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template,
  styles,
})
export class ToastWithContentComponent {
  readonly severities = SEVERITIES;

  constructor(private readonly toastService: ExtraToastService) {}

  show(severity: string, icon: string): void {
    this.toastService.add({
      key: 'with-content',
      severity: severity as any,
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon,
      closable: true,
    });
  }
}

export const WithContent: StoryObj = {
  render: () => ({
    template: `<app-toast-with-content></app-toast-with-content>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Уведомления с дополнительным контентом под заголовком.' },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent, ExtraToastComponent, ExtraToastService } from '@cdek-it/angular-ui-kit';

const SEVERITIES = [
  { type: 'info', icon: 'ti ti-info-circle', label: 'Информация' },
  { type: 'success', icon: 'ti ti-circle-check', label: 'Успех' },
  { type: 'warn', icon: 'ti ti-alert-triangle', label: 'Предупреждение' },
  { type: 'error', icon: 'ti ti-alert-circle', label: 'Ошибка' },
] as const;

// Кастомный шаблон сообщения передаётся через ng-template
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraToastComponent, ExtraButtonComponent],
  template: \`
    <extra-toast key="with-content">
      <ng-template #message let-message>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">{{ message.summary }}</span>
          <div class="p-toast-detail">{{ message.detail }}</div>
          <div class="mt-4">
            <div class="text-sm">Дополнительный контент</div>
          </div>
          <div class="flex gap-2 mt-2">
            <div class="text-sm">Ячейка 1</div>
            <div class="text-sm">Ячейка 2</div>
          </div>
        </div>
      </ng-template>
    </extra-toast>

    <div class="flex flex-wrap gap-2">
      @for (s of severities; track s.type) {
        <extra-button
          [label]="'Показать: ' + s.label"
          [severity]="s.type === 'error' ? 'danger' : s.type === 'warn' ? 'warning' : null"
          variant="outlined"
          (click)="show(s.type, s.icon)"
        ></extra-button>
      }
    </div>
  \`,
})
export class ExampleComponent {
  readonly severities = SEVERITIES;

  constructor(private toastService: ExtraToastService) {}

  show(severity: string, icon: string): void {
    this.toastService.add({
      key: 'with-content',
      severity: severity as any,
      summary: 'Сообщение',
      detail: 'Подпись',
      life: 5000,
      icon,
      closable: true,
    });
  }
}
        `,
      },
    },
  },
};
