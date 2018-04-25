import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import { ModalModule } from 'ngx-bootstrap';
import {ChartModule} from 'primeng/chart';
import {DragDropModule} from 'primeng/dragdrop';
import {ProgressBarModule} from 'primeng/progressbar';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {SliderModule} from 'primeng/slider';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [],
    imports: [ ModalModule.forRoot(),
        CommonModule ],
    exports: [
        TableModule,
        DropdownModule, 
        CalendarModule,
        FileUploadModule,
        DialogModule,
        InputTextModule,
        MultiSelectModule,
        ChartModule,
        DragDropModule,
        ProgressBarModule,
        TabViewModule,
        ConfirmDialogModule,
        AccordionModule,
        SliderModule,
        KeyFilterModule,
        ProgressSpinnerModule
    ],
    providers: [
        ConfirmationService
    ],
})
export class AppNgPrimeModule {}