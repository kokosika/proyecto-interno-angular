import { ActivatedRoute } from '@angular/router';
import { AvancesService } from './../../../../@servicios/custom/avances.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AvanceModel } from '../../../../@model/custom/avances.model';
import { RiesgosService } from '../../../../@servicios/custom/riesgos.service';
import { ProyectService } from '../../../../@servicios/custom/proyect.service';
import { ProyectModel } from '../../../../@model/custom/proyect.model';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-hoja-3',
  templateUrl: './hoja-3.component.html',
  styleUrls: ['./hoja-3.component.scss']
})
export class Hoja3Component implements OnInit {
  @Input() avance : AvanceModel[];
  fechas = [];
  data: any;
  options:any;
  descripcion = [];
  expectedPercentage: number;
    advancePercentage: number;
  porcentajeReal = [];
  porcentajeEsperado = [];
  routerParamId: any;
  colsAvance: any[];
  colsRiesgo: any[];
  avances: AvanceModel[];
    avanceDiaAtrasos: number;
  proyecto: ProyectModel;
/**
   * constructor
   * @param fb form builder
   * @param srvAvance type user service
   */
    constructor(private fb: FormBuilder, 
        private srvInfoProyecto: ProyectService, 
        private srvAvance: AvancesService, 
        private srvRiesgo: RiesgosService,
    private route: ActivatedRoute ) {
    //this.route.params.subscribe( 
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  params.id;
                this.getAvances();
                this.getInfoProyecto();
                this.getDiaAtraso();
            }
            
        );
     }

     getInfoProyecto(){
            
        this.srvInfoProyecto.getInfoproyecto(this.routerParamId).subscribe(resp=>{
           
          this.proyecto = resp.body.data;  
           // console.log(this.proyecto);
        });

    }

    getDiaAtraso() {    
        this.srvAvance.getDiasAtraso(this.routerParamId).subscribe(resp => {
             debugger
            this.avanceDiaAtrasos = resp.body.data.diasAtraso;
            console.log(this.avanceDiaAtrasos);
      });
      }

     getAvances(){
      this.srvAvance.getAllAvances(this.routerParamId).subscribe(resp=>{
            
          this.avances = resp.body.data;  
          this.porcentajeReal = [];
          this.porcentajeEsperado = [];
          this.fechas = [];
          this.avances.map((item) => {
              this.fechas.push(item.fechaAvance);
                //console.log(item.porcentajeAvance);
              this.porcentajeReal.push(item.porcentajeAvance);
              this.porcentajeEsperado.push(item.porcentajeEsperado);                
          });
          this.data = {
              labels: this.fechas,
              datasets: [
                  {
                      label: 'Avance Esperado',
                      data: this.porcentajeEsperado,
                      fill: false,
                      borderColor: '#4bc0c0'
                  },
                  {
                      label: 'Avance Real',
                      data: this.porcentajeReal,
                      fill: false,
                      borderColor: '#565656'
                  }
              ]
          }
         
          this.options = {
              //[options]="options"
            title: {
                display: true,
                text: this.proyecto.nombreProyecto,
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            }
        }
         
      });
   }

   ngOnInit(): void { 
        this.proyecto = new ProyectModel(); //inicializando
        this.proyecto.porcentajeAvance = 0;
        this.proyecto.porcentajeEsperado = 0;
    this.proyecto.userJP = '';
    this.proyecto.userJP = '';
    this.proyecto.fechaInicio = new Date();//es un objeto, debe levar parenteris
    this.proyecto.fechaFin = new Date();
    this.colsAvance = [
        { dataKey: 'idAvanceProyecto', title: 'ID Riesgo' },
       // { field: 'idProyecto', header: 'ID Proyecto' },
        { dataKey: 'fechaAvance', title: 'Fecha' },
        { dataKey: 'porcentajeAvance', title: 'Porcentaje Avance' },
        { dataKey: 'porcentajeEsperado', title: 'Porcentaje Esperado' },
        { dataKey: 'descripcionAvance', title: 'Descripción' }
    ];
    this.options = {
        responsive: false,
        maintainAspectRatio: false
      };

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
dinamicClassAdvancePercentage(): string{
    if(this.advancePercentage > this.expectedPercentage)
        return 'panel panel-success';
    else if (this.advancePercentage < this.expectedPercentage)
        return 'panel panel-danger';
    else
        return 'panel panel-info';
}

}
