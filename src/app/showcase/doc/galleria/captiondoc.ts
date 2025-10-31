import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';
import { PhotoService } from '@service/photoservice';

@Component({
    selector: 'galleria-caption-demo',
    template: `
        <app-docsectiontext>
            <p>Description of an image is specified with the <i>caption</i> template.</p>
        </app-docsectiontext>
        <div class="card">
            <p-galleria [(value)]="images" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '640px' }" [numVisible]="5">
                <ng-template pTemplate="item" let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
                <ng-template pTemplate="thumbnail" let-item>
                    <div class="m-0 p-0 justify-center w-full h-4">
                        <img class="w-full h-full object-cover" [src]="item.thumbnailImageSrc"/>
                    </div>
                </ng-template>
                <ng-template pTemplate="caption" let-item>
                    <h4 class="p-2 m-0" style="color: #ffffff;">{{ item.title }}</h4>
                    <p class="px-2 m-0">{{ item.alt }}</p>
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-caption-demo"></app-code>
    `
})
export class CaptionDoc implements OnInit {
    images: any[] | undefined;

    responsiveOptions: any[] = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 4
            },
            {
                breakpoint: '560px',
                numVisible: 3
            }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }

    code: Code = {
        basic: `<p-galleria
    [(value)]="images"
    [responsiveOptions]="responsiveOptions"
    [containerStyle]="{ 'max-width': '640px' }"
    [numVisible]="5">
        <ng-template pTemplate="item" let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
        <ng-template pTemplate="thumbnail" let-item>
                    <div class="m-0 p-0 justify-center w-full h-4">
                        <img class="w-full h-full object-cover" [src]="item.thumbnailImageSrc"/>
                    </div>
        </ng-template>
        <ng-template pTemplate="caption" let-item>
            <h4 style="margin-bottom: .5rem; color: #ffffff;">
                {{ item.title }}
            </h4>
            <p>{{ item.alt }}</p>
        </ng-template>
</p-galleria>
`,
        html: `<div class="card">
    <p-galleria
        [(value)]="images"
        [responsiveOptions]="responsiveOptions"
        [containerStyle]="{ 'max-width': '640px' }"
        [numVisible]="5">
            <ng-template pTemplate="item" let-item>
                <img [src]="item.itemImageSrc" style="width: 100%;" />
            </ng-template>
            <ng-template pTemplate="thumbnail" let-item>
                    <div class="m-0 p-0 justify-center w-full h-4">
                        <img class="w-full h-full object-cover" [src]="item.thumbnailImageSrc"/>
                    </div>
            </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { PhotoService } from '@service/photoservice';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'galleria-caption-demo',
    templateUrl: './galleria-caption-demo.html',
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class GalleriaCaptionDemo implements OnInit {
    images: any[] | undefined;

    responsiveOptions: any[] = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 4
            },
            {
                breakpoint: '560px',
                numVisible: 3
            }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }
}`,
        data: `
/* PhotoService */
{
    itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
...`,
        service: ['PhotoService']
    };
}
