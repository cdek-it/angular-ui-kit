import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>Disabled state FloatLabel is used by wrapping the input and its label. </p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText disabled [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText disabled [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>

        <div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText disabled ngModel="Text" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText disabled ngModel="Text" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="float-label-invalid-demo"></app-code>
    `
})
export class DisabledDoc {
    value: string | undefined;

    code: Code = {
        basic: `<div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText disabled [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText disabled [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>

        <div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText disabled ngModel="Text" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText disabled ngModel="Text" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>`,

        html: `<div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText disabled [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText disabled [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>

        <div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText disabled ngModel="Text" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText disabled ngModel="Text" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>`,

        typescript: `import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"

@Component({
    selector: 'float-label-disabled-demo',
    templateUrl: './float-label-disabled-demo.html',
    standalone: true,
    imports: [FloatLabelModule]
})
export class FloatLabelDisabledDemo {
    value: string | undefined;
}`
    };
}
