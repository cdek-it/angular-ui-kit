import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from './toast.component';

export interface UiToastMessage {
  key?: string;
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  life?: number;
  icon?: string;
  closable?: boolean;
  data?: unknown;
}

export { MessageService };

@Injectable({ providedIn: 'root' })
export class UiToastService {

  constructor(private readonly messageService: MessageService) {}

  add(message: UiToastMessage): void {
    this.messageService.add(message);
  }

  clear(key?: string): void {
    this.messageService.clear(key);
  }
}
