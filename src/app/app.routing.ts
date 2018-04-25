import { KambanComponent } from './@core/view-task/kamban/kamban.component';
import { RiesgosComponent } from './@core/riesgos/riesgos.component';
import { PdfComponent } from './@core/view-task/pdf/pdf.component';
import { CoreComponent } from './@core/core.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { ViewGanttComponent } from './@core/view-gantt/view-gantt.component';
import { ViewTaskComponent } from './@core/view-task/view-task.component';
import { AssignmentsComponent } from './@core/assignments/assignments.component';
import { SubirArchivosComponent } from './@core/subir-archivos/subir-archivos.component';
import { AvanceProyectoComponent } from './@core/avance-proyecto/avance-proyecto.component';
import { ExportPdfComponent } from './@core/view-task/export-pdf/export-pdf.component';

const routes: Routes =[    
    { path: 'login' , component: LoginComponent},
    { path: 'core' , component: CoreComponent , children: [
      { path: 'dashboard',      component: HomeComponent },
      { path: 'view-gantt',     component: ViewGanttComponent},
      { path: 'view-task/:id/:inicio/:fin',     component: ViewTaskComponent},
      { path: 'pdf/:id',     component: ExportPdfComponent},
      { path: 'assignments', component: AssignmentsComponent},
      { path: 'subir', component: SubirArchivosComponent},
       { path: 'riesgos', component: RiesgosComponent},
      { path: 'avances', component: AvanceProyectoComponent}, 
      { path: 'user',           component: UserComponent },
      { path: 'table',          component: TablesComponent },
      { path: 'typography',     component: TypographyComponent },
      { path: 'icons',          component: IconsComponent },
      { path: 'maps',           component: MapsComponent },
      { path: 'notifications',  component: NotificationsComponent },
      { path: 'upgrade',        component: UpgradeComponent },
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' }
    ]},    
    { path: '',          redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
