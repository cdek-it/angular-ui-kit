import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'confirm-dialog-severity-demo',
    template: `
        <app-docsectiontext>
            <p>ConfirmDialog is defined using <i>.p-dialog-danger</i>, <i>.p-dialog-info</i>, <i>.p-dialog-warning</i>, <i>.p-dialog-success</i>, <i>.p-dialog-help</i>  class for severity</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-toast />
            <p-confirmDialog [styleClass]="severityClass" />
            <p-button (onClick)="confirm1($event,'danger')" severity="danger" label="danger" [outlined]="true" />
            <p-button (onClick)="confirm1($event,'info')" severity="info" label="info"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'warning')" severity="warning" label="warning"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'success')" severity="success" label="success"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'help')" severity="help" label="help"  [outlined]="true" />
        </div>
        <app-code [code]="code" selector="confirm-dialog-basic-demo"></app-code>
    `,
    providers: [ConfirmationService, MessageService]
})
export class SeverityDoc {
    public severityClass = '';
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    confirm1(event: Event,severity: string) {
        this.severityClass =`p-dialog-${severity}`;

        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `This is Confirm modal with class <i>.${this.severityClass}</i>`,
            header: 'Confirmation',
            acceptIcon: 'none',
            rejectIcon: 'none',
            acceptButtonStyleClass:`p-button-${severity}`,
            rejectButtonStyleClass:`p-button-${severity} p-button-text`,
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }


    code: Code = {
        basic: `<p-toast />
            <p-confirmDialog [styleClass]="severityClass" />
            <p-button (onClick)="confirm1($event,'danger')" severity="danger" label="danger" [outlined]="true" />
            <p-button (onClick)="confirm1($event,'info')" severity="info" label="info"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'warning')" severity="warning" label="warning"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'success')" severity="success" label="success"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'help')" severity="help" label="help"  [outlined]="true" />`,

        html: `<div class="card flex justify-center gap-2">
            <p-toast />
            <p-confirmDialog [styleClass]="severityClass" />
            <p-button (onClick)="confirm1($event,'danger')" severity="danger" label="danger" [outlined]="true" />
            <p-button (onClick)="confirm1($event,'info')" severity="info" label="info"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'warning')" severity="warning" label="warning"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'success')" severity="success" label="success"  [outlined]="true" />
            <p-button (onClick)="confirm1($event,'help')" severity="help" label="help"  [outlined]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'confirm-dialog-basic-demo',
    templateUrl: './confirm-dialog-basic-demo.html',
    standalone: true,
    imports: [ConfirmDialogModule, ToastModule, ButtonModule],
    providers: [ConfirmationService, MessageService]
})
export class ConfirmDialogBasicDemo {
    public severityClass = '';
    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

      confirm1(event: Event,severity: string) {
        this.severityClass =\`p-dialog-\${severity}\`;

        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: \`This is Confirm modal with class <i>.${this.severityClass}</i>\`,
            header: 'Confirmation',
            acceptButtonStyleClass:\`p-button-\$\{severity}\`,
            rejectButtonStyleClass:\`p-button-\$\{severity} p-button-text\`,
            rejectIcon: 'none',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }


}`
    };
}
