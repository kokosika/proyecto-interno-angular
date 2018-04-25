import { PdfComponent } from './pdf.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hoja1Component } from './hoja-1/hoja-1.component';
import { Hoja2Component } from './hoja-2/hoja-2.component';
import { Hoja3Component } from './hoja-3/hoja-3.component';

@NgModule({
    declarations: [PdfComponent ,Hoja1Component, Hoja2Component, Hoja3Component],
    imports: [ CommonModule ],
    exports: [
        PdfComponent
    ],
    providers: [],
})
export class PdfModule {}