import { ClienteService } from './../../@servicios/custom/cliente.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OccupationService } from './../../@servicios/custom/occupation.service';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProyectService } from '../../@servicios/custom/proyect.service';
import { ProyectModel } from '../../@model/custom/proyect.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComboModel } from '../../@model/util/combo.model';
import { DatePipe } from '@angular/common';
import { ContraparteService } from '../../@servicios/custom/contraparte.service';
declare var $: any;
@Component({
    moduleId: module.id,
    selector: 'app-view-gantt',
    templateUrl: './view-gantt.component.html',
    styleUrls: ['./view-gantt.component.css']
})


export class ViewGanttComponent implements OnInit {
    
    proyects: ProyectModel[];
    cols: any[];
    rFormInsert: FormGroup;
    displayInsert = false;
    es: any;
    comboJP: ComboModel[];
    comboEC: ComboModel[];
    proyectId: any;
    public comboCliente: ComboModel[];
    public comboContraparte: ComboModel[];
    constructor(private fb: FormBuilder, 
        private srvProyect: ProyectService, 
        private srvOccupation: OccupationService,
        private router:Router,
        private http: HttpClient,
        private srvCliente: ClienteService,
        private srvContraparte: ContraparteService ) {
        this.rFormInsert = this.fb.group({
            nombreProyecto : [null , Validators.compose([Validators.required, Validators.maxLength(50)])],
            descripcion:  [null , Validators.compose([Validators.required, Validators.maxLength(100)])],
            fechaInicio:  [null , Validators.compose([Validators.required])],
            fechaFin: [null , Validators.compose([Validators.required])],           
            userJP:  [null , Validators.compose([Validators.required])],
            userEC:  [null , Validators.compose([Validators.required])],
            idCliente: [null, Validators.compose([Validators.required])],
            idContraparte: [null, Validators.compose([Validators.required])],
        });
       
    }
    ngOnInit() {         
        this.cargarCombos();
        this.es = {
            firstDayOfWeek: 1,
            dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
            dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
            dayNamesMin: [ "D","L","M","X","J","V","S" ],
            monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
            monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
            today: 'Hoy',
            clear: 'Borrar'
        }
        this.cols = [
            { field: 'idProyecto', header: 'Id' },
            { field: 'nombreProyecto', header: 'Nombre Proyecto' },
            { field: 'descripcion', header: 'Descripcion' },
            { field: 'fechaInicio', header: 'Fecha Inicio' },
            { field: 'fechaFin', header: 'Fecha Fin' },
            { field: 'porcentajeAvance', header: 'Porcentaje' },
            { field: 'userJP', header: 'Nombre JP' },
            { field: 'userEC', header: 'Nombre EC' }
        ];

        this.srvProyect.getAllProyect().subscribe(
            resp => {                
                this.proyects = resp.body.data;
            }, 
            error => {
                console.log(error);
            }
        );        
    }

    cargarCombos(){
        this.srvOccupation.getConsultarCargos(1).subscribe( resp => {
            this.comboJP = resp.body.data;
        });
        this.srvOccupation.getConsultarCargos(2).subscribe( resp => {
            this.comboEC = resp.body.data;
        });
        this.srvCliente.getComboCliente().subscribe( resp => {
            this.comboCliente = resp.body.data;
        });
    }

    seeViewTask(obj: any){       
        this.router.navigate(['core/view-task/' + obj.idProyecto + '/' + obj.fechaInicio + '/' + obj.fechaFin ]);
    }

    dialogSave(){
        this.displayInsert = true;
    }

    dialogSaveClose(){
        this.displayInsert = false;
    }

    getId(obj :any){
        this.proyectId = obj.idProyecto
    }

    uploadHandler(event , form){  
        const formData = new FormData();
        formData.append('file' , event.files[0] );
        formData.append('id' , this.proyectId.toString() );
        const headers = new HttpHeaders({});        
        //this.http.post("./api/subir" , formData  ,  { observe : 'response',headers : headers }).subscribe(
        this.http.post("http://localhost:8081/demo6/api/subir" , formData  ,  { observe : 'response',headers : headers }).subscribe(    
        resp => {
            form.clear();
            }
        )
        ;
    }
    save(obj: any){
        const proyect= new ProyectModel();
        proyect.idProyecto = obj.idProyecto
        proyect.descripcion = obj.descripcion
        proyect.fechaFin = obj.fechaFin
        proyect.fechaInicio = obj.fechaInicio
        proyect.nombreProyecto =obj.nombreProyecto
        proyect.porcentajeAvance = 0;
        proyect.porcentajeEsperado = obj.porcentajeEsperado
        proyect.userEC = obj.userEC.code;
        proyect.userJP = obj.userJP.code;
        proyect.idCliente = obj.idCliente.code;
        proyect.idContraparte = obj.idContraparte.code;
        this.srvProyect.guardarProyecto(proyect).subscribe(resp => {
            this.displayInsert = false;            
            this.rFormInsert.reset();            
            this.srvProyect.getAllProyect().subscribe(
                resp => {                
                    this.proyects = resp.body.data;                  
                }, 
                error => {
                    console.log(error);
                }
            );  
        });        
    }

    public onChangeCliente(value: any): void{    
        let cliente: string = null;
        this.comboContraparte = null;
        cliente = (value == null)? -1 : value.code;
        this.srvContraparte.getComboContraparte(Number.parseInt(cliente)).subscribe(
          resp => {
            this.comboContraparte  = resp.body.data;
          }
        );
      }
    
}