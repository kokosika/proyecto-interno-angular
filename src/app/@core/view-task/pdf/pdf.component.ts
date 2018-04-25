import { Component, OnInit } from '@angular/core';
declare var html2pdf: any; 
@Component({
    selector: 'app-pdf',
    templateUrl: './pdf.component.html',
    styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }

    testPDF(){
        var element = document.getElementById('print');
        html2pdf(element,{
            margin:       1,
            filename:     'report3.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { dpi: 192, letterRendering: false },
            jsPDF:        { unit: 'mm', format: 'letter', orientation: 'landscape' }
          });
    }
}
