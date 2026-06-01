import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { FileUploadComponent } from '../../../../lib/components/fileupload/fileupload.component';

@Component({
  selector: 'app-fileupload-form',
  standalone: true,
  imports: [FileUploadComponent, ReactiveFormsModule],
  template: `
    <form>
      <fileupload [formControl]="control"></fileupload>
      @if (control.invalid && control.touched) {
        <p style="color: var(--p-red-500); margin-top: 0.5rem;">Необходимо выбрать хотя бы один файл</p>
      }
      <p style="margin-top: 0.5rem; color: var(--p-text-muted-color);">
        Статус: {{ control.valid ? 'Валидна' : 'Не валидна' }} |
        Файлов: {{ control.value?.length ?? 0 }}
      </p>
    </form>
  `,
})
export class FileUploadFormComponent {
  control = new FormControl<File[]>([], { validators: [Validators.required] });
}
