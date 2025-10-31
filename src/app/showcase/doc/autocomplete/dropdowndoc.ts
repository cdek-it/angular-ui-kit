import { Component, OnInit, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { CountryService } from '@service/countryservice';
import { PlatformService } from '@service/platformservice';
import { AutoComplete } from '../../../components/autocomplete/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'dropdown-doc',
    template: ` <app-docsectiontext>
            <p>
                Enabling <i>dropdown</i> property displays a button next to the input field where click behavior of the button is defined using <i>dropdownMode</i> property that takes <strong>blank</strong> or <strong>current</strong> as possible
                values. <i>blank</i> is the default mode to send a query with an empty string whereas <i>current</i> setting sends a query with the current value of the input.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="relative autocomplete-dropdown-container w-13">
                <p-autoComplete #auto styleClass="w-full" panelStyleClass="w-13" [(ngModel)]="selectedCountry" [dropdown]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
                <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
                    <ChevronDownIcon></ChevronDownIcon>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="autocomplete-dropdown-demo"></app-code>`
})
export class DropdownDoc implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

    filteredCountries: any[] | undefined;

    @ViewChild('auto') autoComplete!: AutoComplete;

    constructor(
        private countryService: CountryService,
        private PlatformService: PlatformService
    ) {}

    ngOnInit() {
        if (this.PlatformService.isBrowser()) {
            this.countryService.getCountries().then((countries) => {
                this.countries = countries;
            });
        }
    }

    dropdownClick($event: Event, auto: AutoComplete) {
        auto.handleDropdownClick($event);
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    code: Code = {
        basic: `<div class="relative autocomplete-dropdown-container">
    <p-autoComplete #auto [(ngModel)]="selectedCountry" [dropdown]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
    <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
       <ChevronDownIcon></ChevronDownIcon>
    </div>
</div>`,

        html: `<div class="card flex justify-center">
    <div class="relative autocomplete-dropdown-container">
        <p-autoComplete #auto [(ngModel)]="selectedCountry" [dropdown]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
        <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
            <ChevronDownIcon></ChevronDownIcon>
        </div>
    </div>
</div>`,

        typescript: `import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '@service/countryservice';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoComplete } from '../../../components/autocomplete/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'autocomplete-dropdown-demo',
    templateUrl: './autocomplete-dropdown-demo.html',
    standalone:true,
    imports: [FormsModule, AutoCompleteModule],
    providers:[CountryService]
})
export class AutocompleteDropdownDemo implements OnInit {
    countries: any[] | undefined;

    selectedCountry: any;

    filteredCountries: any[] | undefined;

    @ViewChild('auto') autoComplete!: AutoComplete;

    constructor(private countryService: CountryService) {}

    ngOnInit() {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });
    }

    dropdownClick($event: Event, auto: AutoComplete) {
        auto.handleDropdownClick($event);
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }
}`,
        service: ['CountryService'],

        data: `
//CountryService
{
    "name": "Afghanistan",
    "code": "AF"
}
...`
    };
}
