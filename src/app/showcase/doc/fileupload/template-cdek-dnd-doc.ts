import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

enum UploadStatus {
    Pending = 'pending',
    Uploading = 'uploading',
    Uploaded = 'uploaded',
    Error = 'error'
}

interface IFileData {
    file: File;
    status: UploadStatus;
}

@Component({
    selector: 'file-upload-template-cdek-dnd-demo',
    template: `
        <app-docsectiontext>
            <p>Загрузка файлов через Drag-and-Drop, на базе собственных template согласно дизайн системе СДЭК</p>
            <p>
                Для корректного отображения Drag-and-Drop и списка файлов, необходимо использовать <i>styleClass="p-fileupload-dnd"</i>, а также шаблоны <i>header</i>, <i>content</i> и <i>file</i>(в противном случае будут применяться стандартные
                стили для аплоадера)
            </p>
            <p>Для автоматической загрузки файлов при выборе необходимо использовать метод <i>onSelectedFiles()</i>.</p>
            <p style="margin: 0;">В Дизайн системе возможны два варианта отображения списка файлов:</p>
            <p style="margin: 0;">- Список файлов, в виде списка с возможностью изменения порядка файлов</p>
            <p>- Простой список файлов</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-col gap-2">
                <span class="caption-secondary">Вариант отображения списка файлов:</span>
                <div class="flex flex-row">
                    <p-selectButton [options]="stateOptions" [(ngModel)]="filesListMode" />
                </div>
            </div>
            <p-divider />
            <p-toast [life]="3000" />
            <p-fileUpload
                [styleClass]="'p-fileupload-dnd ' + (isSelectedFilesExist ? 'gap-2' : '')"
                [multiple]="true"
                accept="image/*"
                maxFileSize="1000000"
                [invalidFileSizeMessageSummary]="invalidFileSizeMessageSummary"
                [invalidFileSizeMessageDetail]="invalidFileSizeMessageDetail"
                [invalidFileTypeMessageSummary]="invalidFileTypeMessageSummary"
                [invalidFileTypeMessageDetail]="invalidFileTypeMessageDetail"
                (dragover)="$event.preventDefault()"
                (drop)="fileUploadControl.onDrop($event)"
                (onSelect)="onSelectedFiles($event)"
                #fileUploadControl
            >
                <ng-template pTemplate="header" let-files let-chooseCallback="chooseCallback">
                    <button type="button" (click)="onOpenChooseDialog()">
                        <i class="text-7xl pi pi pi-upload"></i>
                        <div>
                            <p class="m-0 text-lg font-semibold">Чтобы загрузить файлы кликните или перетащите их в эту область.</p>
                            <p class="m-0 text-base text-slate-500">Можно загрузить не более N файлов размеров N MB</p>
                        </div>
                    </button>
                </ng-template>
                <ng-template pTemplate="content">
                    <ng-template [ngIf]="isSelectedFilesExist">
                        <!-- Оставить только один -->
                        <p-dataView *ngIf="filesListMode === 'Data-View'" #dataViewFiles [value]="selectedFiles">
                            <ng-template pTemplate="list" let-selectedFiles>
                                <div *ngFor="let data of selectedFiles; let i = index" class="p-fileupload-item-row flex flex-row items-center gap-2" [ngClass]="{ error: data.status === uploadStatus.Error }">
                                    <div class="flex flex-row flex-1 items-center gap-2">
                                        <ng-container [ngSwitch]="data.status">
                                            <p-progressSpinner *ngSwitchCase="uploadStatus.Uploading" styleClass="p-fileupload-progress-spinner" ariaLabel="loading" />
                                            <i *ngSwitchCase="uploadStatus.Uploaded" class="ti ti-file-check text-xl"></i>
                                            <i *ngSwitchCase="uploadStatus.Error" class="ti ti-file-alert text-xl file-icon"></i>
                                            <i *ngSwitchDefault class="ti ti-file text-xl"></i>
                                        </ng-container>

                                        <div class="flex flex-col flex-1 gap-1">
                                            <span class="body-regular-base">{{ data.file.name }}</span>
                                            <span class="caption-secondary">{{ data.file.size }}</span>
                                        </div>
                                    </div>

                                    <div *ngIf="data.file?.objectURL">
                                        <img [src]="data.file.objectURL" width="35" />
                                    </div>
                                    <p-button icon="ti ti-trash-x" [disabled]="data.status === uploadStatus.Uploading" [text]="true" severity="danger" (click)="onRemove($event, i)" />
                                </div>
                            </ng-template>
                        </p-dataView>

                        <!-- Оставить только один -->
                        <p-orderList *ngIf="filesListMode === 'Drag-and-Drop'" [value]="selectedFiles" [dragdrop]="true">
                            <ng-template let-data let-index="index" pTemplate="item">
                                <div class="p-fileupload-item-row flex flex-row items-center gap-2" [ngClass]="{ error: data.status === uploadStatus.Error }">
                                    <div class="flex flex-row flex-1 items-center gap-2">
                                        <ng-container [ngSwitch]="data.status">
                                            <p-progressSpinner *ngSwitchCase="uploadStatus.Uploading" styleClass="p-fileupload-progress-spinner" ariaLabel="loading" />
                                            <i *ngSwitchCase="uploadStatus.Uploaded" class="ti ti-file-check text-xl"></i>
                                            <i *ngSwitchCase="uploadStatus.Error" class="ti ti-file-alert text-xl file-icon"></i>
                                            <i *ngSwitchDefault class="ti ti-file text-xl"></i>
                                        </ng-container>

                                        <div class="flex flex-col flex-1 gap-1">
                                            <span class="body-regular-base">{{ data.file.name }}</span>
                                            <span class="caption-secondary">{{ data.file.size }}</span>
                                        </div>
                                    </div>

                                    <div *ngIf="data.file?.objectURL">
                                        <img [src]="data.file.objectURL" width="35" />
                                    </div>
                                    <p-button
                                        icon="ti ti-trash-x"
                                        [disabled]="data.status === uploadStatus.Uploading"
                                        [text]="true"
                                        severity="danger"
                                        (click)="onRemove($event, index)"
                                        (mousedown)="$event.stopPropagation()"
                                        (touchstart)="$event.stopPropagation()"
                                    />
                                    <i class="ti ti-grip-vertical text-xl"></i>
                                </div>
                            </ng-template>
                        </p-orderList>

                        <!-- Удалить секцию если не используется -->
                        <div class="flex flex-row justify-between items-center">
                            <p-button label="Отправить" [raised]="true" [loading]="isFilesProcessing" (onClick)="onUploadAll()" />
                            <p-button label="Очистить" [text]="true" severity="danger" [loading]="isFilesProcessing" (onClick)="onRemoveAll()" />
                        </div>
                    </ng-template>
                </ng-template>
                <ng-template pTemplate="file"></ng-template>
            </p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-cdek-template-demo"></app-code>
    `,
    providers: [MessageService]
})
export class TemplateCdekDndDoc {
    readonly stateOptions = ['Data-View', 'Drag-and-Drop'];

    filesListMode: string = this.stateOptions[0];

    @ViewChild('fileUploadControl') fileUploadControl!: FileUpload;

    readonly invalidFileSizeMessageSummary = '{0}: Недопустимый размер файла';
    readonly invalidFileSizeMessageDetail = 'максимальный допустимый размер {0}.';
    readonly invalidFileTypeMessageSummary = 'Недопустимый тип файла {0}';
    readonly invalidFileTypeMessageDetail = 'допустимые типы файлов: PDF, JPG, JPEG.';

    selectedFiles: IFileData[] = [];

    readonly uploadStatus = UploadStatus;
    isFilesProcessing = false;

    get isSelectedFilesExist(): boolean {
        return this.selectedFiles?.length > 0;
    }

    constructor(
        private readonly messageService: MessageService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    onOpenChooseDialog(): void {
        if (this.fileUploadControl) {
            this.fileUploadControl.choose();
        }
    }

    onRemove(event: Event, index: number): void {
        this.fileUploadControl.remove(event, index);
        this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);

        this.cdr.markForCheck();
    }

    onUploadAll(): void {
        let aploadedNames = new Set<string>();
        const promises = this.selectedFiles.map((file, i) => {
            // 1) Если уже Uploaded — сразу возвращаем resolved-промис, ничего не делаем
            if (file.status === UploadStatus.Uploaded) {
                aploadedNames.add(file.file.name);
                return Promise.resolve();
            }

            // 2) Иначе меняем статус на Uploading…
            this.selectedFiles[i].status = UploadStatus.Uploading;
            return this.simulateUpload(i);
        });

        this.isFilesProcessing = true;

        this.cdr.markForCheck();

        Promise.all(promises).then(() => {
            this.isFilesProcessing = false;

            // Собираем списки имён
            const successNames = this.selectedFiles.filter((f) => !aploadedNames.has(f.file.name) && f.status === UploadStatus.Uploaded).map((f) => f.file.name);
            const errorNames = this.selectedFiles.filter((f) => f.status === UploadStatus.Error).map((f) => f.file.name);

            const messages: Message[] = [];
            if (successNames?.length) {
                messages.push({
                    severity: 'success',
                    summary: successNames.join(', '),
                    detail: 'Успешно загружены'
                });
            }
            if (errorNames.length) {
                messages.push({
                    severity: 'error',
                    summary: errorNames.join(', '),
                    detail: 'Ошибка загрузки'
                });
            }

            this.messageService.addAll(messages);

            this.cdr.markForCheck();
        });
    }

    onRemoveAll(): void {
        this.isFilesProcessing = true;

        setTimeout(() => {
            this.selectedFiles = [];
            this.fileUploadControl.clear();

            this.isFilesProcessing = false;
            this.cdr.markForCheck();
        }, 3000);
    }

    onSelectedFiles(event: { currentFiles: File[] }) {
        // 1) Определяем функцию-идентификатор файла (по name+size+lastModified, т.к. сами объекты File могут быть разными)
        const fileId = (f: File) => `${f.name}|${f.size}|${f.lastModified}`;

        // 2) Собираем Set уже добавленных файлов
        const existingIds = new Set(this.selectedFiles.map((sf) => fileId(sf.file)));

        // 3) Фильтруем только те файлы из event.currentFiles, которых ещё нет
        const newFiles = event.currentFiles.filter((f) => !existingIds.has(fileId(f))).map((f) => ({ file: f, status: UploadStatus.Pending }));

        // 4) Собираем новый массив: сначала старые, потом только что отфильтрованные новые
        this.selectedFiles = [...this.selectedFiles, ...newFiles];

        if (this.fileUploadControl.msgs?.length) {
            this.messageService.addAll(this.fileUploadControl.msgs);
        }

        this.cdr.markForCheck();
    }

    private simulateUpload(index: number): Promise<void> {
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 500;
            setTimeout(() => {
                this.selectedFiles[index].status = Math.random() > 0.3 ? UploadStatus.Uploaded : UploadStatus.Error;
                this.cdr.markForCheck();
                resolve();
            }, delay);
        });
    }

    code: Code = {
        basic: `
            <p-toast [life]="3000" />
            <p-fileUpload
                [styleClass]="'p-fileupload-dnd ' + (isSelectedFilesExist ? 'gap-2' : '')"
                [multiple]="true"
                accept="image/*"
                maxFileSize="1000000"
                [invalidFileSizeMessageSummary]="invalidFileSizeMessageSummary"
                [invalidFileSizeMessageDetail]="invalidFileSizeMessageDetail"
                [invalidFileTypeMessageSummary]="invalidFileTypeMessageSummary"
                [invalidFileTypeMessageDetail]="invalidFileTypeMessageDetail"
                (dragover)="$event.preventDefault()"
                (drop)="fileUploadControl.onDrop($event)"
                (onSelect)="onSelectedFiles($event)"
                #fileUploadControl
            >
                <ng-template pTemplate="header" let-files let-chooseCallback="chooseCallback">
                    <button type="button" (click)="onOpenChooseDialog()">
                        <i class="text-7xl pi pi pi-upload"></i>
                        <div>
                            <p class="m-0 text-lg font-semibold">Чтобы загрузить файлы кликните или перетащите их в эту область.</p>
                            <p class="m-0 text-base text-slate-500">Можно загрузить не более N файлов размеров N MB</p>
                        </div>
                    </button>
                </ng-template>
                <ng-template pTemplate="content">
                    <ng-template [ngIf]="isSelectedFilesExist">
                        <!-- Оставить только один -->
                        <p-dataView #dataViewFiles [value]="selectedFiles">
                            <ng-template pTemplate="list" let-selectedFiles>
                                <div *ngFor="let data of selectedFiles; let i = index" class="p-fileupload-item-row flex flex-row items-center gap-2" [ngClass]="{ error: data.status === uploadStatus.Error }">
                                    <div class="flex flex-row flex-1 items-center gap-2">
                                        <ng-container [ngSwitch]="data.status">
                                            <p-progressSpinner *ngSwitchCase="uploadStatus.Uploading" styleClass="p-fileupload-progress-spinner" ariaLabel="loading" />
                                            <i *ngSwitchCase="uploadStatus.Uploaded" class="ti ti-file-check text-xl"></i>
                                            <i *ngSwitchCase="uploadStatus.Error" class="ti ti-file-alert text-xl file-icon"></i>
                                            <i *ngSwitchDefault class="ti ti-file text-xl"></i>
                                        </ng-container>

                                        <div class="flex flex-col flex-1 gap-1">
                                            <span class="body-regular-base">{{ data.file.name }}</span>
                                            <span class="caption-secondary">{{ data.file.size }}</span>
                                        </div>
                                    </div>

                                    <div *ngIf="data.file?.objectURL">
                                        <img [src]="data.file.objectURL" width="35" />
                                    </div>
                                    <p-button icon="ti ti-trash-x" [disabled]="data.status === uploadStatus.Uploading" [text]="true" severity="danger" (click)="onRemove($event, i)" />
                                </div>
                            </ng-template>
                        </p-dataView>

                        <!-- Оставить только один -->
                        <p-orderList [value]="selectedFiles" [dragdrop]="true">
                            <ng-template let-data let-index="index" pTemplate="item">
                                <div class="p-fileupload-item-row flex flex-row items-center gap-2" [ngClass]="{ error: data.status === uploadStatus.Error }">
                                    <div class="flex flex-row flex-1 items-center gap-2">
                                        <ng-container [ngSwitch]="data.status">
                                            <p-progressSpinner *ngSwitchCase="uploadStatus.Uploading" styleClass="p-fileupload-progress-spinner" ariaLabel="loading" />
                                            <i *ngSwitchCase="uploadStatus.Uploaded" class="ti ti-file-check text-xl"></i>
                                            <i *ngSwitchCase="uploadStatus.Error" class="ti ti-file-alert text-xl file-icon"></i>
                                            <i *ngSwitchDefault class="ti ti-file text-xl"></i>
                                        </ng-container>

                                        <div class="flex flex-col flex-1 gap-1">
                                            <span class="body-regular-base">{{ data.file.name }}</span>
                                            <span class="caption-secondary">{{ data.file.size }}</span>
                                        </div>
                                    </div>

                                    <div *ngIf="data.file?.objectURL">
                                        <img [src]="data.file.objectURL" width="35" />
                                    </div>
                                    <p-button
                                        icon="ti ti-trash-x"
                                        [disabled]="data.status === uploadStatus.Uploading"
                                        [text]="true"
                                        severity="danger"
                                        (click)="onRemove($event, index)"
                                        (mousedown)="$event.stopPropagation()"
                                        (touchstart)="$event.stopPropagation()"
                                    />
                                    <i class="ti ti-grip-vertical text-xl"></i>
                                </div>
                            </ng-template>
                        </p-orderList>

                        <!-- Удалить секцию если не используется -->
                        <div class="flex flex-row justify-between items-center">
                            <p-button label="Отправить" [raised]="true" [loading]="isFilesProcessing" (onClick)="onUploadAll()" />
                            <p-button label="Очистить" [text]="true" severity="danger" [loading]="isFilesProcessing" (onClick)="onRemoveAll()" />
                        </div>
                    </ng-template>
                </ng-template>
                <ng-template pTemplate="file"></ng-template>
            </p-fileUpload>`,
        html: `
        <div class="card">
            <p-toast [life]="3000" />
            <p-fileUpload
                [styleClass]="'p-fileupload-dnd ' + (isSelectedFilesExist ? 'gap-2' : '')"
                [multiple]="true"
                accept="image/*"
                maxFileSize="1000000"
                [invalidFileSizeMessageSummary]="invalidFileSizeMessageSummary"
                [invalidFileSizeMessageDetail]="invalidFileSizeMessageDetail"
                [invalidFileTypeMessageSummary]="invalidFileTypeMessageSummary"
                [invalidFileTypeMessageDetail]="invalidFileTypeMessageDetail"
                (dragover)="$event.preventDefault()"
                (drop)="fileUploadControl.onDrop($event)"
                (onSelect)="onSelectedFiles($event)"
                #fileUploadControl
            >
                <ng-template pTemplate="header" let-files let-chooseCallback="chooseCallback">
                    <button type="button" (click)="onOpenChooseDialog()">
                        <i class="text-7xl pi pi pi-upload"></i>
                        <div>
                            <p class="m-0 text-lg font-semibold">Чтобы загрузить файлы кликните или перетащите их в эту область.</p>
                            <p class="m-0 text-base text-slate-500">Можно загрузить не более N файлов размеров N MB</p>
                        </div>
                    </button>
                </ng-template>
                <ng-template pTemplate="content">
                    <ng-template [ngIf]="isSelectedFilesExist">
                        <!-- Оставить только один -->
                        <p-dataView #dataViewFiles [value]="selectedFiles">
                            <ng-template pTemplate="list" let-selectedFiles>
                                <div *ngFor="let data of selectedFiles; let i = index" class="p-fileupload-item-row flex flex-row items-center gap-2" [ngClass]="{ error: data.status === uploadStatus.Error }">
                                    <div class="flex flex-row flex-1 items-center gap-2">
                                        <ng-container [ngSwitch]="data.status">
                                            <p-progressSpinner *ngSwitchCase="uploadStatus.Uploading" styleClass="p-fileupload-progress-spinner" ariaLabel="loading" />
                                            <i *ngSwitchCase="uploadStatus.Uploaded" class="ti ti-file-check text-xl"></i>
                                            <i *ngSwitchCase="uploadStatus.Error" class="ti ti-file-alert text-xl file-icon"></i>
                                            <i *ngSwitchDefault class="ti ti-file text-xl"></i>
                                        </ng-container>

                                        <div class="flex flex-col flex-1 gap-1">
                                            <span class="body-regular-base">{{ data.file.name }}</span>
                                            <span class="caption-secondary">{{ data.file.size }}</span>
                                        </div>
                                    </div>

                                    <div *ngIf="data.file?.objectURL">
                                        <img [src]="data.file.objectURL" width="35" />
                                    </div>
                                    <p-button icon="ti ti-trash-x" [disabled]="data.status === uploadStatus.Uploading" [text]="true" severity="danger" (click)="onRemove($event, i)" />
                                </div>
                            </ng-template>
                        </p-dataView>

                        <!-- Оставить только один -->
                        <p-orderList [value]="selectedFiles" [dragdrop]="true">
                            <ng-template let-data let-index="index" pTemplate="item">
                                <div class="p-fileupload-item-row flex flex-row items-center gap-2" [ngClass]="{ error: data.status === uploadStatus.Error }">
                                    <div class="flex flex-row flex-1 items-center gap-2">
                                        <ng-container [ngSwitch]="data.status">
                                            <p-progressSpinner *ngSwitchCase="uploadStatus.Uploading" styleClass="p-fileupload-progress-spinner" ariaLabel="loading" />
                                            <i *ngSwitchCase="uploadStatus.Uploaded" class="ti ti-file-check text-xl"></i>
                                            <i *ngSwitchCase="uploadStatus.Error" class="ti ti-file-alert text-xl file-icon"></i>
                                            <i *ngSwitchDefault class="ti ti-file text-xl"></i>
                                        </ng-container>

                                        <div class="flex flex-col flex-1 gap-1">
                                            <span class="body-regular-base">{{ data.file.name }}</span>
                                            <span class="caption-secondary">{{ data.file.size }}</span>
                                        </div>
                                    </div>

                                    <div *ngIf="data.file?.objectURL">
                                        <img [src]="data.file.objectURL" width="35" />
                                    </div>
                                    <p-button
                                        icon="ti ti-trash-x"
                                        [disabled]="data.status === uploadStatus.Uploading"
                                        [text]="true"
                                        severity="danger"
                                        (click)="onRemove($event, index)"
                                        (mousedown)="$event.stopPropagation()"
                                        (touchstart)="$event.stopPropagation()"
                                    />
                                    <i class="ti ti-grip-vertical text-xl"></i>
                                </div>
                            </ng-template>
                        </p-orderList>

                        <!-- Удалить секцию если не используется -->
                        <div class="flex flex-row justify-between items-center">
                            <p-button label="Отправить" [raised]="true" [loading]="isFilesProcessing" (onClick)="onUploadAll()" />
                            <p-button label="Очистить" [text]="true" severity="danger" [loading]="isFilesProcessing" (onClick)="onRemoveAll()" />
                        </div>
                    </ng-template>
                </ng-template>
                <ng-template pTemplate="file"></ng-template>
            </p-fileUpload>
        </div>`,
        typescript: `import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { Message, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { OrderListModule } from 'primeng/orderlist';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

enum UploadStatus {
    Pending = 'pending',
    Uploading = 'uploading',
    Uploaded = 'uploaded',
    Error = 'error'
}

interface IFileData {
    file: File;
    status: UploadStatus;
}

@Component({
    selector: 'file-upload-template-cdek-dnd-demo',
    templateUrl: './file-upload-template-cdek-dnd-demo.html',
    standalone: true,
    imports: [FileUploadModule, ButtonModule, CommonModule, ProgressSpinnerModule, OrderListModule, DataViewModule],
    providers: [MessageService]
})
export class TemplateCdekDndDoc {
    @ViewChild('fileUploadControl') fileUploadControl!: FileUpload;

    readonly invalidFileSizeMessageSummary = '{0}: Недопустимый размер файла';
    readonly invalidFileSizeMessageDetail = 'максимальный допустимый размер {0}.';
    readonly invalidFileTypeMessageSummary = 'Недопустимый тип файла {0}';
    readonly invalidFileTypeMessageDetail = 'допустимые типы файлов: PDF, JPG, JPEG.';

    selectedFiles: IFileData[] = [];

    readonly uploadStatus = UploadStatus;
    isFilesProcessing = false;

    get isSelectedFilesExist(): boolean {
        return this.selectedFiles?.length > 0;
    }

    constructor(
        private readonly messageService: MessageService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    onOpenChooseDialog(): void {
        if (this.fileUploadControl) {
            this.fileUploadControl.choose();
        }
    }

    onRemove(event: Event, index: number): void {
        this.fileUploadControl.remove(event, index);
        this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);

        this.cdr.markForCheck();
    }

    onUploadAll(): void {
        let aploadedNames = new Set<string>();
        const promises = this.selectedFiles.map((file, i) => {
            // 1) Если уже Uploaded — сразу возвращаем resolved-промис, ничего не делаем
            if (file.status === UploadStatus.Uploaded) {
                aploadedNames.add(file.file.name);
                return Promise.resolve();
            }

            // 2) Иначе меняем статус на Uploading…
            this.selectedFiles[i].status = UploadStatus.Uploading;
            return this.simulateUpload(i);
        });

        this.isFilesProcessing = true;

        this.cdr.markForCheck();

        Promise.all(promises).then(() => {
            this.isFilesProcessing = false;

            // Собираем списки имён
            const successNames = this.selectedFiles.filter((f) => !aploadedNames.has(f.file.name) && f.status === UploadStatus.Uploaded).map((f) => f.file.name);
            const errorNames = this.selectedFiles.filter((f) => f.status === UploadStatus.Error).map((f) => f.file.name);

            const messages: Message[] = [];
            if (successNames?.length) {
                messages.push({
                    severity: 'success',
                    summary: successNames.join(', '),
                    detail: 'Успешно загружены'
                });
            }
            if (errorNames.length) {
                messages.push({
                    severity: 'error',
                    summary: errorNames.join(', '),
                    detail: 'Ошибка загрузки'
                });
            }

            this.messageService.addAll(messages);

            this.cdr.markForCheck();
        });
    }

    onRemoveAll(): void {
        this.isFilesProcessing = true;

        setTimeout(() => {
            this.selectedFiles = [];
            this.fileUploadControl.clear();

            this.isFilesProcessing = false;
            this.cdr.markForCheck();
        }, 3000);
    }

    onSelectedFiles(event: { currentFiles: File[] }) {
        // 1) Определяем функцию-идентификатор файла (по name+size+lastModified, т.к. сами объекты File могут быть разными)
        const fileId = (f: File) => \`\${f.name}|\${f.size}|\${f.lastModified}\`;

        // 2) Собираем Set уже добавленных файлов
        const existingIds = new Set(this.selectedFiles.map((sf) => fileId(sf.file)));

        // 3) Фильтруем только те файлы из event.currentFiles, которых ещё нет
        const newFiles = event.currentFiles.filter((f) => !existingIds.has(fileId(f))).map((f) => ({ file: f, status: UploadStatus.Pending }));

        // 4) Собираем новый массив: сначала старые, потом только что отфильтрованные новые
        this.selectedFiles = [...this.selectedFiles, ...newFiles];

        if (this.fileUploadControl.msgs?.length) {
            this.messageService.addAll(this.fileUploadControl.msgs);
        }

        this.cdr.markForCheck();
    }

    private simulateUpload(index: number): Promise<void> {
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 500;
            setTimeout(() => {
                this.selectedFiles[index].status = Math.random() > 0.3 ? UploadStatus.Uploaded : UploadStatus.Error;
                this.cdr.markForCheck();
                resolve();
            }, delay);
        });
    }

}`
    };
}
