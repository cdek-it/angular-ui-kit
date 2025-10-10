import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-3">
            <p-button icon="pi pi-arrow-down-right" [disabled]="true" />
            <p-button label="Submit" [disabled]="true" />
            <p-button label="Submit" icon="pi pi-arrow-down-right" [disabled]="true" />
            <p-button label="Submit" icon="pi pi-arrow-down-right" iconPos="right" [disabled]="true" />
            <p-button icon="pi pi-arrow-down-right" rounded [disabled]="true" />
            <p-button label="Submit" rounded [disabled]="true" />
        </div>
        <app-code [code]="code" selector="button-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    code: Code = {
        basic: `<p-button label="Submit" [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-button label="Submit" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-disabled-demo',
    templateUrl: './button-disabled-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonDisabledDemo { }`
    };
}
