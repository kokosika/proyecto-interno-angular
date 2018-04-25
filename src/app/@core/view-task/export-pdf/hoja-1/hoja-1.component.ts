import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProyectService } from '../../../../@servicios/custom/proyect.service';
import { ProyectModel } from '../../../../@model/custom/proyect.model';
import { ClienteModel } from '../../../../@model/custom/cliente.model';
import { ClienteService } from '../../../../@servicios/custom/cliente.service';

@Component({
  selector: 'app-hoja-1',
  templateUrl: './hoja-1.component.html',
  styleUrls: ['./hoja-1.component.scss']
})
export class Hoja1Component implements OnInit {
  routerParamId: any;
  proyecto: ProyectModel;
  cliente: ClienteModel;
  @Output() InfoProyecto = new EventEmitter();

  constructor(private fb: FormBuilder, 
    private srvInfoProyecto: ProyectService,
    private srvInfoCliente: ClienteService,
    private route: ActivatedRoute ) {
    //this.route.params.subscribe( 
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  params.id;
                this.getInfoProyecto();
                this.getInfoCliente();
            }
            
        );
     }

  getInfoProyecto(){
    this.srvInfoProyecto.getInfoproyecto(this.routerParamId).subscribe(resp=>{
      this.proyecto = resp.body.data;  
      this.InfoProyecto.emit({objectoProyecto: this.proyecto}); 
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
  }

}
