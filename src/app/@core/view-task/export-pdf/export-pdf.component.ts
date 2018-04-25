import { RiesgosService } from './../../../@servicios/custom/riesgos.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AvanceModel } from '../../../@model/custom/avances.model';
import { AvancesService } from '../../../@servicios/custom/avances.service';
import { RiesgoModel } from '../../../@model/custom/riesgos.model';
import { ProyectModel } from '../../../@model/custom/proyect.model';
import { DatePipe } from '@angular/common';
declare var jsPDF;
declare var html2pdf;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-export',
    templateUrl: './export-pdf.component.html',
    styleUrls: ['./export-pdf.component.css']
})
export class ExportPdfComponent implements OnInit {
    routerParamId: any;
    colsAvance: any[];
    colsRiesgo: any[];
    avances: AvanceModel[];
    riesgos: RiesgoModel[];
    proyecto: ProyectModel;
    /**
   * constructor
   * @param fb form builder
   * @param srvAvance type user service
   * @param srvRiesgo type user service
   */
    constructor(private fb: FormBuilder,
        private srvAvance: AvancesService,
        private srvRiesgo: RiesgosService,
        private route: ActivatedRoute,
        private http: HttpClient) {
    //this.route.params.subscribe( 
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  params.id;
                this.getAvances();
                this.getRiesgos();
             //   $("#testPrint").attr("hidden", true);

            }
            
        );
     }

    tomaProyecto(event){
        this.proyecto = event.objectoProyecto;        
    }


     getAvances(){
        this.srvAvance.getAllAvances(this.routerParamId).subscribe(resp=>{
            this.avances = resp.body.data;  
        });
            
     }

     getRiesgos(){
        this.srvRiesgo.getAllRiesgos(this.routerParamId).subscribe(resp=>{
            this.riesgos = resp.body.data;
        });
     }

    ngAfterViewInit() {
      //  $("#testPrint").attr("hidden", true);

    }

    ngOnInit(): void { 
        
        this.proyecto = new ProyectModel(); //inicializando
        this.proyecto.nombreProyecto = '';
        this.colsAvance = [
            { dataKey: 'idAvanceProyecto', title: 'ID Riesgo' },
           // { field: 'idProyecto', header: 'ID Proyecto' },
            { dataKey: 'fechaAvance', title: 'Fecha' },
            { dataKey: 'porcentajeAvance', title: 'Porcentaje Avance' },
            { dataKey: 'porcentajeEsperado', title: 'Porcentaje Esperado' },
            { dataKey: 'descripcionAvance', title: 'Descripción' }
        ];

        this.colsRiesgo = [
            { dataKey: 'nombreRiesgo', title: 'Nombre Riesgo' },
            { dataKey: 'descripcionRiesgo', title: 'Descripción Riesgo' },
            { dataKey: 'planDeMitigacion', title: 'Plan de Mitigación' },
            { dataKey: 'planDeAcuerdos', title: 'Plan de Acuerdos' },
            { dataKey: 'nombreResponsable', title: 'Responsable' },
            { dataKey: 'cargo', title: 'Cargo' },
            { dataKey: 'probabilidadRiesgo', title: 'Probabilidad Riesgo'},
            { dataKey: 'vigenciaRiesgo', title: 'Vigencia Riesgo'}
        ]

    }
    testPDF(){
        const pipe = new DatePipe('en-US');
        const fecha = new Date();
     //   $("#testPrint").attr("hidden", false);
        var element = document.getElementById('testPrint');
        html2pdf(element,{
            margin:       10,
            filename: 'Reporte_'+this.proyecto.nombreProyecto+ '_' + pipe.transform(fecha,'MM-dd-yyyy')+'.pdf',
            //filename: 'report3.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { dpi: 192, letterRendering: false },
            jsPDF:        { unit: 'mm', format: 'letter', orientation: 'landscape' }
          });
      //  $("#testPrint").attr("hidden", true);
    }
    /*
    testPDFdos() {
        this.http.post("http://localhost:8081/demo6/api/testing", null, { observe: 'response', responseType: 'blob' }).subscribe(resp => {
            saveAs(resp.body, 'algo');
        })
    } 
    */

}
