import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'float-variant-in-doc',
    template: `
        <app-docsectiontext>
            <p>FloatLabel is used by wrapping the input and its label. Расположение лейбла внутри поля ввода.</p>
            <p>Для использования этого варианта, нужно добавить класс float-variant-in</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel class="float-variant-in">
                <input id="username" type="text" pInputText [(ngModel)]="value" />
                <label for="username">Username</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="float-label-basic-demo"></app-code>
    `
})
export class VariantInDoc {
    value: string | undefined;

    code: Code = {
        basic:
`<p-floatLabel class="float-variant-in">
    <input id="username" type="text" pInputText [(ngModel)]="value" />
    <label for="username">Username</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel  class="float-variant-in">
        <input id="username" type="text" pInputText [(ngModel)]="value" />
        <label for="username">Username</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"

@Component({
    selector: 'float-label-float-variant-in-demo',
    templateUrl: './float-label-float-variant-in-demo.html',
    standalone: true,
    imports: [FloatLabelModule]
})
export class FloatLabelVariantInDemo {
    value: string | undefined;
}`
    };
}
