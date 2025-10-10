import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { StyleDoc } from './styledoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { TemplateDoc } from './templatedoc';
import { RouterDoc } from './routerdoc';
import { ChevronDoc } from './chevrondoc';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, AppCodeModule, RouterModule, BreadcrumbModule, AppDocModule, InputSwitchModule],
    declarations: [BasicDoc, TemplateDoc, RouterDoc, ImportDoc, StyleDoc, AccessibilityDoc, ChevronDoc],
    exports: [AppDocModule]
})
export class BreadcrumbDocModule {}
