import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogSize } from './dialog.component';

export type UiDynamicDialogConfig<DataType = any> = Omit<DynamicDialogConfig<DataType>, 'styleClass'> & {
  size?: DialogSize;
  styleClass?: string;
};

export { DynamicDialogRef, DynamicDialogConfig };

@Injectable()
export class UiDialogService {
  constructor(private readonly primengDialogService: DialogService) {}

  open<T>(componentType: Type<T>, config: UiDynamicDialogConfig = {}): DynamicDialogRef<T> | null {
    const { size, styleClass, ...rest } = config;
    const sizeClass = this.toSizeClass(size);
    const mergedStyleClass = [sizeClass, styleClass].filter(Boolean).join(' ');

    return this.primengDialogService.open(componentType, {
      ...rest,
      ...(mergedStyleClass && { styleClass: mergedStyleClass }),
      appendTo: rest.appendTo ?? 'body',
    });
  }

  private toSizeClass(size?: DialogSize): string {
    if (size === 'sm') return 'p-dialog-sm';
    if (size === 'lg') return 'p-dialog-lg';
    if (size === 'xlg') return 'p-dialog-xlg';
    return '';
  }
}
