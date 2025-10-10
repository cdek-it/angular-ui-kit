import { Component, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { AutoComplete } from '../../../components/autocomplete/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-virtual-scroll-demo',
    template: ` <app-docsectiontext>
            <p>
                Virtual scrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable virtual scrolling to avoid
                performance issues. Usage is simple as setting <i>virtualScroll</i> property to <i>true</i> and defining <i>virtualScrollItemSize</i> to specify the height of an item.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="relative autocomplete-dropdown-container">
                <p-autoComplete #auto [(ngModel)]="selectedItem" [virtualScroll]="true" [suggestions]="filteredItems" [virtualScrollItemSize]="34" (completeMethod)="filterItems($event)" optionLabel="label" [dropdown]="true" />
                <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
                    <ChevronDownIcon></ChevronDownIcon>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="autocomplete-virtual-scroll-demo"></app-code>`
})
export class VirtualScrollDoc {
    selectedItem: any;

    filteredItems: any[] | undefined;

    items: any[] | undefined;

    @ViewChild('auto') autoComplete!: AutoComplete;

    filterItems(event: AutoCompleteCompleteEvent) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.items as any[]).length; i++) {
            let item = (this.items as any[])[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    ngOnInit() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    dropdownClick($event: Event, auto: AutoComplete) {
        auto.handleDropdownClick($event);
    }

    code: Code = {
        basic: `<div class="relative autocomplete-dropdown-container">
    <p-autoComplete
    #auto
    [(ngModel)]="selectedItem"
    [virtualScroll]="true"
    [suggestions]="filteredItems"
    [virtualScrollItemSize]="34"
    (completeMethod)="filterItems($event)"
    optionLabel="label"
    [dropdown]="true" />
    <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
        <ChevronDownIcon></ChevronDownIcon>
    </div>
</div>
`,

        html: `<div class="card flex justify-center">
    <div class="relative autocomplete-dropdown-container">
        <p-autoComplete
        #auto
        [(ngModel)]="selectedItem"
        [virtualScroll]="true"
        [suggestions]="filteredItems"
        [virtualScrollItemSize]="34"
        (completeMethod)="filterItems($event)"
        optionLabel="label"
        [dropdown]="true" />
        <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
            <ChevronDownIcon></ChevronDownIcon>
        </div>
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from '../../../components/autocomplete/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-virtual-scroll-demo',
    templateUrl: './autocomplete-virtual-scroll-demo.html',
    standalone: true,
    imports: [FormsModule, AutoCompleteModule]
})
export class AutocompleteVirtualScrollDemo {
    selectedItem: any;

    filteredItems: any[] | undefined;

    items: any[] | undefined;

    @ViewChild('auto') autoComplete!: AutoComplete;

    filterItems(event: AutoCompleteCompleteEvent) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.items as any[]).length; i++) {
            let item = (this.items as any[])[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    ngOnInit() {
        this.items = [];
        for (let i = 0; i < 10000; i++) {
            this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
        }
    }

    dropdownClick($event: Event, auto: AutoComplete) {
        auto.handleDropdownClick($event);
    }
}`
    };
}
