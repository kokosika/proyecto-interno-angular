import { ActivatedRoute } from '@angular/router';
import { AvancesService } from './../../../../@servicios/custom/avances.service';
import { AvanceModel } from './../../../../@model/custom/avances.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hoja-4',
  templateUrl: './hoja-4.component.html',
  styleUrls: ['./hoja-4.component.scss']
})
export class Hoja4Component implements OnInit {
  routerParamId: any;
  avances: AvanceModel[];
  cols: any[];
  /**
   * constructor
   * @param fb form builder
   * @param srvAvance type user service
   */
  constructor(private fb: FormBuilder, private srvAvance: AvancesService, 
    private route: ActivatedRoute ) {
    //this.route.params.subscribe( 
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  params.id;
                this.getAvances();
            }
            
        );
     }

     getAvances(){
      this.srvAvance.getAllAvances(this.routerParamId).subscribe(resp=>{
          this.avances = resp.body.data;  
      });
          
   }

   ngOnInit() { 
    this.cols = [
        //{ field: 'idAvanceProyecto', header: 'ID Avance' },
       // { field: 'idProyecto', header: 'ID Proyecto' },
        { field: 'fechaAvance', header: 'Fecha' },
        { field: 'porcentajeAvance', header: 'Porcentaje Avance' },
        { field: 'porcentajeEsperado', header: 'Porcentaje Esperado' },
        { field: 'descripcionAvance', header: 'Descripción' },
        { field: 'diasAtraso', header: 'Días de Atraso' }
    ]
}

}
