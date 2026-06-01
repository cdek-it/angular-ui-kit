import { Component } from '@angular/core';
import { ExtraButtonComponent } from '../../../../lib/components/button/button.component';
import {
  ExtraConfirmDialogComponent,
  ExtraConfirmDialogSize,
} from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../../lib/components/confirm-dialog/confirm-dialog.service';

interface SizeItem {
  key: ExtraConfirmDialogSize;
  label: string;
}

const SIZES: SizeItem[] = [
  { key: 'sm', label: 'Small' },
  { key: 'default', label: 'Base' },
  { key: 'lg', label: 'Large' },
  { key: 'xlg', label: 'Extra Large' },
];

const template = `
<div class="bg-surface-ground">
  <extra-confirm-dialog key="cd-size-sm" size="sm"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-size-default"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-size-lg" size="lg"></extra-confirm-dialog>
  <extra-confirm-dialog key="cd-size-xlg" size="xlg"></extra-confirm-dialog>

  <div class="flex flex-wrap gap-2">
    @for (size of sizes; track size.key) {
      <extra-button
        [label]="size.label"
        severity="success"
        (click)="showConfirm(size)"
      ></extra-button>
    }
  </div>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-sizes',
  standalone: true,
  imports: [ExtraConfirmDialogComponent, ExtraButtonComponent],
  template,
})
export class ConfirmDialogSizesComponent {
  sizes = SIZES;

  constructor(private confirmDialogService: ConfirmDialogService) {}

  showConfirm(size: SizeItem): void {
    this.confirmDialogService.confirm({
      key: 'cd-size-' + size.key,
      message: 'Это диалог размера ' + size.label,
      header: 'Подтверждение',
      icon: 'ti ti-alert-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {},
      reject: () => {},
    });
  }
}

export const Sizes = {
  name: 'Sizes',
  render: () => ({
    template: `<app-confirm-dialog-sizes></app-confirm-dialog-sizes>`,
  }),
  parameters: {
    docs: {
      description: { story: 'Доступные размеры диалога: sm, base, lg, xlg.' },
      source: {
        language: 'ts',
        code: `
import { ExtraConfirmDialogComponent, ExtraConfirmDialogSize, ConfirmDialogService, ExtraButtonComponent, provideConfirmDialog } from '@cdek-it/angular-ui-kit';

interface SizeItem {
  key: ExtraConfirmDialogSize;
  label: string;
}

const SIZES: SizeItem[] = [
  { key: 'sm', label: 'Small' },
  { key: 'default', label: 'Base' },
  { key: 'lg', label: 'Large' },
  { key: 'xlg', label: 'Extra Large' },
];

@Component({
  selector: 'app-confirm-dialog-sizes',
  standalone: true,
  imports: [ExtraConfirmDialogComponent, ExtraButtonComponent],
  providers: [provideConfirmDialog()],
  template: \`
    <extra-confirm-dialog key="cd-size-sm" size="sm"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-size-default"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-size-lg" size="lg"></extra-confirm-dialog>
    <extra-confirm-dialog key="cd-size-xlg" size="xlg"></extra-confirm-dialog>

    <div class="flex flex-wrap gap-2">
      @for (size of sizes; track size.key) {
        <extra-button [label]="size.label" severity="success" (click)="showConfirm(size)"></extra-button>
      }
    </div>
  \`,
})
export class ConfirmDialogSizesComponent {
  sizes = SIZES;
  constructor(private confirmDialogService: ConfirmDialogService) {}

  showConfirm(size: SizeItem): void {
    this.confirmDialogService.confirm({
      key: 'cd-size-' + size.key,
      message: 'Это диалог размера ' + size.label,
      header: 'Подтверждение',
      icon: 'ti ti-alert-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {},
      reject: () => {},
    });
  }
}
        `,
      },
    },
  },
};
