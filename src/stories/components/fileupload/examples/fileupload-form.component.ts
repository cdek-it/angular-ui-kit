import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ExtraFileUploadComponent } from '../../../../lib/components/fileupload/fileupload.component';

@Component({
  selector: 'app-fileupload-form',
  standalone: true,
  imports: [ExtraFileUploadComponent, ReactiveFormsModule],
  template: `
    <form>
      <extra-fileupload [formControl]="control"></extra-fileupload>
      @if (control.invalid && control.touched) {
        <p style="color: var(--p-red-500); margin-top: 0.5rem;">Необходимо выбрать хотя бы один файл</p>
      }
    </form>
  `,
})
export class FileUploadFormComponent {
  control = new FormControl<File[]>([], { validators: [Validators.required] });
}
