import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';

const template = `
<div class="bg-surface-ground p-4">
  <div class="flex gap-3 items-end">
    <extra-button
      label="Нативные события"
      (click)="log('click', $event)"
      (focus)="log('focus', $event)"
      (blur)="log('blur', $event)"
      (keydown)="log('keydown', $event)"
    ></extra-button>
    <extra-button
      icon="ti ti-trash"
      severity="danger"
      label="С иконкой"
      (click)="log('click', $event)"
      (focus)="log('focus', $event)"
      (blur)="log('blur', $event)"
    ></extra-button>
  </div>
  <ul class="events-log">
    @for (entry of logEntries; track $index) {
      <li>{{ entry }}</li>
    }
  </ul>
</div>
`;

const styles = `
.events-log {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: var(--p-surface-100);
  font-size: 0.875rem;
  max-height: 10rem;
  overflow-y: auto;
  list-style: none;
}
`;

@Component({
  selector: 'app-button-events',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExtraButtonComponent],
  template,
  styles
})
export class ButtonEventsComponent {
  logEntries: string[] = [];

  log(name: string, event: Event): void {
    this.logEntries = [`${name} → ${event.constructor.name}`, ...this.logEntries].slice(0, 20);
  }
}

export const Events: StoryObj = {
  render: () => ({
    template: `<app-button-events></app-button-events>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Нативные DOM-события кнопки: click, focus, blur, keydown и другие вешаются напрямую на extra-button и логируются здесь. Компонент также объявляет типизированные события focus и blur.'
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraButtonComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-button-events',
  standalone: true,
  imports: [ExtraButtonComponent],
  template: \`
    <extra-button
      label="Нативные события"
      (click)="onClick($event)"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (keydown)="onKeydown($event)"
    ></extra-button>
  \`,
})
export class ButtonEventsComponent {
  onClick(event: MouseEvent): void { /* ... */ }
  onFocus(event: FocusEvent): void { /* ... */ }
  onBlur(event: FocusEvent): void { /* ... */ }
  onKeydown(event: KeyboardEvent): void { /* ... */ }
}
        `
      }
    }
  }
};
