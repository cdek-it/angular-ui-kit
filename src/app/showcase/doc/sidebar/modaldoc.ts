import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'modal-doc',
    template: `
        <app-docsectiontext>
            <p>Whether an overlay mask is displayed behind the sidebar.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-sidebar [(visible)]="sidebarVisible" [modal]="false">
                <h3>Sidebar</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </p-sidebar>
            <p-button (onClick)="sidebarVisible = true" icon="pi pi-arrow-right" />
        </div>
        <app-code [code]="code" selector="sidebar-modal-demo"></app-code>
    `
})
export class ModalDoc {
    sidebarVisible: boolean = false;

    code: Code = {
        basic: `<p-sidebar [(visible)]="sidebarVisible" [modal]="false">
    <h3>Sidebar</h3>
    <p>
        Lorem ipsum dolor sit amet...
    </p>
</p-sidebar>
<p-button (onClick)="sidebarVisible = true" icon="pi pi-arrow-right" />`,

        html: `<div class="card flex justify-center">
    <p-sidebar [(visible)]="sidebarVisible" [modal]="false">
        <h3>Sidebar</h3>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </p-sidebar>
    <p-button (onClick)="sidebarVisible = true" icon="pi pi-arrow-right" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'sidebar-modal-demo',
    templateUrl: './sidebar-modal-demo.html',
    standalone: true,
    imports: [SidebarModule, ButtonModule]
})
export class SidebarBasicDemo {
    sidebarVisible: boolean = false;
}`
    };
}
