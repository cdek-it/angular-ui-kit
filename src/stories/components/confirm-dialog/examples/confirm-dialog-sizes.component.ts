import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import {
  ConfirmDialogComponent,
  ConfirmDialogSize,
} from '../../../../lib/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../../../../lib/components/confirm-dialog/confirm-dialog.service';

interface SizeItem {
  key: ConfirmDialogSize;
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
  <confirm-dialog key="cd-size-sm" size="sm"></confirm-dialog>
  <confirm-dialog key="cd-size-default"></confirm-dialog>
  <confirm-dialog key="cd-size-lg" size="lg"></confirm-dialog>
  <confirm-dialog key="cd-size-xlg" size="xlg"></confirm-dialog>

  <div class="flex flex-wrap gap-2">
    @for (size of sizes; track size.key) {
      <p-button
        [label]="size.label"
        severity="contrast"
        (onClick)="showConfirm(size)"
      ></p-button>
    }
  </div>
</div>
`;

@Component({
  selector: 'app-confirm-dialog-sizes',
  standalone: true,
  imports: [ConfirmDialogComponent, Button],
  providers: [ConfirmationService, ConfirmDialogService],
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
