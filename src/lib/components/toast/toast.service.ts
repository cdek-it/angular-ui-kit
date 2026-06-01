import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastSeverity } from './toast.component';

export interface ExtraToastMessage {
  key?: string;
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  life?: number;
  icon?: string;
  closable?: boolean;
  data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class ExtraToastService {
  constructor(private readonly messageService: MessageService) {}

  add(message: ExtraToastMessage): void {
    this.messageService.add(message);
  }

  clear(key?: string): void {
    this.messageService.clear(key);
  }
}
