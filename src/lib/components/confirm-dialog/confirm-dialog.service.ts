import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';

export type ConfirmDialogOptions = Pick<
  Confirmation,
  'key' | 'message' | 'header' | 'icon' | 'acceptLabel' | 'rejectLabel' | 'accept' | 'reject' | 'acceptButtonProps'
>;

@Injectable()
export class ConfirmDialogService {
  constructor(private readonly confirmationService: ConfirmationService) {}

  confirm(options: ConfirmDialogOptions): void {
    this.confirmationService.confirm(options);
  }
}
