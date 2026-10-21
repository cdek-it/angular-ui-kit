import { Injectable, TemplateRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExtraToastSeverity, toPrimeToastSeverity } from './toast.component';

export interface ExtraToastMessage {
  /** Ключ целевого контейнера `<extra-toast>` — для нескольких независимых очередей. */
  key?: string;
  severity?: ExtraToastSeverity;
  /** Заголовок сообщения. */
  message?: string;
  /** Подробности сообщения. */
  caption?: string;
  /** Класс иконки tabler icon; по умолчанию подбирается по `severity`. */
  icon?: string;
  /** Показывать кнопку закрытия. */
  showClose?: boolean;
  /** Таймер автоскрытия. По умолчанию `true` — тост скрывается сам; `false` делает его несгораемым (sticky). */
  timer?: boolean;
  /** Переопределяет длительность таймера (мс) — учитывается только при `timer !== false`. */
  life?: number;
  /** Срабатывает при закрытии этого сообщения (крестиком или по таймеру). */
  onClose?: () => void;
  /** Слот `content` — контент после caption. */
  content?: TemplateRef<unknown>;
  /** Слот `footer` — контент футера. */
  footer?: TemplateRef<unknown>;
}

@Injectable({ providedIn: 'root' })
export class ExtraToastService {
  constructor(private readonly messageService: MessageService) {}

  add(message: ExtraToastMessage): void {
    const timer = message.timer ?? true;

    this.messageService.add({
      key: message.key,
      severity: toPrimeToastSeverity(message.severity ?? 'info'),
      summary: message.message,
      detail: message.caption,
      icon: message.icon,
      closable: message.showClose ?? false,
      sticky: !timer,
      life: message.life,
      data: {
        onClose: message.onClose,
        content: message.content,
        footer: message.footer
      }
    });
  }

  clear(key?: string): void {
    this.messageService.clear(key);
  }
}
