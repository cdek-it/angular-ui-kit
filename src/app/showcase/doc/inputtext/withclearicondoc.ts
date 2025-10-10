import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'with-clear-icon-doc',
    template: `
        <app-docsectiontext>
            <p>InputText с иконкой очищения.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iconField iconPosition="right">
                <p-inputIcon (click)="onClearInput()" [style.visibility]="value ? 'visible' : 'hidden'" style="cursor: pointer" styleClass="pi pi-times" />
                <input type="text" pInputText [(ngModel)]="value" />
            </p-iconField>
        </div>
        <app-code [code]="code" selector="input-text-basic-demo"></app-code>
    `
})
export class WithClearIconDoc {
    value: string;

    onClearInput(): void {
        this.value = '';
    }

    code: Code = {
        basic: `<p-iconField iconPosition="right">
    <p-inputIcon (click)="onClearInput()" [style.visibility]="value ? 'visible' : 'hidden'" style="cursor: pointer" styleClass="pi pi-times" />
    <input type="text" pInputText [(ngModel)]="value" />
</p-iconField>`,

        html: `<div class="card flex justify-center">
    <p-iconField iconPosition="right">
        <p-inputIcon (click)="onClearInput()" [style.visibility]="value ? 'visible' : 'hidden'" style="cursor: pointer" styleClass="pi pi-times" />
        <input type="text" pInputText [(ngModel)]="value" />
    </p-iconField>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-text-basic-demo',
    templateUrl: './input-text-basic-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule, InputIconModule, IconFieldModule]
})
export class WithClearIconDoc {
    value: string;

    onClearInput(): void {
        this.value = '';
    }
}`
    };
}
