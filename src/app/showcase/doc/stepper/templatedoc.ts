import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Кастомный шаблон</p>
        </app-docsectiontext>
        <div class="flex justify-center gap-4">
            <div class="flex justify-center gap-2">
                <label for="switch-line">Без линии</label>
                <p-inputSwitch inputId="switch-line" [(ngModel)]="isLine" />
            </div>
            <div class="flex justify-center gap-2">
                <label for="switch-err">Ошибка</label>
                <p-inputSwitch inputId="switch-err" [(ngModel)]="isInvalid" />
            </div>
            <div class="flex justify-center gap-2">
                <label for="switch-dis">Отключен</label>
                <p-inputSwitch inputId="switch-dis" [(ngModel)]="disabled" />
            </div>
        </div>
        <div class="card flex justify-center">
            <p-stepper [(activeStep)]="active" [ngClass]="isLine ? 'no-line' : ''" [linear]="disabled">
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index" class="p-dander">
                        <button type="button" class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                            <span class="p-stepper-number">
                                {{ index + 1 }}
                            </span>
                            <div class="p-stepper-title-wrapper">
                                <span class="p-stepper-title">Stepper</span>
                                <span class="caption-secondary">caption</span>
                            </div>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                            <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                        </div>
                        <div class="flex pt-6 justify-end">
                            <p-button (onClick)="nextCallback.emit()" label="Далее" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepperPanel>
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                            <span class="p-stepper-icon">
                                <i class="ti ti-chevrons-right"></i>
                            </span>
                            <div class="p-stepper-title-wrapper">
                                <span class="p-stepper-title">Stepper</span>
                                <span class="caption-secondary">caption</span>
                            </div>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                        <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                            <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                        </div>
                        <div class="flex pt-6 justify-between">
                            <p-button (onClick)="prevCallback.emit()" label="Назад" icon="pi pi-arrow-left" [outlined]="true" />
                            <p-button (onClick)="nextCallback.emit()" label="Далее" icon="pi pi-arrow-right" iconPos="right" />
                        </div>
                    </ng-template>
                </p-stepperPanel>
                <p-stepperPanel>
                    <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                        <button type="button" class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                            <span class="p-stepper-number">
                                {{ index + 1 }}
                            </span>
                            <div class="p-stepper-title-wrapper">
                                <span class="p-stepper-title">Stepper</span>
                                <span class="caption-secondary">caption</span>
                            </div>
                        </button>
                    </ng-template>
                    <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                        <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                            <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                        </div>
                        <div class="flex pt-6 justify-start">
                            <p-button (onClick)="prevCallback.emit()" label="Назад" severity="secondary" icon="pi pi-arrow-left" [outlined]="true" />
                        </div>
                    </ng-template>
                </p-stepperPanel>
            </p-stepper>
        </div>
        <app-code [code]="code" selector="stepper-template-demo"></app-code>
    `,
    styles: [
        `
            .p-stepper {
                flex-basis: 40rem;
            }
        `
    ]
})
export class TemplateDoc {
    active: number | undefined = 0;

    isLine: boolean | undefined = false;

    isInvalid: boolean | undefined = false;

    disabled: boolean | undefined = false;

    code: Code = {
        basic: `<div class="flex justify-center gap-4">
    <div class="flex justify-center gap-2">
        <label for="switch-line">Без линии</label>
        <p-inputSwitch inputId="switch-line" [(ngModel)]="isLine"/>
    </div>
    <div class="flex justify-center gap-2">
        <label for="switch-err">Ошибка</label>
        <p-inputSwitch inputId="switch-err" [(ngModel)]="isInvalid"/>
    </div>
    <div class="flex justify-center gap-2">
        <label for="switch-dis">Отключен</label>
        <p-inputSwitch inputId="switch-dis" [(ngModel)]="disabled"/>
    </div>
</div>
<div class="card flex justify-center">
    <p-stepper [(activeStep)]="active" [ngClass]="isLine ? 'no-line' : ''" [linear]="disabled">
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index" class="p-dander">
                <button type="button" class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                    <span class="p-stepper-number">
                        {{ index + 1 }}
                    </span>
                    <div class="p-stepper-title-wrapper">
                        <span class="p-stepper-title">Stepper</span>
                        <span class="caption-secondary">caption</span>
                    </div>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                    <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                </div>
                <div class="flex pt-6 justify-end">
                    <p-button (onClick)="nextCallback.emit()" label="Далее" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                    <span class="p-stepper-icon">
                        <i class="ti ti-chevrons-right"></i>
                    </span>
                    <div class="p-stepper-title-wrapper">
                        <span class="p-stepper-title">Stepper</span>
                        <span class="caption-secondary">caption</span>
                    </div>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                    <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                </div>
                <div class="flex pt-6 justify-between">
                    <p-button (onClick)="prevCallback.emit()" label="Назад" icon="pi pi-arrow-left" [outlined]="true" />
                    <p-button (onClick)="nextCallback.emit()" label="Далее1" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button type="button" class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                    <span class="p-stepper-number">
                        {{ index + 1 }}
                    </span>
                    <div class="p-stepper-title-wrapper">
                        <span class="p-stepper-title">Stepper</span>
                        <span class="caption-secondary">caption</span>
                    </div>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                    <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                </div>
                <div class="flex pt-6 justify-start">
                    <p-button (onClick)="prevCallback.emit()" label="Назад" severity="secondary" icon="pi pi-arrow-left" [outlined]="true" />
                </div>
            </ng-template>
        </p-stepperPanel>
    </p-stepper>
</div>`,

        html: `<div class="flex justify-center gap-4">
    <div class="flex justify-center gap-2">
        <label for="switch-line">Без линии</label>
        <p-inputSwitch inputId="switch-line" [(ngModel)]="isLine"/>
    </div>
    <div class="flex justify-center gap-2">
        <label for="switch-err">Ошибка</label>
        <p-inputSwitch inputId="switch-err" [(ngModel)]="isInvalid"/>
    </div>
    <div class="flex justify-center gap-2">
        <label for="switch-dis">Отключен</label>
        <p-inputSwitch inputId="switch-dis" [(ngModel)]="disabled"/>
    </div>
</div>
<div class="card flex justify-center">
    <p-stepper [(activeStep)]="active" [ngClass]="isLine ? 'no-line' : ''" [linear]="disabled">
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index" class="p-dander">
                <button type="button" class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                    <span class="p-stepper-number">
                        {{ index + 1 }}
                    </span>
                    <div class="p-stepper-title-wrapper">
                        <span class="p-stepper-title">Stepper</span>
                        <span class="caption-secondary">caption</span>
                    </div>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                    <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                </div>
                <div class="flex pt-6 justify-end">
                    <p-button (onClick)="nextCallback.emit()" label="Далее" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                    <span class="p-stepper-icon">
                        <i class="ti ti-chevrons-right"></i>
                    </span>
                    <div class="p-stepper-title-wrapper">
                        <span class="p-stepper-title">Stepper</span>
                        <span class="caption-secondary">caption</span>
                    </div>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                    <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                </div>
                <div class="flex pt-6 justify-between">
                    <p-button (onClick)="prevCallback.emit()" label="Назад" severity="secondary" icon="pi pi-arrow-left" [outlined]="true" />
                    <p-button (onClick)="nextCallback.emit()" label="Далее" icon="pi pi-arrow-right" iconPos="right" />
                </div>
            </ng-template>
        </p-stepperPanel>
        <p-stepperPanel>
            <ng-template pTemplate="header" let-onClick="onClick" let-index="index">
                <button type="button" class="p-stepper-action" [class.p-danger]="isInvalid" (click)="onClick.emit()">
                    <span class="p-stepper-number">
                        {{ index + 1 }}
                    </span>
                    <div class="p-stepper-title-wrapper">
                        <span class="p-stepper-title">Stepper</span>
                        <span class="caption-secondary">caption</span>
                    </div>
                </button>
            </ng-template>
            <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                <div class="flex flex-col gap-2 mx-auto justify-center" style="min-height: 16rem; max-width: 20rem">
                    <h2 class="flex justify-center">Контент {{ index + 1 }}</h2>
                </div>
                <div class="flex pt-6 justify-start">
                    <p-button (onClick)="prevCallback.emit()" label="Назад" severity="secondary" icon="pi pi-arrow-left" [outlined]="true" />
                </div>
            </ng-template>
        </p-stepperPanel>
    </p-stepper>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'stepper-template-demo',
    templateUrl: './stepper-template-demo.html',
    standalone: true,
    imports: [
      StepperModule,
      ButtonModule,
      InputTextModule,
      ToggleButtonModule,
      IconFieldModule,
      InputIconModule,
      CommonModule,
      InputSwitchModule
    ],
    styles: [
        \`.p-stepper {
            flex-basis: 40rem;
        }
        \`
    ]
})
export class StepperTemplateDemo {
        active: number | undefined = 0;

        isLine: boolean | undefined = false;

        isInvalid: boolean | undefined = false;

        disabled: boolean | undefined = false;

}`
    };
}
