import { Component, OnInit } from '@angular/core';
import { TicketService } from '@service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Payment Information </ng-template>
                <ng-template pTemplate="subtitle"> Enter your card details </ng-template>
                <ng-template pTemplate="content">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="field col-span-12">
                            <label for="class">Card Holder Name</label>
                            <input type="text" required pInputText [(ngModel)]="paymentInformation.cardholderName" />
                        </div>
                        <div class="field col-span-8">
                            <label id="number" for="lastname">Number</label>
                            <p-inputMask styleClass="w-full" inputId="number" mask="9999-9999-9999-9999" [(ngModel)]="paymentInformation.cardholderNumber"></p-inputMask>
                        </div>
                        <div class="field col-span-2">
                            <label id="date" for="date">Date</label>
                            <p-inputMask styleClass="w-full" inputId="date" mask="99/99" [(ngModel)]="paymentInformation.date"></p-inputMask>
                        </div>
                        <div class="field col-span-2">
                            <label for="cvv">CVV</label>
                            <p-inputMask styleClass="w-full" id="cvv" mask="999" [(ngModel)]="paymentInformation.cvv"></p-inputMask>
                        </div>
                        <div class="field-checkbox col-span-12">
                            <p-checkbox inputId="remember" [binary]="true" [(ngModel)]="paymentInformation.remember"></p-checkbox>
                            <label for="remember" class="p-checkbox-label">Save credit card information for future</label>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="flex justify-between mt-6">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left" [outlined]="true"></p-button>
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
    `,
    styles: [
        `
            .field {
                @apply flex flex-col;
            }
            .field-checkbox {
                @apply flex gap-2 items-center;
            }
        `
    ]
})
export class PaymentDemo implements OnInit {
    paymentInformation: any;

    constructor(
        public ticketService: TicketService,
        private router: Router
    ) {}

    ngOnInit() {
        this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
    }

    nextPage() {
        this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
        this.router.navigate(['steps/confirmation'], { fragment: 'routing' });
    }

    prevPage() {
        this.router.navigate(['steps/seat'], { fragment: 'routing' });
    }
}
