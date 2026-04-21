import { Injectable, Injector, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogSize } from './dialog.component';

export type UiDynamicDialogConfig<DataType = any> = Omit<DynamicDialogConfig<DataType>, 'styleClass'> & {
  size?: DialogSize;
  styleClass?: string;
};

export { DynamicDialogRef, DynamicDialogConfig };

@Injectable({ providedIn: 'root' })
export class UiDialogService {

  constructor(private readonly injector: Injector) {
  }

  open<T>(componentType: Type<T>, config: UiDynamicDialogConfig = {}): DynamicDialogRef<T> | null {
    const { size, styleClass, ...rest } = config;
    const sizeClass = this.toSizeClass(size);
    const mergedStyleClass = [sizeClass, styleClass].filter(Boolean).join(' ');

    const childInjector = Injector.create({
      providers: [DialogService],
      parent: this.injector,
    });

    const dialogService = childInjector.get(DialogService);

    return dialogService.open(componentType, {
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
