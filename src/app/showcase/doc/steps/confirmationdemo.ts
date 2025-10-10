import { Component, OnInit } from '@angular/core';
import { TicketService } from '@service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Confirmation </ng-template>
                <ng-template pTemplate="subtitle"> Please verify the entered data </ng-template>
                <ng-template pTemplate="content">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="field col-span-12 md:col-span-6">
                            <span>Name</span>
                            <b
                                >{{ ticketInformation.personalInformation.firstname ? ticketInformation.personalInformation.firstname : '-' }}
                                {{ ticketInformation.personalInformation.lastname ? ticketInformation.personalInformation.lastname : '-' }}</b
                            >
                        </div>
                        <div class="field col-span-12 md:col-span-6">
                            <span>Age</span>
                            <b>{{ ticketInformation.personalInformation.age ? ticketInformation.personalInformation.age : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-6">
                            <span>Seat Class</span>
                            <b>{{ ticketInformation.seatInformation.class ? ticketInformation.seatInformation.class.name : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-6">
                            <span>Wagon Number</span>
                            <b>{{ ticketInformation.seatInformation.wagon ? ticketInformation.seatInformation.wagon.wagon : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-6">
                            <span>Seat</span>
                            <b>{{ ticketInformation.seatInformation.seat ? ticketInformation.seatInformation.seat.seat : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-6">
                            <span>Cardholder Name</span>
                            <b>{{ ticketInformation.paymentInformation.cardholderName ? ticketInformation.paymentInformation.cardholderName : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-6">
                            <span>Card Number</span>
                            <b>{{ ticketInformation.paymentInformation.cardholderNumber ? ticketInformation.paymentInformation.cardholderNumber : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-3">
                            <label for="Age">Date</label>
                            <b>{{ ticketInformation.paymentInformation.date ? ticketInformation.paymentInformation.date : '-' }}</b>
                        </div>
                        <div class="field col-span-12 md:col-span-3">
                            <span>CVV</span>
                            <b>{{ ticketInformation.paymentInformation.cvv && ticketInformation.paymentInformation.cvv.length === 3 ? '**' + ticketInformation.paymentInformation.cvv[2] : '-' }}</b>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="flex justify-between mt-6">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left" [outlined]="true"></p-button>
                        <p-button label="Complete" (onClick)="complete()" icon="pi pi-angle-right" iconPos="right" styleClass="p-button-success"></p-button>
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
        `
    ]
})
export class ConfirmationDemo implements OnInit {
    ticketInformation: any;

    constructor(
        public ticketService: TicketService,
        private router: Router
    ) {}

    ngOnInit() {
        this.ticketInformation = this.ticketService.ticketInformation;
    }

    complete() {
        this.ticketService.complete();
    }

    prevPage() {
        this.router.navigate(['steps/payment'], { fragment: 'routing' });
    }
}
