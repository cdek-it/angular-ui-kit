import { Component, Input } from '@angular/core';
import { ExtraFileUploadComponent, ExtraFileUploadMode } from '../../../../lib/components/fileupload/fileupload.component';

@Component({
  selector: 'app-fileupload-default',
  standalone: true,
  imports: [ExtraFileUploadComponent],
  template: `
    <extra-fileupload
      [mode]="mode"
      [dragAndDrop]="dragAndDrop"
      [multiple]="multiple"
      [accept]="accept"
      [maxFileSize]="maxFileSize"
      [disabled]="disabled"
    ></extra-fileupload>
  `,
})
export class FileUploadDefaultComponent {
  @Input() mode: ExtraFileUploadMode = 'manual';
  @Input() dragAndDrop = true;
  @Input() multiple = true;
  @Input() accept = 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  @Input() maxFileSize = 1000000;
  @Input() disabled = false;
}
