import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'icon-doc',
    template: `
        <app-docsectiontext>
            <p>A font icon next to the value can be displayed with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-2">
            <p-tag icon="ti ti-check" value="Primary" />
            <p-tag icon="ti ti-info-circle" severity="info" value="Info" />
            <p-tag icon="ti ti-circle-check" severity="success" value="Success" />
            <p-tag icon="ti ti-alert-triangle" severity="warning" value="Warning" />
            <p-tag icon="ti ti-circle-x" severity="danger" value="Danger" />
            <p-tag icon="ti ti-circle-x" severity="secondary" value="Secondary" />
        </div>
        <app-code [code]="code" selector="tag-icon-demo"></app-code>
    `
})
export class IconDoc {
    code: Code = {
        basic: `<p-tag icon="pi pi-user" value="Primary" />`,
        html: `
<div class="card flex justify-center gap-2">
    <p-tag icon="ti ti-check" value="Primary" />
        <p-tag icon="ti ti-info-circle" severity="info" value="Info" />
        <p-tag icon="ti ti-circle-check" severity="success" value="Success" />
        <p-tag icon="ti ti-alert-triangle" severity="warning" value="Warning" />
        <p-tag icon="ti ti-circle-x" severity="danger" value="Danger" />
        <p-tag icon="ti ti-circle-x" severity="secondary" value="Secondary" />
</div>`,
        typescript: `import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'tag-icon-demo',
    templateUrl: './tag-icon-demo.html',
    standalone: true,
    imports: [TagModule]
})
export class TagIconDemo {}`
    };
}
