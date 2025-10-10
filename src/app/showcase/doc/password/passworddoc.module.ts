import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { DisabledDoc } from './disableddoc';
import { FloatLabelDoc } from './floatlabeldoc';
import { ImportDoc } from './importdoc';
import { InvalidDoc } from './invaliddoc';
import { MeterDoc } from './meterdoc';
import { LocaleDoc } from './localedoc';
import { ReactiveFormsDoc } from './reactiveformsdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { ToggleMaskDoc } from './togglemaskdoc';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FilledDoc } from './filleddoc';
import { IconFieldModule } from '../../../components/iconfield/iconfield';
import { InputIconModule } from '../../../components/inputicon/inputicon';
import { CustomDisabledDoc } from '@doc/password/customdisableddoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, PasswordModule, FormsModule, ReactiveFormsModule, DividerModule, RouterModule, FloatLabelModule, IconFieldModule, InputIconModule],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, MeterDoc, LocaleDoc, ToggleMaskDoc, TemplateDoc, FloatLabelDoc, InvalidDoc, DisabledDoc, StyleDoc, AccessibilityDoc, ReactiveFormsDoc, FilledDoc, CustomDisabledDoc]
})
export class PasswordDocModule {}
