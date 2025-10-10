import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <div class="card flex justify-center">
            <p-slider [(ngModel)]="value" styleClass="!w-14" [disabled]="true"/>
        </div>
        <app-code [code]="code" selector="slider-basic-demo"></app-code>
    `
})
export class DisabledDoc {
    value: number = 20;

    code: Code = {
        basic: `<p-slider [(ngModel)]="value" styleClass="!w-14" [disabled]="true"/>`,

        html: `<div class="card flex justify-center">
    <p-slider [(ngModel)]="value" styleClass="!w-14" [disabled]="true"/>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

@Component({
    selector: 'slider-basic-demo',
    templateUrl: './slider-basic-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule]
})
export class SliderBasicDemo {
    value!: number;
}`
    };
}
