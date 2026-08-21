import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraMessageComponent } from '../../../../lib/components/message/message.component';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4 flex flex-col gap-4">
  <div class="flex gap-3 items-center">
    <extra-button
      label="Показать снова"
      icon="ti ti-refresh"
      size="small"
      (click)="showInfo.set(true); showSuccess.set(true)"
    ></extra-button>
    <span class="text-sm">Сообщения с [timer]="true" скрываются через 3 секунды</span>
  </div>

  @if (showInfo()) {
    <extra-message
      severity="info"
      message="Автоскрытие через 3 с"
      caption="[timer]=true"
      [timer]="true"
      (onClose)="onClose('info'); showInfo.set(false)"
    ></extra-message>
  }

  @if (showSuccess()) {
    <extra-message
      severity="success"
      message="Автоскрытие через 3 с"
      caption="[timer]=true + [showClose]=true"
      [timer]="true"
      [showClose]="true"
      (onClose)="onClose('success'); showSuccess.set(false)"
    ></extra-message>
  }

  <div class="text-sm">Лог onClose: {{ log().length ? log().join(' → ') : '—' }}</div>
</div>
`;

@Component({
  selector: 'app-message-timer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraMessageComponent, ExtraButtonComponent],
  template
})
export class MessageTimerComponent {
  showInfo = signal(true);
  showSuccess = signal(true);
  log = signal<string[]>([]);

  onClose(severity: string): void {
    this.log.update((entries) => [...entries, `onClose (${severity})`]);
  }
}

export const Timer: StoryObj = {
  render: () => ({
    template: `<app-message-timer></app-message-timer>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Таймер автоскрытия ([timer]="true", 3 секунды) — сообщение исчезает само; onClose срабатывает и при автоскрытии, и при закрытии крестиком. Кнопка «Показать снова» возвращает сообщения.'
      },
      source: {
        language: 'ts',
        code: `
import { Component, signal } from '@angular/core';
import { ExtraMessageComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-message-timer',
  standalone: true,
  imports: [ExtraMessageComponent],
  template: \`
    @if (show()) {
      <extra-message
        severity="info"
        message="Автоскрытие через 3 с"
        caption="caption"
        [timer]="true"
        (onClose)="show.set(false)"
      ></extra-message>
    }
  \`,
})
export class MessageTimerComponent {
  show = signal(true);
}
        `
      }
    }
  }
};
