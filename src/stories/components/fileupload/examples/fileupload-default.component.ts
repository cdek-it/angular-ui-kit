import { Component, Input } from '@angular/core';
import { FileUploadComponent } from '../../../../lib/components/fileupload/fileupload.component';

@Component({
  selector: 'app-fileupload-default',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <fileupload
      [multiple]="multiple"
      [accept]="accept"
      [maxFileSize]="maxFileSize"
      [disabled]="disabled"
    ></fileupload>
  `,
})
export class FileUploadDefaultComponent {
  @Input() multiple = true;
  @Input() accept = 'image/*,.pdf,.doc,.docx';
  @Input() maxFileSize = 1000000;
  @Input() disabled = false;
}
