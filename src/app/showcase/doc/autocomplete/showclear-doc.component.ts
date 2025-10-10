import { Component, OnInit, ViewChild } from '@angular/core';
import { Code } from '@domain/code';
import { CountryService } from '@service/countryservice';
import { PlatformService } from '@service/platformservice';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoComplete } from '../../../components/autocomplete/autocomplete';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'dropdown-clear-icon-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is added to reset the Autocomplete.</p>
        </app-docsectiontext>
        <div class="card flex justify-center" [formGroup]="countryFormGroup">
            <div class="relative autocomplete-dropdown-container w-13">
                <p-autoComplete #auto  styleClass="w-full" panelStyleClass="w-13" formControlName="country" [dropdown]="true" [showClear]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
                <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
                    <ChevronDownIcon></ChevronDownIcon>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="dropdown-clear-icon-demo"></app-code>
    `
})
export class ShowClearDoc implements OnInit {
    countries: any[] | undefined;

    countryFormGroup: FormGroup = this.formBuilder.group({
        'country': [{ name: 'Switzerland', code: 'CH' }]
    });

    filteredCountries: any[] | undefined;

    @ViewChild('auto') autoComplete!: AutoComplete;

    constructor(private countryService: CountryService, private PlatformService: PlatformService, private formBuilder: FormBuilder) {}

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
    <p-autoComplete #auto formControlName="country" [dropdown]="true" [showClear]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
    <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
        <ChevronDownIcon></ChevronDownIcon>
    </div>
</div>`,

        html: `<div class="card flex justify-center" [formGroup]="countryFormGroup">
    <div class="relative autocomplete-dropdown-container">
        <p-autoComplete #auto formControlName="country" [dropdown]="true" [showClear]="true" placeholder="Search" [suggestions]="filteredCountries" (completeMethod)="filterCountry($event)" optionLabel="name" />
        <div class="autocomplete-dropdown-trigger" role="button" aria-label="dropdown trigger" (click)="dropdownClick($event, auto)">
            <ChevronDownIcon></ChevronDownIcon>
        </div>
    </div>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { CountryService } from '@service/countryservice';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup } from '@angular/forms';

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
export class AutocompleteShowClearDemo implements OnInit {
    countries: any[] | undefined;

    countryFormGroup: FormGroup = this.formBuilder.group({
        'country': [{ name: 'Switzerland', code: 'CH' }]
    });

    filteredCountries: any[] | undefined;

    @ViewChild('auto') autoComplete!: AutoComplete;

    constructor(private countryService: CountryService, private formBuilder: FormBuilder) {}

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
