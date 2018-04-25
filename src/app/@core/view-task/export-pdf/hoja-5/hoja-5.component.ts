import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RiesgoModel } from '../../../../@model/custom/riesgos.model';
import { RiesgosService } from '../../../../@servicios/custom/riesgos.service';

@Component({
  selector: 'app-hoja-5',
  templateUrl: './hoja-5.component.html',
  styleUrls: ['./hoja-5.component.scss']
})
export class Hoja5Component implements OnInit {
  cols: any[];
  routerParamId: any;
  riesgos: RiesgoModel[];
   /**
   * constructor
   * @param fb form builder
   * @param srvRiesgo type user service
   */

  constructor(private fb: FormBuilder, private srvRiesgo: RiesgosService,
    private route: ActivatedRoute ) {
    //this.route.params.subscribe( 
      this.route.params.subscribe( 
        params => {
            this.routerParamId =  params.id;
            this.getRiesgos();

        }
        
    );
     }

     getRiesgos(){
      this.srvRiesgo.getAllRiesgos(this.routerParamId).subscribe(resp=>{
          this.riesgos = resp.body.data;
      });
   }

   ngOnInit() { 
    this.cols = [
        { field: 'nombreRiesgo', header: 'Nombre Riesgo' },
        { field: 'descripcionRiesgo', header: 'Descripción Riesgo' },
        { field: 'planDeMitigacion', header: 'Plan de Mitigación' },
        { field: 'planDeAcuerdos', header: 'Plan de Acuerdos' },
        { field: 'nombreResponsable', header: 'Responsable' },
        { field: 'cargo', header: 'Cargo' },
        { field: 'probabilidadRiesgo', header: 'Probabilidad Riesgo'},
        { field: 'vigenciaRiesgo', header: 'Vigencia Riesgo'}
    ]
  }

}
