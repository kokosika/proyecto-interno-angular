import { RangoFechasModel } from './../../@model/util/rango-fechas.model';
import { OccupationModel } from './../../@model/custom/occupation.model';
import { OcupationFilterModel } from './../../@model/custom/occupation-filter.model';
import { ProyectService } from './../../@servicios/custom/proyect.service';
import { ComboModel } from './../../@model/util/combo.model';
import { Component, OnInit } from '@angular/core';
import { AssignamentService } from '../../@servicios/custom/assignament.services';
import { SelectItem } from 'primeng/components/common/selectitem';
import { OccupationService } from '../../@servicios/custom/occupation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
    config: any;
    events : any;
    comboOccupation: ComboModel[];
    comboProyect: ComboModel[];
    rFormSearch: FormGroup;
    es: any;
    filter : OcupationFilterModel;

    /**
     * Crea una instacia del componente AssignmentsComponent
     * Constructor destinado para la injeccion de dependecias
     * Crea los parametros para el bindig cruzado entre el formulario html y 
     * el formulario en el componente
     * resetea las variables del filtro en null para la busqueda
     * 
     * @param srvAssignament injeccion de los servicios de asignaciones
     * @param srvOccupation  injeccion de los servicios de ocupaciones
     * @param srvProyect injeccion de los servicios de proyecto
     * @param fb form builder para generar formularios.
     */
    constructor(private srvAssignament: AssignamentService,
    private srvOccupation: OccupationService,
    private srvProyect: ProyectService,
    private fb: FormBuilder) { 
        this.rFormSearch = this.fb.group({
            occupation : [null],
            proyect: [null],
            dates: [null]
        });
        this.filter = new OcupationFilterModel();
        this.filter.dateFrom = null;
        this.filter.dateTo = null;
        this.filter.occupationId = null;
        this.filter.proyectId = null;
        this.generateResource(this.filter);
    }

    /**
     * Metodo que se invoca cuando se inicializa cuando la vista se crea
     * llama al metodo generateCombo que genera los combos del formulario
     * y al metodo calendarConfig que configura la opciones del calendario
     */
    ngOnInit() { 
        this.generateCombo();
        this.calendarConfig();
    }

    /**
     * Realiza una llamada http al metodo getComboAllOccupation del servicio de ocupacion
     * en donde llena la variable comboOccupation para mostrar el combo de ocupaciones o cargos
     * en el formulario.
     * Realiza una llamanda http al metodo getComboAllProyect del servicio de proyectos
     * en donde llena la variable comboProyect para llenar un combo de proyectos en el formulario.
     */
    generateCombo(){
        this.srvOccupation.getComboAllOccupation().subscribe(resp => {                
            this.comboOccupation = resp.body.data;            
        });      
        this.srvProyect.getComboAllProyect().subscribe(resp => {
            this.comboProyect = resp.body.data;    
        });  
    }

    /**
     * Metodo que generara los recursos de asignacion.
     * Llama al metodo getAllOccupationAll del servicio de asignaciones que envia desde el 
     * servidor el listado de todos los cargos u ocupaciones para distribuirlas en el plugin de asginaciones de tiempo.
     * Llama al metodo srvAssignament del servicio de asignaciones que envia desde el servidor el
     * listado con todos los porcentajes asignados en todos los proyectos asociandolos a su respectivo cargo.
     * @param obj objecto de tipo OcupationFilterModel que sera la cabezera del formulario 
     * html de consulta de filtros.
     */
    generateResource(obj: OcupationFilterModel){        
        this.srvAssignament.getAllOccupationAll(obj).subscribe(resp => { 
            this.srvProyect.rangoFechasTodosLosProyectos().subscribe(respFechas=> {
                debugger
                const fechas : RangoFechasModel = respFechas.body.data;
                let dateFrom = fechas.fechaInicio.toString().split('-');
                let dateTo = fechas.fechaFin.toString().split('-');
                let dateFromUtc = Date.UTC(Number.parseInt(dateFrom[0]),Number.parseInt(dateFrom[1]), Number.parseInt(dateFrom[2]));
                let dateToUtc = Date.UTC(Number.parseInt(dateTo[0]),Number.parseInt(dateTo[1]), Number.parseInt(dateTo[2]));
                let dif = dateToUtc - dateFromUtc;
                let countDay = Math.floor(dif / (1000 * 60 * 60 * 24)+1);
                this.config = {                    
                    startDate: fechas.fechaInicio, 
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
                this.srvAssignament.getAssePorcForUserAll().subscribe(resp => {
                    this.events = resp.body.data;
                });
            });            
        });
    }

    /**
     * Configuracion regional basica del calendario que hay en el formulario.
     * 
     */
    calendarConfig(){
        this.es = {
            firstDayOfWeek: 0,
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            today: 'Today',
            clear: 'Clear'
        };
    }

    /**
     * Metodo que genera la busqueda por los parametros pasados al OcupationFilterModel cambiando el 
     * valor por defecto de las fechas de undefined a null, para evitar errores en el envio de datos
     * al servidor.
     * Por ultimo invoca al metodo [href = 'generateResource'] generando los recursos y eventos de la
     * asignacion
     * @param obj Objecto de tipo OcupationFilterModel para el filtro de ocupaciones y 
     * asignaciones asociadas.
     * 
     */
    search(obj: any){        
        this.filter = new OcupationFilterModel();
        (obj.occupation != null) ? this.filter.occupationId = obj.occupation.code :this.filter.occupationId = null;
        (obj.proyect != null) ? this.filter.proyectId = obj.proyect.code :this.filter.proyectId = null

        if(obj.dates != null){
            this.filter.dateFrom = obj.dates[0];
            this.filter.dateTo = obj.dates[1];
        }else{
            this.filter.dateFrom = null;
            this.filter.dateTo = null;
        }
        //this.filter.occupationId =  obj.occupation.code;
        //this.filter.proyectId = obj.proyect.code;
        //this.filter.dateFrom = obj.dates[0];
        //this.filter.dateTo = obj.dates[1];        
        this.generateResource(this.filter);
    }
}