import { ActivatedRoute } from '@angular/router';
import { ProyectService } from './../../../../@servicios/custom/proyect.service';
import { Component, OnInit } from '@angular/core';
import { ProyectModel } from '../../../../@model/custom/proyect.model';
import { FormBuilder } from '@angular/forms';
import { ClienteService } from '../../../../@servicios/custom/cliente.service';
import { ClienteModel } from '../../../../@model/custom/cliente.model';
import { BsDatepickerDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-hoja-2',
  templateUrl: './hoja-2.component.html',
  styleUrls: ['./hoja-2.component.scss']
})
export class Hoja2Component implements OnInit {
  routerParamId: any;
  proyecto: ProyectModel;
  cliente: ClienteModel;

  constructor(private fb: FormBuilder, 
    private srvInfoProyecto: ProyectService, 
    private srvInfoCliente: ClienteService,
    private route: ActivatedRoute) {
    //this.route.params.subscribe( 
    this.route.params.subscribe(
      params => {
        this.routerParamId = params.id;
        this.getInfoProyecto();
        this.getInfoCliente();

      }

    );
  }

  getInfoProyecto() {
    this.srvInfoProyecto.getInfoproyecto(this.routerParamId).subscribe(resp => {
      this.proyecto = resp.body.data;
    //  console.log(this.proyecto);
      //console.log(this.proyecto.nombreProyecto);
    });

  }

  getInfoCliente(){
    this.srvInfoCliente.getInfoCliente(this.routerParamId).subscribe(resp => {
      this.cliente = resp.body.data;
   //   console.log(this.cliente);
     // console.log(this.cliente.nombreCliente);
    });
  }

  ngOnInit() {
    this.proyecto = new ProyectModel(); //inicializando
    this.cliente = new ClienteModel();
    this.proyecto.nombreProyecto = '';
    this.cliente.nombreContraparte = '';
    this.cliente.nombreCliente = '';
    this.proyecto.userJP = '';
    this.proyecto.userJP = '';
    this.proyecto.fechaInicio = new Date();//es un objeto, debe levar parenteris
    this.proyecto.fechaFin = new Date();
  }

}
