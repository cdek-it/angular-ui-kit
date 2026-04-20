import { Component } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { Button } from 'primeng/button';
import { ToastComponent } from '../../../../lib/components/toast/toast.component';
import { UiToastService } from '../../../../lib/components/toast/toast.service';

const SIZES = [
  { key: 'sm', label: 'Small (20rem)', width: '20rem', cssVar: '20rem' },
  { key: 'base', label: 'Base (25rem)', width: '25rem', cssVar: '25rem' },
  { key: 'lg', label: 'Large (30rem)', width: '30rem', cssVar: '30rem' },
  { key: 'xlg', label: 'X-Large (45rem)', width: '45rem', cssVar: '45rem' },
] as const;

const template = `
<ui-toast
  key="width-preview"
  [pt]="{ root: { style: { '--p-toast-width': currentWidth } } }"
></ui-toast>

<div class="flex flex-col gap-4">
  @for (s of sizes; track s.key) {
    <div
      class="p-toast-message p-toast-message-info"
      [style]="'width:' + s.width"
    >
      <div class="p-toast-message-content">
        <div class="p-toast-accent-line"></div>
        <i class="ti ti-info-circle p-toast-message-icon"></i>
        <div class="p-toast-message-text">
          <span class="p-toast-summary">Сообщение</span>
          <div class="p-toast-detail">Ширина {{ s.key }}: {{ s.width }}</div>
        </div>
      </div>
    </div>
  }
</div>

<div class="flex flex-wrap gap-2 mt-6">
  @for (s of sizes; track s.key) {
    <p-button
      [label]="s.label"
      severity="contrast"
      (onClick)="show(s.cssVar)"
    ></p-button>
  }
</div>
`;
const styles = '';

@Component({
  selector: 'app-toast-width',
  standalone: true,
  imports: [ToastComponent, Button],
  template,
  styles,
})
export class ToastWidthComponent {
  readonly sizes = SIZES;
  currentWidth = '25rem';

  constructor(private readonly toastService: UiToastService) {}

  show(cssVar: string): void {
    this.currentWidth = cssVar;
    this.toastService.clear('width-preview');
    this.toastService.add({
      key: 'width-preview',
      severity: 'info',
      summary: 'Сообщение',
      detail: 'Ширина: ' + cssVar,
      life: 3000,
      icon: 'ti ti-info-circle',
    });
  }
}

export const Width: StoryObj = {
  render: () => ({
    template: `<app-toast-width></app-toast-width>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Ширина задаётся через CSS-переменную `--p-toast-width` с помощью пропа `pt`.' },
      source: {
        language: 'ts',
        code: `
<ui-toast [pt]="{ root: { style: { '--p-toast-width': '30rem' } } }">
</ui-toast>
        `,
      },
    },
  },
};
