import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'disabled-doc',
    template: `
        <app-docsectiontext>
            <p>
                To display a disabled icon for a field, the recommended approach is to use a combination of
                <i>p-iconField</i>, <i>p-inputIcon</i>, and <i>p-password</i>. <strong>Important</strong> use class <i>p-password-icon</i>
                and
                <i>p-disabled</i> for icon section
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">


            <p-iconField iconPosition="right">
                @if (disabled) {
                    <p-inputIcon styleClass="p-password-icon">
                        <i class="ti ti-lock text-xl p-disabled"></i>
                    </p-inputIcon>
                }
                <p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" />
            </p-iconField>
        </div>
        <app-code [code]="code" selector="password-disabled-demo"></app-code>
    `
})
export class CustomDisabledDoc {
    disabled: boolean = true;
    value!: string;

    code: Code = {
        basic: `
         <p-iconField iconPosition="right">
            @if (disabled) {
                <p-inputIcon styleClass="p-password-icon">
                    <i class="ti ti-lock text-xl p-disabled"></i>
                </p-inputIcon>
            }
            <p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" />
        </p-iconField>
        `,

        html: `<div class="card flex justify-center">
 <p-iconField iconPosition="right">
                @if (disabled) {
                    <p-inputIcon styleClass="p-password-icon">
                        <i class="ti ti-lock text-xl p-disabled"></i>
                    </p-inputIcon>
                }
                <p-password [(ngModel)]="value" [disabled]="true" placeholder="Disabled" />
            </p-iconField>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'password-disabled-demo',
    templateUrl: './password-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule]
})
export class PasswordDisabledDemo {
    value!: string;
}`
    };
}
