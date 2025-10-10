import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'breadcrumb-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Управление separator через стили</p>
            <div class="card flex justify-center align-items-center gap-2">
                <p-inputSwitch [(ngModel)]="checked" id="checked"/> Включить разделитель
            </div>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-breadcrumb class="max-w-full"  [model]="items" [home]="home" [styleClass]="!checked ? 'none-separator-breadcrum': ''"/>
        </div>
        <app-code [code]="code" selector="breadcrumb-basic-demo"></app-code>
    `
})
export class ChevronDoc implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    checked: boolean = false;

    ngOnInit() {
        this.items = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    code: Code = {
        basic: `
        <p-breadcrumb class="max-w-full"
            [model]="items"
            [home]="home"
            [styleClass]="!checked ? 'none-separator-breadcrum': ''"
        />`,

        html: `
        <p-inputSwitch [(ngModel)]="checked" id="checked"/> Включить разделитель
        <div class="card flex justify-center">
            <p-breadcrumb class="max-w-full" [model]="items" [home]="home" [styleClass]="!checked ? 'none-separator-breadcrum': ''"/>
        </div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
    selector: 'breadcrumb-basic-demo',
    templateUrl: './breadcrumb-basic-demo.html',
    standalone: true,
    imports: [BreadcrumbModule],
})
export class BreadcrumbBasicDemo implements OnInit {
    items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    checked: boolean = false;

    ngOnInit() {
        this.items = [
            { label: 'Electronics' },
            { label: 'Computer' },
            { label: 'Accessories' },
            { label: 'Keyboard' },
            { label: 'Wireless' }
        ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}`
    };
}
