import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'badge-severity-demo',
    template: `
        <app-docsectiontext>
            <p>Severity defines the color of the badge, possible values are <i>success</i>, <i>info</i>, <i>warning</i> and <i>danger</i></p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-badge value="Badge" />
            <p-badge value="Badge" severity="info" />
            <p-badge value="Badge" severity="success" />
            <p-badge value="Badge" severity="warning" />
            <p-badge value="Badge" severity="danger" />
            
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem"></i>
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="info"></i>
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="success"></i>
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="warning"></i>
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="danger"></i>
        </div>
        <app-code [code]="code" selector="badge-severity-demo"></app-code>
    `
})
export class SeverityDoc {
    code: Code = {
        basic: `<p-badge [value]="2" severity="success" />`,
        html: `<div class="card flex justify-center gap-2">
    <p-badge [value]="2" severity="success" />
    <p-badge [value]="9" severity="info" />
    <p-badge [value]="3" severity="warning" />
    <p-badge [value]="12" severity="danger" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'badge-severity-demo',
    templateUrl: './badge-severity-demo.html',
    standalone: true,
    imports: [BadgeModule]
})
export class BadgeSeverityDemo {}`
    };
}
