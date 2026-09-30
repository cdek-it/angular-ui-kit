import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraFileUploadComponent } from '../../../../lib/components/fileupload/fileupload.component';

function demoFile(name: string, sizeBytes: number, type: string): File {
  return new File([new Uint8Array(sizeBytes)], name, { type });
}

/**
 * XHR завершился ошибкой (>=400 или сеть) — компонент сам это никак не отслеживает,
 * т.к. всегда работает в customUpload: реальный запрос делает приложение и через
 * [uploadError] сообщает компоненту текст ошибки, чтобы тот отрисовал его на своём
 * штатном месте — сразу после зоны дропа, перед списком файлов (как и success-сообщение).
 * Очередь при этом не трогается, повторный клик по «Отправить» — штатный повтор пачки.
 */
@Component({
  selector: 'app-fileupload-upload-error',
  standalone: true,
  imports: [ExtraFileUploadComponent, ReactiveFormsModule],
  template: ` <extra-fileupload [formControl]="control" uploadError="Не удалось отправить файлы. Проверьте соединение и повторите попытку"></extra-fileupload> `,
})
export class FileUploadUploadErrorComponent {
  control = new FormControl<File[]>([
    demoFile('Договор.pdf', 245_000, 'application/pdf'),
    demoFile('Смета.docx', 890_000, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
  ]);
}
