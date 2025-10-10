import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'clear-icon-doc',
    template: `
        <app-docsectiontext>
            <p>To display a clear button for a field, the recommended approach is to use a combination of <i>p-iconField</i>, <i>p-inputIcon</i>, and <i>textarea</i>. <strong>Important</strong> use class <i>p-inputtextarea-icon</i></p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iconField iconPosition="right">
                @if (value) {
                    <p-inputIcon styleClass="p-inputtextarea-icon" (click)="onClearValue()">
                        <i class="ti text-xl ti-x cursor-pointer"></i>
                    </p-inputIcon>
                }
                <textarea [(ngModel)]="value" rows="5" cols="30" pInputTextarea></textarea>
            </p-iconField>
        </div>
        <app-code [code]="code" selector="textarea-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    value: string = 'Demonstration of clear icon';

    onClearValue(): void {
        this.value = '';
    }

    code: Code = {
        basic: `
<div class="card flex justify-center">
    <p-iconField iconPosition="right">
        @if (value) {
            <p-inputIcon styleClass="p-inputtextarea-icon" (click)="onClearValue()">
                <i class="ti text-xl ti-x cursor-pointer"></i>
            </p-inputIcon>
        }
        <textarea
            [(ngModel)]="value"
            rows="5"
            cols="30"
            pInputTextarea
        ></textarea>
    </p-iconField>
</div>`,

        html: `
<div class="card flex justify-center">
    <p-iconField iconPosition="right">
        @if (value) {
            <p-inputIcon styleClass="p-inputtextarea-icon" (click)="onClearApiKey()">
                <i class="ti text-xl ti-x cursor-pointer"></i>
            </p-inputIcon>
        }
        <textarea
            [(ngModel)]="value"
            rows="5"
            cols="30"
            pInputTextarea
        ></textarea>
    </p-iconField>
</div>`,

        typescript: `
    import { Component } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { InputTextareaModule } from 'primeng/inputtextarea';
    import { IconFieldModule } from 'primeng/iconfield';
    import { InputIconModule } from 'primeng/inputicon';

    
    @Component({
        selector: 'textarea-clear-icon-demo',
        templateUrl: './textarea-clear-icon-demo.html',
        standalone: true,
        imports: [FormsModule, InputTextareaModule, IconFieldModule, InputIconModule]
    })
    
    export class InputTextareaClearIconDemo {
        value: string = 'Demonstration of clear icon';

        onClearValue(): void {
            this.value = '';
        }
    }`
    };
}
