import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-subir-archivos',
    templateUrl: './subir-archivos.component.html'
})
export class SubirArchivosComponent implements OnInit {
    @ViewChild('gatt') gant: ElementRef;
    constructor(private elementRef: ElementRef) { 
        
    }
    

    ngOnInit() { }

    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
            console.log(file);
        }
    
    }

    gantt(){
        var element = this.gant.nativeElement;        
        var g = new JSGantt.GanttChart(element, 'day');
        g.setCaptionType('Complete');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
        g.setQuarterColWidth(36);
        //g.setUseToolTip(0);
        g.setDateTaskDisplayFormat('day dd month yyyy'); // Shown in tool tip box
        g.setDayMajorDateDisplayFormat('mon yyyy - Week ww') // Set format to display dates in the "Major" header of the "Day" view
        g.setWeekMinorDateDisplayFormat('dd mon') // Set format to display dates in the "Minor" header of the "Week" view
        g.setShowTaskInfoLink(1); // Show link in tool tip (0/1)
        g.setShowEndWeekDate(0); // Show/Hide the date for the last day of the week in header for daily view (1/0)
        g.setUseSingleCell(10000); // Set the threshold at which we will only use one cell per table row (0 disables).  Helps with rendering performance for large charts.
        g.setFormatArr('Day');  
        g.setUseSort(1);              
        JSGantt.parseXML('../assets/ejemplo.xml', g) 
        g.Draw();
    }

    ngAfterContentInit() {
       this.gantt();
        
    }
}