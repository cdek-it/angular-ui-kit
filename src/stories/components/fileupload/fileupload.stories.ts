import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { ExtraFileUploadComponent } from '../../../lib/components/fileupload/fileupload.component';
import { FileUploadDefaultComponent } from './examples/fileupload-default.component';
import { FileUploadFormComponent } from './examples/fileupload-form.component';

const meta: Meta<ExtraFileUploadComponent> = {
  title: 'Components/Form/FileUpload',
  component: ExtraFileUploadComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      imports: [FileUploadDefaultComponent, FileUploadFormComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `Компонент загрузки файлов с поддержкой drag-and-drop, прогресс-бара и предпросмотра файлов.

\`\`\`typescript
import { ExtraFileUploadComponent } from '@cdek-it/angular-ui-kit';
\`\`\``,
      },
    },
    designTokens: { prefix: '--p-fileupload' },
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Разрешает выбирать несколько файлов за один раз',
      table: {
        category: 'Props',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    accept: {
      control: 'text',
      description: 'Шаблон разрешённых типов файлов',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    maxFileSize: {
      control: 'number',
      description: 'Максимальный размер одного файла в байтах',
      table: {
        category: 'Props',
        type: { summary: 'number' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность выбора и загрузки файлов',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    dropzoneTitle: { table: { disable: true } },
    dropzoneCaption: { table: { disable: true } },
    name: { table: { disable: true } },
    url: { table: { disable: true } },
    fileLimit: { table: { disable: true } },
    invalidFileSizeMessageSummary: { table: { disable: true } },
    invalidFileSizeMessageDetail: { table: { disable: true } },
    invalidFileTypeMessageSummary: { table: { disable: true } },
    invalidFileTypeMessageDetail: { table: { disable: true } },
    invalidFileLimitMessageSummary: { table: { disable: true } },
    invalidFileLimitMessageDetail: { table: { disable: true } },
    onSelectEvent: { table: { disable: true } },
    onRemoveEvent: { table: { disable: true } },
    onClearEvent: { table: { disable: true } },
    onError: { table: { disable: true } },
    onUpload: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ExtraFileUploadComponent>;

export const WithForm: Story = {
  name: 'Reactive Form',
  render: () => ({
    template: `<app-fileupload-form></app-fileupload-form>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Пример использования компонента как formControl в реактивной форме с валидацией required.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ExtraFileUploadComponent } from '@cdek-it/angular-ui-kit';

@Component({
  standalone: true,
  imports: [ExtraFileUploadComponent, ReactiveFormsModule],
  template: \`<extra-fileupload [formControl]="control"></extra-fileupload>\`,
})
export class ExampleComponent {
  control = new FormControl<File[]>([], { validators: [Validators.required] });
}
        `,
      },
    },
  },
};

export const Default: Story = {
  name: 'Default',
  render: (args: any) => ({
    props: {
      multiple: args['multiple'],
      accept: args['accept'],
      maxFileSize: args['maxFileSize'],
      disabled: args['disabled'],
    },
    template: `
      <app-fileupload-default
        [multiple]="multiple"
        [accept]="accept"
        [maxFileSize]="maxFileSize"
        [disabled]="disabled"
      ></app-fileupload-default>
    `,
  }),
  args: {
    multiple: true,
    accept: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    maxFileSize: 1000000,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Базовый пример загрузчика файлов с drag-and-drop зоной, карточками файлов и кнопками отправки/очистки.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { ExtraFileUploadComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraFileUploadComponent],
  template: \`
    <extra-fileupload
      [multiple]="true"
      accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      [maxFileSize]="1000000"
    ></extra-fileupload>
  \`,
})
export class ExampleComponent {}
        `,
      },
    },
  },
};
