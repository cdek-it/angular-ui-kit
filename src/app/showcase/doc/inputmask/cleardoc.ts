import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'clear-doc',
    template: `
        <app-docsectiontext>
            <p>InputMask provides <i>showClear</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputMask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" showClear />
        </div>
        <app-code [code]="code" selector="input-mask-clear-demo"></app-code>
    `
})
export class ClearDoc {
    value: string | undefined;

    code: Code = {
        basic: `<p-inputMask
    mask="99-999999"
    [(ngModel)]="value"
    placeholder="99-999999"
    showClear />`,

        html: `<div class="card flex justify-center">
    <p-inputMask
        mask="99-999999"
        [(ngModel)]="value"
        placeholder="99-999999"
        showClear
        />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'input-mask-clear-demo',
    templateUrl: './input-mask-clear-demo.html',
    standalone: true,
    imports: [FormsModule, InputMaskModule]
})
export class InputMaskClearDemo {
    value: string | undefined;
}`
    };
}
