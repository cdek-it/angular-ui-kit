import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-clear-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is present, the value can be cleared.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-calendar [(ngModel)]="date" [showClear]="true"/>
        </div>
        <app-code [code]="code" selector="calendar-clear-demo"></app-code>
    `
})
export class ClearDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-calendar [(ngModel)]="date" [showClear]="true"/>`,

        html: `<div class="card flex justify-center">
    <p-calendar [(ngModel)]="date" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'calendar-clear-demo',
    templateUrl: './calendar-clear-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarClearDemo {
    date: Date | undefined;
}`
    };
}
