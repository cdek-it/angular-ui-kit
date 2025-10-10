import { Component, ViewEncapsulation } from '@angular/core';
import { StyleDoc } from '@doc/breadcrumb/styledoc';
import { BasicDoc } from '@doc/breadcrumb/basicdoc';
import { ImportDoc } from '@doc/breadcrumb/importdoc';
import { AccessibilityDoc } from '@doc/breadcrumb/accessibilitydoc';
import { TemplateDoc } from '@doc/breadcrumb/templatedoc';
import { RouterDoc } from '@doc/breadcrumb/routerdoc';
import { ChevronDoc } from '@doc/breadcrumb/chevrondoc';

@Component({
    templateUrl: './breadcrumbdemo.html',
})
export class BreadcrumbDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc
        },
        {
            id: 'chevron',
            label: 'Separator control',
            component: ChevronDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
