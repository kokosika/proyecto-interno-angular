import { PdfModule } from './view-task/pdf/pdf.module';
import { AppNgPrimeModule } from './../app.ng-prime.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { CoreComponent } from './core.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ViewGanttComponent } from './view-gantt/view-gantt.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import {DayPilotModule} from "daypilot-pro-angular";
import { AssignmentsComponent } from './assignments/assignments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubirArchivosComponent } from './subir-archivos/subir-archivos.component';
import { KambanComponent } from './view-task/kamban/kamban.component';
import { AvanceProyectoComponent } from './avance-proyecto/avance-proyecto.component';
import { RiesgosComponent } from './riesgos/riesgos.component';
import { ExportPdfModule } from './view-task/export-pdf/export-pdf.module';
import { NextActivitiesComponent } from './next-activities/next-activities.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BlockUIModule } from 'ng-block-ui';
@NgModule({
    declarations: [
        CoreComponent,
        ViewGanttComponent,
        ViewTaskComponent,
        AssignmentsComponent,
        SubirArchivosComponent,
        KambanComponent,
	     RiesgosComponent,
        AvanceProyectoComponent,
        NextActivitiesComponent,
        SpinnerComponent
    ],
    imports: [ 
        CommonModule, 
        RouterModule, 
        SidebarModule,
        FooterModule ,
        BlockUIModule.forRoot(),
        NavbarModule, 
        AppNgPrimeModule,
        DayPilotModule,
        FormsModule,
        ReactiveFormsModule,
        PdfModule,
	    ExportPdfModule
    ],
    exports: [
        CoreComponent,
        ViewGanttComponent,
        ViewTaskComponent,
        AssignmentsComponent,
        SubirArchivosComponent,
	    RiesgosComponent,
        AvanceProyectoComponent

    ],
    providers: [],
})
export class CoreModule {}