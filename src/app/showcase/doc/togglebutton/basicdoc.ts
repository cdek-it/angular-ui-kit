import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way binding to a boolean property is defined using the standard <i>ngModel</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-toggleButton [(ngModel)]="checked" onLabel="On" offLabel="Off" styleClass="!w-6" />
            <p-toggleButton [(ngModel)]="checkedIcon" offIcon="pi pi-arrow-down-right" onIcon="pi pi-arrow-down-right" />
        </div>
        <app-code [code]="code" selector="toggle-button-basic-demo"></app-code>
    `
})
export class BasicDoc {
    checked: boolean = false;
    checkedIcon: boolean = false;

    code: Code = {
        basic: `<p-toggleButton
    [(ngModel)]="checked"
    onLabel="On"
    offLabel="Off" />

<p-toggleButton
    [(ngModel)]="checkedIcon"
    offIcon="pi pi-arrow-down-right"
    onIcon="pi pi-arrow-down-right" />`,

        html: `<div class="card flex justify-center gap-2">
    <p-toggleButton
        [(ngModel)]="checked"
        onLabel="On"
        offLabel="Off" />
    <p-toggleButton
        [(ngModel)]="checkedIcon"
        offIcon="pi pi-arrow-down-right"
        onIcon="pi pi-arrow-down-right" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
    selector: 'toggle-button-basic-demo',
    templateUrl: './toggle-button-basic-demo.html',
    standalone: true,
    imports: [FormsModule, ToggleButtonModule]
})
export class ToggleButtonBasicDemo {
    checked: boolean = false;
}`
    };
}
