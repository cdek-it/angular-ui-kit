import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { OrderListModule } from 'primeng/orderlist';
import { DataViewModule } from 'primeng/dataview';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AdvancedDoc } from './advanceddoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplateCdekDndDoc } from './template-cdek-dnd-doc';
import { TemplateCdekButtonDoc } from './template-cdek-button-doc';
import { AutoDoc } from './autodoc';
import { CustomDoc } from './customdoc';
import { AccessibilityDoc } from './accessibilitydoc';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppCodeModule,
        AppDocModule,
        ButtonModule,
        SelectButtonModule,
        DividerModule,
        TagModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        TooltipModule,
        OrderListModule,
        DataViewModule,
        ToastModule,
        FileUploadModule,
        BadgeModule,
        RouterModule
    ],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, TemplateDoc, TemplateCdekDndDoc, TemplateCdekButtonDoc, StyleDoc, AdvancedDoc, AutoDoc, CustomDoc, AccessibilityDoc]
})
export class FileUploadDocModule {}
