import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideHttpClient } from '@angular/common/http';
import { ExtraFileUploadComponent } from '../../../lib/components/fileupload/fileupload.component';
import { FileUploadDefaultComponent } from './examples/fileupload-default.component';
import { FileUploadFormComponent } from './examples/fileupload-form.component';
import { FileUploadUploadErrorComponent } from './examples/fileupload-upload-error.component';

const meta: Meta<ExtraFileUploadComponent> = {
  title: 'Components/Form/FileUpload',
  component: ExtraFileUploadComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({ providers: [provideHttpClient()] }),
    moduleMetadata({
      imports: [FileUploadDefaultComponent, FileUploadFormComponent, FileUploadUploadErrorComponent],
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
    mode: {
      control: 'select',
      options: ['auto', 'manual', 'basic'],
      description: 'Режим загрузки; кнопка «Отправить» видна только в manual',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'manual' },
        type: { summary: "'auto' | 'manual' | 'basic'" },
      },
    },
    dragAndDrop: {
      control: 'boolean',
      description: 'Включает область drag-and-drop; при false — только кнопка выбора',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешает выбирать несколько файлов за один раз',
      table: {
        category: 'Свойства',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    accept: {
      control: 'text',
      description: 'Шаблон разрешённых типов файлов',
      table: {
        category: 'Свойства',
        type: { summary: 'string' },
      },
    },
    maxFileSize: {
      control: 'number',
      description: 'Максимальный размер одного файла в байтах',
      table: {
        category: 'Свойства',
        type: { summary: 'number' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает возможность выбора и загрузки файлов',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    uploadError: {
      control: 'text',
      description: 'Текст ошибки реальной отправки; выставляется приложением после своего HTTP-запроса',
      table: {
        category: 'Состояния',
        defaultValue: { summary: 'null' },
        type: { summary: 'string | null' },
      },
    },
    name: { table: { disable: true } },
    url: { table: { disable: true } },
    fileLimit: { table: { disable: true } },
    labels: { table: { disable: true } },
    messages: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    onRemove: { table: { disable: true } },
    onClear: { table: { disable: true } },
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
      mode: args['mode'],
      dragAndDrop: args['dragAndDrop'],
      multiple: args['multiple'],
      accept: args['accept'],
      maxFileSize: args['maxFileSize'],
      disabled: args['disabled'],
    },
    template: `
      <app-fileupload-default
        [mode]="mode"
        [dragAndDrop]="dragAndDrop"
        [multiple]="multiple"
        [accept]="accept"
        [maxFileSize]="maxFileSize"
        [disabled]="disabled"
      ></app-fileupload-default>
    `,
  }),
  args: {
    mode: 'manual',
    dragAndDrop: true,
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
      mode="manual"
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

export const Basic: Story = {
  name: 'Basic',
  render: () => ({
    template: `<extra-fileupload mode="basic"></extra-fileupload>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'mode="basic": одна кнопка выбора файла, без зоны дропа, списка и прогресса — приложение само рисует превью, статусы и ошибки. Дроп на саму кнопку по-прежнему работает.',
      },
    },
  },
};

export const WithoutDragAndDrop: Story = {
  name: 'Without drag-and-drop',
  render: () => ({
    template: `<extra-fileupload [dragAndDrop]="false"></extra-fileupload>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'dragAndDrop="false": вместо зоны дропа — только кнопка «Выбрать файл», перетаскивание файлов недоступно.',
      },
    },
  },
};

export const Auto: Story = {
  name: 'Auto upload',
  render: () => ({
    template: `<extra-fileupload mode="auto"></extra-fileupload>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'mode="auto": отправка начинается сразу после выбора файлов, без кнопки «Отправить».',
      },
    },
  },
};

export const UploadError: Story = {
  name: 'Upload error',
  render: () => ({
    template: `<app-fileupload-upload-error></app-fileupload-upload-error>`,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Ошибка отправки (XHR ≥400 или сеть) — компонент всегда работает в customUpload, реальный запрос и решение об ошибке остаются за приложением. Оно выставляет [uploadError], а компонент рисует сообщение на штатном месте — сразу после зоны дропа, перед списком файлов, как и success-сообщение. Очередь сохраняется, повторный клик по «Отправить» — штатный повтор той же пачки; отдельной кнопки «Повторить» или текста ошибки на уровне строки в ките нет.',
      },
      source: {
        language: 'ts',
        code: `
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExtraFileUploadComponent } from '@cdek-it/angular-ui-kit';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ExtraFileUploadComponent, ReactiveFormsModule],
  template: \`
    <extra-fileupload
      [formControl]="control"
      [uploadError]="uploadError"
    ></extra-fileupload>
  \`,
})
export class ExampleComponent {
  control = new FormControl<File[]>([/* файлы из формы */]);
  uploadError: string | null = null;

  onUpload(files: File[]): void {
    // реальный HTTP-запрос приложения; при провале — просто:
    // this.uploadError = 'Не удалось отправить файлы. Проверьте соединение и повторите попытку';
  }
}
        `,
      },
    },
  },
};
