import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'card-basic-demo',
    template: `
        <app-docsectiontext>
            <p>A simple Card is created with a <i>header</i> property along with the content as children.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-card header="Simple Card">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </p-card>
        </div>

        <app-docsectiontext>
            <p>Disable shadow with <i>p-card-no-shadow</i> styleClass.</p>
        </app-docsectiontext>

        <div class="card flex justify-center">
            <p-card header="Card without shadow" styleClass="p-card-no-shadow">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </p-card>
        </div>

        <app-docsectiontext>
            <p>Uses <i>rounded-xl</i> class for default border radius. You can manualy add <i>rounded-2xl</i> or <i>rounded-3xl</i> styleClass.</p>
        </app-docsectiontext>

        <div class="card flex justify-center">
            <p-card header="Card with 3xl border radius" styleClass="p-card-no-shadow rounded-3xl">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </p-card>
        </div>

        <app-code [code]="code" selector="card-basic-demo"></app-code>
    `
})
export class BasicDoc {
    code: Code = {
        basic: `<p-card header="Simple Card" styleClass="p-card-no-shadow rounded-3xl">
    <p class="m-0">
        Lorem ipsum dolor sit amet...
    </p>
</p-card>`,

        html: `<div class="card flex justify-center">
    <p-card header="Simple Card">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
            quas!
        </p>
    </p-card>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'card-basic-demo',
    templateUrl: './card-basic-demo.html',
    standalone: true,
    imports: [CardModule]
})
export class CardBasicDemo {}`
    };
}
