import { Observable } from 'rxjs/Observable';
import { getFileNameFromResponseContentDisposition } from './../../@model/util/file-download-helper';
import { PathDocService } from './../../@servicios/custom/path-doc.service';
import { ProyectService } from './../../@servicios/custom/proyect.service';
import { Component, TemplateRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import { TaskService } from '../../@servicios/custom/task.service';
import { TaskModel } from '../../@model/custom/task.model';
import { AssignamentService } from '../../@servicios/custom/assignament.services';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { saveFile } from '../../@model/util/file-download-helper';
import { saveAs } from 'file-saver/FileSaver';
import { KambanComponent } from './kamban/kamban.component';
import { ProyectModel } from '../../@model/custom/proyect.model';
import { AvancesService } from '../../@servicios/custom/avances.service';
import { AvanceModel } from '../../@model/custom/avances.model';

//Declara la variable para utilizar el plugin en javascript JS Gantt improve.
//Crea la visualizacion de una carta gant via html
declare var JSGantt:any;
//Declara la variable para utilizar el plugin en javascript DayPilot.
//Genera la linea de tiempo de asignaciones
declare var DayPilot: any;
//Declara la variable para utilizar el plugin en javascript html2pdf
//TODO borrar esta dependencia cuando pablo genere la nueva forma de generar pdf.
declare var html2pdf: any;
/**
 * Componente de generar la vista principal de las tareas por proyecto.
 * Contiene en forma general la carga gantt, tabs con informacion especifica
 * TODO = no definido aun solo esta implementado los porcentajes de avance.
 * 
 * @export
 * @class ViewTaskComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

    modalRef: BsModalRef;

    display: boolean = false;

    /**
     * Obtiene una instancia del elemento nativo html para su manipulacion via angular
     * de sus propiedades.
     * 
     * @type {ElementRef} tipo elemento de referencia html.
     * @memberof ViewTaskComponent
     */
    @ViewChild('gatt') gant: ElementRef;
    /**
     * Obtiene una instancia del componente KambanComponent para poder utilizar
     * sus metodos publicos.
     * 
     * @type {KambanComponent}
     * @memberof ViewTaskComponent
     */
    @ViewChild(KambanComponent) kanbanComponent : KambanComponent;
    /**
     * variable que almacenara el id del proyecto el cual es enviado via
     * url al momento de cambiar de pagina.
     * 
     * @type {number}
     * @memberof ViewTaskComponent
     */
    routerParamId: number;
    /**
     * variable que almacenara la fecha de incio del proyecto el cual es enviado via
     * url al momento de cambiar la pagina.
     * 
     * @type {Date}
     * @memberof ViewTaskComponent
     */
    routerFromDate : Date;
    /**
     * variable que almacenara la fecha de fin del proyecto el cual es enviado via
     * url al momento de cambiar la pagina.
     * 
     * @type {Date}
     * @memberof ViewTaskComponent
     */
    routerToDate: Date;

    /**
     * variable que almacenara el nombre del proyecto el cual es enviado via 
     * url al momento de cambiar la pagina.
     * 
     * @type {string}
     * @memberof ViewTaskComponent
     */
    routerNombreProyecto: string;
    /**
     * variable que almacenara un arreglo de tareas del modelo TaskModel
     * 
     * @type {TaskModel[]}
     * @memberof ViewTaskComponent
     */
    taskItem: TaskModel[];
    /**
     * variable que contiene la configuracion del plugin DayPilot.
     * ver documentacion de las opciones de configuracion en: 
     * https://doc.daypilot.org/scheduler/angular/
     * 
     * @type {*}
     * @memberof ViewTaskComponent
     */
    config: any;
    /**
     * variable que contiene los eventos del plugin DayPilot
     * son los datos que se pintan el el plugin.
     * 
     * @type {*}
     * @memberof ViewTaskComponent
     */
    events: any;
    /**
     * Variable que contendra el porcentaje esperado del proyecto.
     * 
     * @type {number}
     * @memberof ViewTaskComponent
     */
    expectedPercentage: number;

    proyecto: ProyectModel;//esto es una declaracion
    /**
     * Variable que contendra el porcentaje de avance real del proyecto.
     * 
     * @type {number}
     * @memberof ViewTaskComponent
     */
    advancePercentage: number;
    /**
     * 
     * 
     * @type {any[]}
     * @memberof ViewTaskComponent
     */
    /**
     * Valida la activacion y desactivacion del boton upload
     * 
     * @memberof ViewTaskComponent
     */
    desabilitarSubir = false;

    avanceDiaAtrasos: number;
    /**
     * Validacion de barra de carga
     * TODO actualmente solo valida el proceso de carga del archivo.
     * 
     * @memberof ViewTaskComponent
     */
    progress= true;

    /**
     * Crea una instancia de ViewTaskComponent.
     * Genera una llamada a ActivatedRoute para obtener el parametro id
     * del proyecto enviado por el path de ruta.
     * generando la Gantt, los recursos y el porcentaje del proyecto.
     * 
     * @param {ElementRef} elementRef injeccion de ElementRef nativo de angular
     * @param {ActivatedRoute} route injeccion de los servicios de rutas nativo angular
     * @param {TaskService} srvTask injeccion de los servicios de las tareas
     * @param {AssignamentService} srvAssignament  injeccion de los servicios de asignacion
     * @param {ProyectService} srvProyect  injeccion de los servicios de proyecto
     * @param {PathDocService} srvPathDoc injeccion de los servicios path
     * @param {HttpClient} http injeccion de servicios http nativos de angular
     * @memberof ViewTaskComponent
     */
    constructor(private elementRef: ElementRef, 
        private modalService: BsModalService,
        private route: ActivatedRoute, 
        private srvAvance: AvancesService, 
        private srvInfoProyecto: ProyectService, 
        private srvTask: TaskService,
        private router: Router,
        private srvAssignament: AssignamentService,
        private srvProyect : ProyectService,
        private srvPathDoc: PathDocService,
        private http: HttpClient) { 
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  Number.parseInt(params.id);
                this.routerFromDate = params.inicio;
                this.routerToDate  = params.fin; 
                this.routerNombreProyecto = params.name;
                this.proyectPercentage();               
                this.getInfoProyecto();
                this.getDiaAtraso();
                this.gantt();
                this.generateResource();
            }
        );
    }
    /**
     * Metodo de seguimiento cuando se crea la vista.
     * 
     * @memberof ViewTaskComponent
     */
    ngOnInit() {

        this.proyecto = new ProyectModel(); //inicializando
         this.proyecto.porcentajeAvance = 0;
        this.proyecto.porcentajeEsperado = 0;
        this.avanceDiaAtrasos = 0;
                 
     }

    /**
     * Metodo para subir archivos hacia el servidor.
     * Habilita la barra de progreso al memento de invocar el metodo
     * Desabilita el boton para no hacer mas de 1 click sobre el
     * A la const id le asigna el valor obtenido de la ruta routerParamId.
     * Crea un FormData para el envio de archivos
     * 
     * @param {*} event evento desencadenado por el componente upload
     * @param {*} form identificador para angular del componenete html
     * para su manipulacion en el archivo ViewTaskComponent
     * @memberof ViewTaskComponent
     */
    public uploadHandler(event: any, form: any): void{
        this.progress = false;
        this.desabilitarSubir = true;
        const id = this.routerParamId;
        const formData = new FormData();
        formData.append('file' , event.files[0] );
        formData.append('id' , id.toString() );
        const headers = new HttpHeaders({});        
        //this.http.post("./api/subir" , formData  ,  { observe : 'response',headers : headers }).subscribe(
        
        this.http.post("http://localhost:8081/demo6/api/subir", formData, { observe: 'response', headers: headers }).subscribe(
        resp => {
                form.clear();
                this.gantt();
                this.generateResource();
                this.desabilitarSubir = false;
                this.proyectPercentage();
                this.progress = true;
                this.resetKanbansParent();
            },
        error => {
            this.desabilitarSubir = false;
               // console.log(error);
            alert("A ocurrido un error al subir el archivo");
            this.progress = true;
            form.clear();
        }
        );
    }
    public gantt(): void{           
        this.http.post(this.srvPathDoc.urlServer + this.srvPathDoc.actionUrl + '/xml', this.routerParamId , { observe: 'response'  ,responseType: 'text' }).subscribe(
            resp => {              
               // console.log(this.routerParamId);
                let element = this.gant.nativeElement;        
                let g = new JSGantt.GanttChart(element, 'day');
                g.setCaptionType('Complete');  // Set to Show Caption (None,Caption,Resource,Duration,Complete)
                g.setQuarterColWidth(36);
                g.setUseToolTip(0);
                g.setDateTaskDisplayFormat('day dd month yyyy'); // Shown in tool tip box
                g.setDayMajorDateDisplayFormat('mon yyyy - Week ww') // Set format to display dates in the "Major" header of the "Day" view
                g.setWeekMinorDateDisplayFormat('dd mon') // Set format to display dates in the "Minor" header of the "Week" view
                g.setShowTaskInfoLink(0); // Show link in tool tip (0/1)
                g.setShowEndWeekDate(0); // Show/Hide the date for the last day of the week in header for daily view (1/0)
                g.setUseSingleCell(25000); // Set the threshold at which we will only use one cell per table row (0 disables).  Helps with rendering performance for large charts.
                g.setFormatArr('Day');            
                JSGantt.parseXMLString(resp.body, g);
                g.Draw();              
            
            }
        )        
    }

    getInfoProyecto() {
        let idDelProyectoInteger:number = this.routerParamId;
        let idDelProyectoString:string = ''+idDelProyectoInteger;
        this.srvInfoProyecto.getInfoproyecto(idDelProyectoString).subscribe(resp => {       
            this.proyecto = resp.body.data;
        });

    }

    public generateResource(): void{        
        let dateFrom = this.routerFromDate.toString().split('-');
        let dateTo = this.routerToDate.toString().split('-');
        let dateFromUtc = Date.UTC(Number.parseInt(dateFrom[0]),Number.parseInt(dateFrom[1]), Number.parseInt(dateFrom[2]));
        let dateToUtc = Date.UTC(Number.parseInt(dateTo[0]),Number.parseInt(dateTo[1]), Number.parseInt(dateTo[2]));
        let dif = dateToUtc - dateFromUtc;
        let countDay = Math.floor(dif / (1000 * 60 * 60 * 24)+1);
        this.srvAssignament.getAllOccupation(this.routerParamId).subscribe(resp => {                            
            this.config = {                    
                startDate: this.routerFromDate, 
                days: countDay,
                scale: 'Day',
                timeHeaders: [
                    { groupBy: "Month", format: "MMM yyyy" },
                    { groupBy: "Cell", format: "d" }
                ], 
                locale: "es-es",
                businessWeekends: true,
                eventHeight: 30,
                treeEnabled: true,
                treePreventParentUsage: true,
                resources: resp.body.data,                
                heightSpec: 'Max',
                height: 500,
                eventMoveHandling: "Disabled",
                eventResizeHandling: "Disabled",
                eventDeleteHandling: "Disabled",
                eventClickHandling: "Disabled",
                eventHoverHandling: "Disabled"
                //scrollTo: '2018-03-01'
            };            
            //this.events = [{text: "100%",start: "2018-01-04T00:00:00",end: "2018-01-06T00:00:00",id: 1,resource: "9"}]
            this.srvAssignament.getAssePorcForUser(this.routerParamId).subscribe(resp => {
                this.events = resp.body.data;
            });
        });
    }

    public proyectPercentage(): void{
        this.srvProyect.getPorcentProyect(this.routerParamId).subscribe(resp => {
            this.expectedPercentage = resp.body.data.porcentajeEsperado;
            this.advancePercentage = resp.body.data.porcentajeAvance;
        });
    }
    public dinamicClassAdvancePercentage(): string{
        if(this.advancePercentage > this.expectedPercentage)
            return 'panel panel-success';
        else if (this.advancePercentage < this.expectedPercentage)
            return 'panel panel-danger';
        else
            return 'panel panel-info';
    }
    public downloadGantt(): void{    
        this.http.post(this.srvPathDoc.urlServer + this.srvPathDoc.actionUrl + '/mpp', this.routerParamId , { observe: 'response'  ,responseType: 'blob' }).subscribe(
        
            resp => {    
                this.srvPathDoc.getNombreMimeProyecto(this.routerParamId).subscribe(res => {
                    saveAs(resp.body, res.body.data.nombre + '_' + Date.now() +'.'+ res.body.data.mime);
                });                
            }
        )           
    }

    public validacion(): void{
        this.desabilitarSubir = true;
    }

    getDiaAtraso() {
        let idDelProyectoInteger: number = this.routerParamId;
        let idDelProyectoString: string = '' + idDelProyectoInteger;
        this.srvAvance.getDiasAtraso(idDelProyectoString).subscribe(resp => {
            // debugger
            this.avanceDiaAtrasos = resp.body.data.diasAtraso;
            console.log(this.avanceDiaAtrasos);
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
        );
        this.modalRef.content.closeBtnName = 'Close';
    }

    seeInfoToPdf() {
        this.router.navigate(['core/pdf/' + this.routerParamId]);
    }

    testPDF(){
        let element = document.getElementById('test');
        html2pdf(element,{
            margin:       1,
            filename:     'myfile.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { dpi: 192, letterRendering: true },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          });
    }

    showDialog() {
        this.display = true;
    }

    public resetKanbansParent(): void{
        this.kanbanComponent.resetKamban();
    }
}