import { Component, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { AutoComplete } from '../../../components/autocomplete/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    template: ` <app-docsectiontext>
            <p>Multiple mode is enabled using <i>multiple</i> property used to select more than one value from the autocomplete. In this case, value reference should be an array.</p>
        </app-docsectiontext>
        <div class="card flex flex-col gap-3">
            <span class="p-fluid">
                <p-autoComplete [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" />
            </span>
            <span class="p-fluid relative autocomplete-dropdown-container">
                <p-autoComplete  #auto [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" />
                <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
                    <ChevronDownIcon></ChevronDownIcon>
                </div>
            </span>
            <span class="p-fluid relative autocomplete-dropdown-container">
                <p-autoComplete  #auto [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true">
                  <ng-template let-item pTemplate="selectedItem">
                    <div class="flex items-center">
                        <i class="ti ti-check pr-3"></i> {{item}}
                    </div>
                  </ng-template>
                </p-autoComplete>
                <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
                    <ChevronDownIcon></ChevronDownIcon>
                </div>
            </span>
        </div>
        <app-code [code]="code" selector="autocomplete-multiple-demo"></app-code>`
})
export class MultipleDoc {
    selectedItems: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    @ViewChild('auto') autoComplete!: AutoComplete;

    dropdownClick($event: Event, auto: AutoComplete) {
        auto.handleDropdownClick($event);
    }

    code: Code = {
        basic: `<div class="card flex flex-col gap-3">
    <span class="p-fluid">
        <p-autoComplete [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" />
    </span>
    <span class="p-fluid relative autocomplete-dropdown-container">
        <p-autoComplete  #auto [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" />
            <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
                <ChevronDownIcon></ChevronDownIcon>
            </div>
    </span>
    <span class="p-fluid relative autocomplete-dropdown-container">
         <p-autoComplete  #auto [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true">
            <ng-template let-item pTemplate="selectedItem">
                <div class="flex items-center">
                    <i class="ti ti-check pr-3"></i> {{item}}
                </div>
            </ng-template>
        </p-autoComplete>
        <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
            <ChevronDownIcon></ChevronDownIcon>
        </div>
    </span>
</div>`,

        html: `<div class="card flex flex-col gap-3">
    <span class="p-fluid">
        <p-autoComplete [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" />
    </span>
    <span class="p-fluid relative autocomplete-dropdown-container">
        <p-autoComplete  #auto [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true" />
        <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
            <ChevronDownIcon></ChevronDownIcon>
        </div>
    </span>
    <span class="p-fluid relative autocomplete-dropdown-container">
         <p-autoComplete  #auto [(ngModel)]="selectedItems" [suggestions]="items" (completeMethod)="search($event)" [multiple]="true">
            <ng-template let-item pTemplate="selectedItem">
                <div class="flex items-center">
                    <i class="ti ti-check pr-3"></i> {{item}}
                </div>
            </ng-template>
        </p-autoComplete>
        <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
            <ChevronDownIcon></ChevronDownIcon>
        </div>
    </span>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-multiple-demo',
    templateUrl: './autocomplete-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteMultipleDemo {
    selectedItems: any[] | undefined;

    items: any[] | undefined;

    search(event: AutoCompleteCompleteEvent) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }

    @ViewChild('auto') autoComplete!: AutoComplete;

    dropdownClick($event: Event, auto: AutoComplete) {
        auto.handleDropdownClick($event);
    }
}`
    };
}
