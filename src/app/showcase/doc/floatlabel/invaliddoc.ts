import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'invalid-doc',
    template: `
        <app-docsectiontext>
            <p>Invalid state FloatLabel is used by wrapping the input and its label. </p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4">
            <p-floatLabel>
                <input id="username" type="text" pInputText class="ng-invalid ng-touched"  [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>

            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText class="ng-invalid ng-touched"  [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="float-label-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-floatLabel>
    <input id="username" type="text" pInputText class="ng-invalid ng-touched"  [(ngModel)]="value" />
    <label for="username">Username</label>
</p-floatLabel>

<p-floatLabel class="float-variant-in">
    <input id="username" type="text" pInputText class="ng-invalid ng-touched"  [(ngModel)]="value" />
    <label for="username">Username</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center gap-4">
    <p-floatLabel>
        <input id="username" type="text" pInputText class="ng-invalid ng-touched"  [(ngModel)]="value" />
        <label for="username">Username</label>
    </p-floatLabel>

    <p-floatLabel class="float-variant-in">
        <input id="username" type="text" pInputText class="ng-invalid ng-touched"  [(ngModel)]="value" />
        <label for="username">Username</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"

@Component({
    selector: 'float-label-invalid-demo',
    templateUrl: './float-label-invalid-demo.html',
    standalone: true,
    imports: [FloatLabelModule]
})
export class FloatLabelInvalidDemo {
    value: string | undefined;
}`
    };
}
