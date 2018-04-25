import { ExportPdfComponent } from './export-pdf.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hoja1Component } from './hoja-1/hoja-1.component';
import { Hoja2Component } from './hoja-2/hoja-2.component';
import { Hoja3Component } from './hoja-3/hoja-3.component';
import { ChartModule } from 'primeng/chart';
import { Hoja4Component } from './hoja-4/hoja-4.component';
import { Hoja5Component } from './hoja-5/hoja-5.component';
import { AppNgPrimeModule } from '../../../app.ng-prime.module';
import { HojaFooterComponent } from './hoja-footer/hoja-footer.component';
import { Hoja6Component } from './hoja-6/hoja-6.component';

@NgModule({
    declarations: [
        ExportPdfComponent,
        Hoja1Component,
        Hoja2Component,
        Hoja3Component,
        Hoja4Component,
        Hoja5Component,
        HojaFooterComponent,
        Hoja6Component
    ],
    imports: [ 
        CommonModule,
        AppNgPrimeModule 
    ],
    exports: [
        ExportPdfComponent
    ],
    providers: [],
})
export class ExportPdfModule {}