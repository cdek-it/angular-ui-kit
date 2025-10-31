import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'divider-login-demo',
    template: `
        <app-docsectiontext>
            <p>Sample implementation of a login form using a divider with content.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="w-full flex flex-col md:flex-row">
                <div class="w-full md:w-5 flex flex-col flex-1 items-center justify-center gap-3 py-5">
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="!w-6">Username</label>
                        <input pInputText id="username" type="text" class="!w-12" />
                    </div>
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="!w-6">Password</label>
                        <input pInputText id="password" type="password" class="!w-12" />
                    </div>
                    <p-button label="Login" icon="pi pi-user" styleClass="!w-10 mx-auto" />
                </div>
                <div class="w-full md:w-2">
                    <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
                    <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
                </div>
                <div class="w-full md:w-5 flex items-center flex-1 justify-center py-5">
                    <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success !w-10" />
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="divider-login-demo"></app-code>
    `
})
export class LoginDoc {
    code: Code = {
        basic: `<div class="w-full flex flex-col md:flex-row">
                <div class="w-full md:w-5 flex flex-col flex-1 items-center justify-center gap-3 py-5">
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="!w-6">Username</label>
                        <input pInputText id="username" type="text" class="!w-12" />
                    </div>
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="!w-6">Password</label>
                        <input pInputText id="password" type="password" class="!w-12" />
                    </div>
                    <p-button label="Login" icon="pi pi-user" styleClass="!w-10 mx-auto" />
                </div>
                <div class="w-full md:w-2">
                    <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
                    <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
                </div>
                <div class="w-full md:w-5 flex items-center flex-1 justify-center py-5">
                    <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success !w-10" />
                </div>
            </div>`,

        html: `<div class="w-full flex flex-col md:flex-row">
                <div class="w-full md:w-5 flex flex-col flex-1 items-center justify-center gap-3 py-5">
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="!w-6">Username</label>
                        <input pInputText id="username" type="text" class="!w-12" />
                    </div>
                    <div class="flex flex-wrap justify-center items-center gap-2">
                        <label class="!w-6">Password</label>
                        <input pInputText id="password" type="password" class="!w-12" />
                    </div>
                    <p-button label="Login" icon="pi pi-user" styleClass="!w-10 mx-auto" />
                </div>
                <div class="w-full md:w-2">
                    <p-divider layout="vertical" styleClass="hidden md:flex"><b>OR</b></p-divider>
                    <p-divider layout="horizontal" styleClass="flex md:hidden" [align]="'center'"><b>OR</b></p-divider>
                </div>
                <div class="w-full md:w-5 flex items-center flex-1 justify-center py-5">
                    <p-button label="Sign Up" icon="pi pi-user-plus" styleClass="p-button-success !w-10" />
                </div>
            </div>`,

        typescript: `import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'divider-login-demo',
    templateUrl: './divider-login-demo.html',
    standalone: true,
    imports: [DividerModule, ButtonModule, InputTextModule]
})
export class DividerLoginDemo {}`
    };
}
