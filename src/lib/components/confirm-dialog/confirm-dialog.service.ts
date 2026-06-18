import { Injectable, Provider } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';

export type ExtraConfirmDialogOptions = Pick<
  Confirmation,
  'key' | 'message' | 'header' | 'icon' | 'acceptLabel' | 'rejectLabel' | 'accept' | 'reject' | 'acceptButtonProps'
>;

export function provideExtraConfirmDialog(): Provider[] {
  return [ConfirmationService, ExtraConfirmDialogService];
}

@Injectable()
export class ExtraConfirmDialogService {
  constructor(private readonly confirmationService: ConfirmationService) {}

  confirm(options: ExtraConfirmDialogOptions): void {
    this.confirmationService.confirm(options);
  }
}
