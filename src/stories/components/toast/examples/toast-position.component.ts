import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Button } from 'primeng/button';
import { ExtraToastComponent } from '../../../../lib/components/toast/toast.component';
import { ExtraToastService } from '../../../../lib/components/toast/toast.service';

const POSITIONS = [
  { position: 'top-left', label: 'Вверх слева', key: 'pos-top-left' },
  { position: 'top-center', label: 'Вверх по центру', key: 'pos-top-center' },
  { position: 'top-right', label: 'Вверх справа', key: 'pos-top-right' },
  { position: 'bottom-left', label: 'Вниз слева', key: 'pos-bottom-left' },
  { position: 'bottom-center', label: 'Вниз по центру', key: 'pos-bottom-center' },
  { position: 'bottom-right', label: 'Вниз справа', key: 'pos-bottom-right' },
] as const;

const template = `
@for (p of positions; track p.key) {
  <extra-toast [position]="p.position" [key]="p.key"></extra-toast>
}

<div class="flex flex-col gap-2 items-center justify-center min-h-48">
  @for (p of positions; track p.key) {
    <p-button
      [label]="p.label"
      severity="contrast"
      (onClick)="show(p.key, p.position)"
    ></p-button>
  }
</div>
`;
const styles = '';

@Component({
  selector: 'app-toast-position',
  standalone: true,
  imports: [ExtraToastComponent, Button],
  template,
  styles,
})
export class ToastPositionComponent {
  readonly positions = POSITIONS;

  constructor(private readonly toastService: ExtraToastService) {}

  show(key: string, position: string): void {
    this.toastService.add({
      key,
      severity: 'info',
      summary: 'Сообщение',
      detail: 'Позиция: ' + position,
      life: 3000,
      icon: 'ti ti-info-circle',
    });
  }
}

export const Position: StoryObj = {
  render: () => ({
    template: `<app-toast-position></app-toast-position>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Расположение тоста задаётся через `position` и `key`.' },
      source: {
        language: 'ts',
        code: `
<extra-toast position="top-left" key="top-left"></extra-toast>
<extra-toast position="top-center" key="top-center"></extra-toast>
<extra-toast position="top-right" key="top-right"></extra-toast>
<extra-toast position="bottom-left" key="bottom-left"></extra-toast>
<extra-toast position="bottom-center" key="bottom-center"></extra-toast>
<extra-toast position="bottom-right" key="bottom-right"></extra-toast>
        `,
      },
    },
  },
};
