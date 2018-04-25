import { Component, OnInit } from '@angular/core';
import { NextActivities } from '../../../../@model/custom/next-activities.model';
import { FormBuilder } from '@angular/forms';
import { NextActivitiesService } from '../../../../@servicios/custom/next-activities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hoja-6',
  templateUrl: './hoja-6.component.html',
  styleUrls: ['./hoja-6.component.scss']
})
export class Hoja6Component implements OnInit {
  routerParamId: any;
  cols: any[];
  nextActivities: NextActivities[];

   /**
* constructor
* @param fb form builder
* @param srvNextActivities type user service
*/
constructor(private fb: FormBuilder,
  private srvNextActivities: NextActivitiesService,
  private route: ActivatedRoute) {
  this.route.params.subscribe(
    params => {
      this.routerParamId = params.id;
      this.getNextActivitiesPorProyecto();
      //  this.getAvances();
    }

  );
}

  getNextActivitiesPorProyecto() {
    this.srvNextActivities.getAllNextActivitiesProyecto(this.routerParamId).subscribe(resp => {
      this.nextActivities = resp.body.data;
    });

  }

  ngOnInit() {
    this.cols = [
      { field: 'fechaInicioTarea', header: 'Fecha Inicio' },
      { field: 'fechaTerminoTarea', header: 'Fecha Término' },
      { field: 'nombreEtapa', header: 'Etapa' },
      { field: 'nombreTarea', header: 'Actividad' }
    ];
  }

}
