import { ActivatedRoute } from '@angular/router';
import { TareasDragModel } from './../../../@model/custom/tareas-drag.model';
import { Component, OnInit } from '@angular/core';
import { TareasDragService } from '../../../@servicios/custom/tareas-drag.service';
import { TaskService } from '../../../@servicios/custom/task.service';
/**
 * Componente dedicado a la visualizacion del modelo kamban a partir de los datos
 * generados por la carta gantt
 * 
 * @export 
 * @class KambanComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-kamban',
  templateUrl: './kamban.component.html',
  styleUrls: ['./kamban.component.scss']
})

export class KambanComponent implements OnInit { 
  
  /**
   * Variable que hace referencia a todas las tareas asociadas a 1 proyecto
   * Es una Instancia de array de la clase TareasDragModel.
   * 
   * @type {TareasDragModel[]}
   * @memberof KambanComponent
   */
  public todasLasTareas : TareasDragModel[];
  
  /**
   * Variable que hace referencia a todas las tareas pendientes asociadas a 1 proyecto
   * Es una Instancia de array de la clase TareasDragModel.
   * 
   * @type {TareasDragModel[]}
   * @memberof KambanComponent
   */
  public tareasPendientes:  TareasDragModel[];
  
  /**
   * Variable que hace referencia a todas las tareas en desarrollo asociadas a 1 proyecto
   * Es una Instancia de array de la clase TareasDragModel.
   * 
   * @type {TareasDragModel[]}
   * @memberof KambanComponent
   */
  public tareasEnDesarrollo: TareasDragModel[];
  /**
   * Variable que hace referencia a todas las tareas terminadas asociadas a 1 proyecto
   * Es una Instancia de array de la clase TareasDragModel.
   * 
   * @type {TareasDragModel[]}
   * @memberof KambanComponent
   */
  public tareasTerminadas: TareasDragModel[];
  /**
   * 
   * Variable que hace referencia del drag and drop, se llena cada ves que ocurre un arrastre
   * entre los componentes
   * Es una Instancia de la clase TareasDragModel.
   * @type {TareasDragModel}
   * @memberof KambanComponent
   */
  public draggedTarea: TareasDragModel;

  /**
   * Variable que almacena la variable de la ruta, que envia desde la pagina anterior
   * el id del proyecto, para futuras consultas
   * 
   * @type {number}
   * @memberof KambanComponent
   */
  public routerParamId: number;
  /**
   * Variable que almacenara la fecha de hoy como tipo date, para comparaciones entre las
   * fechas de las tareas asociadas al proyecto.
   * 
   * @type {Date}
   * @memberof KambanComponent
   */
  public hoy : Date;
  
  /**
   * Variable que almacenara el comportamiento del dialogo en cuanto a su
   * visualizacion como cuando se oculta
   * Se considera como variable bandera del comportamiento del dialago.
   * 
   * @type {boolean}
   * @memberof KambanComponent
   */
  public displayDialogoPorcentaje: boolean = false;

  /**
   * Variable que almacena el comportamiento de los porcentajes de avance 
   * de la tarea siempre y cuando sean en desarrollo.
   * Se considera variable de almacenamiento del porcentaje de avance.
   * 
   * @type {number}
   * @memberof KambanComponent
   */
  public porcentajeAvanzado: number;

  /**
   * Variable que almacenara en cache el id de la tarea.
   * 
   * @private
   * @type {string}
   * @memberof KambanComponent
   */
  private idTarea: string;

  /**
   * Variable que almacenara el id del proyecto en cache.
   * 
   * @private
   * @type {number}
   * @memberof KambanComponent
   */
  private idProyecto: number;
  
  
  /**
   * Crea una instacia del componente @memberof KambanComponent
   * Constructor destinado para la injeccion de dependecias
   * Asigna la fecha de hoy a la variable @prop hoy con la fecha de hoy
   * Llama al servicio @type {ActivatedRoute} para buscar via rxjs el id del proyecto
   * pasada por parametros y se la asigna a la variable @prop routerParamId con un parseo
   * a numero.
   * Genera la data asociada al modelo kambas con el metodo @method generarDataKamban.
   * 
   * @param {TareasDragService} srvTareasDrag servicio exclusivo para el funcionamiento de 
   * este modulo de drag and drop.
   * @param {ActivatedRoute} route servicios de rutas para recolectar el id de proyecto. 
   * @param {TaskService} srvTareas sevicio que gestiona operaciones de las tareas.
   * @memberof KambanComponent
   */
  constructor(private srvTareasDrag: TareasDragService,
              private route: ActivatedRoute,
              private srvTareas: TaskService ) {
    this.hoy = new Date();    
    this.route.params.subscribe( 
      params => {
          this.routerParamId =  Number.parseInt(params.id);
          this.generarDataKamban(this.routerParamId);
      });      
   }

  /**
   * 
   * 
   * @memberof KambanComponent
   */
  ngOnInit() {
  }

  /**
   * Metodo de evento que se activa cuando el usuario levanta un item del drag and drop
   * almacendando todas sus propiedades el objecto obj de tipo @prop TareasDragModel 
   * y lo almacena en la variable de clase @prop draggedTarea para su posterior manipulacion en el 
   * modulo de todas las tareas.
   * 
   * @param {*} event evento generado por el drag and drop
   * @param {TareasDragModel} obj objecto que es tomado por el usuario
   * @memberof KambanComponent
   */
  public dragStartTodasLasTareas(event: any,obj: TareasDragModel): void{    
    this.draggedTarea = obj;
  }

  /**
   * Metodo que se ejecuta cuando el drop ya se a efectuado. Es el fin de la secuancia del drag and drop
   * Este metodo tiene la tarea de resetear la variable de clase @prop draggedTarea cuando comienza la accion 
   * en el modulo de todas la tareas.
   * 
   * @param {*} event evento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dragEndTodasLasTareas(event: any) : void{   
    this.draggedTarea = null;
  }
  /**
   * Metodo que se activa cuando un objecto cae en el modulo de todas las tareas.
   * Como esto no puede ocurrir ya que siempre tendra todas las tareas listadas, las cuales 
   * solo podran ser destinadas a la asignacion de otros modules del kamban
   * 
   * @param {*} event evento que emite el drop
   * @memberof KambanComponent   
   * */
  public dropTodasLasTareas(event: any): void{}

  /**
   * Metodo que se activa cuando comienza el drag and drop desde el modulo de tareas pendientes
   * Tiene la tarea de obtener toda la informacion del item que se toma de este modulo, para ser
   * asignado a otro asignandolo en la variable @prop draggedTarea para su posterior manipulacion.
   * 
   * @param {*} event evento que se emite al momento del comienso del drag and drop
   * @param {TareasDragModel} obj  objecto que es tomado por el usuario
   * @memberof KambanComponent
   */
  public dragStartTareasSinHacer(event: any,obj: TareasDragModel): void{
    this.draggedTarea = obj;
  }

  /**
   * Metodo que se ejecuta cuando el drop ya se a efectuado. Es el fin de la secuancia del drag and drop
   * Este metodo tiene la tarea de resetear la variable de clase @prop draggedTarea cuando comienza la accion 
   * en el modulo de tareas pendientes.
   * 
   * @param {*} event evento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dragEndTareasSinHacer(event: any): void{
    this.draggedTarea = null;
  }

  /**
   * Metodo privado que realiza la accion del drop de de los contenedores
   * Elimina segun corresponda la busqueda de los objectos volcados de los arreglos
   * de todos los modulos de drag and drop, asegurando que solo exita uno por contenedor
   * sin que se repitan en el despliege de la pantalla.
   * Afeta los arreglos de: 
   * tareasPendientes
   * tareasEnDesarrollo
   * tareasTerminadas
   * 
   * @memberof KambanComponent
   */
  private drop(): void{   
    if(this.tareasPendientes.length != 0){
      if(this.tareasPendientes.indexOf(this.draggedTarea) != -1 ){        
        this.tareasPendientes.splice(this.tareasPendientes.indexOf(this.draggedTarea),1);
      }        
    }
    if(this.tareasEnDesarrollo.length != 0 ){
      if(this.tareasEnDesarrollo.indexOf(this.draggedTarea) != -1)
        this.tareasEnDesarrollo.splice(this.tareasEnDesarrollo.indexOf(this.draggedTarea),1);
    }
    if(this.tareasTerminadas.length != 0){
      if(this.tareasTerminadas.indexOf(this.draggedTarea) != -1)
        this.tareasTerminadas.splice(this.tareasTerminadas.indexOf(this.draggedTarea),1);
    }
  }
  /**
   * Drop especifico de las tareas sin hacer, cuando se llama este evento al momento de soltar
   * el elemento en el contenedor llama al metodo privado drop para efectuar la limpieza del arreglo
   * en cualquiea de sus contenedores.
   * Le asigna es estado kamban en 1 para identificar en la base de datos el update del elemento
   * como tarea pendiente o sin hacer.
   * Llama al metodo updateEstadoKambas el cual contiene la llamada al servicio para realizar el update
   * del estado kamban.
   * Le asigna a la variable global draggedTarea null.
   * 
   * @param {*} event vento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dropTareasSinHacer(event: any): void{
    this.drop();
    this.draggedTarea.estadoKamban = 1;
    this.updateEstadoKambas(this.draggedTarea);
    //this.tareasPendientes.push(this.draggedTarea);   
    this.draggedTarea = null;
  }

  /**
   * Drop especifico de las tareas en desarrollo, cuando se llama este evento al momento de soltar
   * el elemento en el contenedor llama al metodo privado drop para efectuar la limpieza del arreglo
   * en cualquiea de sus contenedores.
   * Le asigna es estado kamban en 2 para identificar en la base de datos el update del elemento
   * como tarea pendiente o sin hacer.
   * Llama al metodo updateEstadoKambas el cual contiene la llamada al servicio para realizar el update
   * del estado kamban.
   * Le asigna a la variable global draggedTarea null.
   * 
   * @param {*} event vento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dropTareasEnDesarrollo(event: any): void{
    this.drop();
    this.draggedTarea.estadoKamban = 2;
    this.updateEstadoKambas(this.draggedTarea);
    //this.tareasEnDesarrollo.push(this.draggedTarea);  
    this.draggedTarea = null;
  }

   /**
   * Metodo de evento que se activa cuando el usuario levanta un item del drag and drop
   * almacendando todas sus propiedades el objecto obj de tipo @prop TareasDragModel 
   * y lo almacena en la variable de clase @prop draggedTarea para su posterior manipulacion en el 
   * modulo de tareas en desarrollo.
   * 
   * @param {*} event evento generado por el drag and drop
   * @param {TareasDragModel} obj objecto que es tomado por el usuario
   * @memberof KambanComponent
   */
  public dragStartTareasEnDesarrollo(event : any,obj: TareasDragModel) :void{
    this.draggedTarea = obj;
  }
  /**
   * Metodo que se ejecuta cuando el drop ya se a efectuado. Es el fin de la secuancia del drag and drop
   * Este metodo tiene la tarea de resetear la variable de clase @prop draggedTarea cuando comienza la accion 
   * en el modulo de tareas en desarrollo.
   * 
   * @param {*} event evento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dragEndTareasEnDesarrollo(event: any): void{
    this.draggedTarea = null;
  }

  /**
   * Drop especifico de las tareas terminadas, cuando se llama este evento al momento de soltar
   * el elemento en el contenedor llama al metodo privado drop para efectuar la limpieza del arreglo
   * en cualquiea de sus contenedores.
   * Le asigna es estado kamban en 3 para identificar en la base de datos el update del elemento
   * como tarea pendiente o sin hacer.
   * Llama al metodo updateEstadoKambas el cual contiene la llamada al servicio para realizar el update
   * del estado kamban.
   * Le asigna a la variable global draggedTarea null.
   * 
   * @param {*} event vento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dropTareasTerminadas(event: any): void{
    this.drop();
    this.draggedTarea.estadoKamban = 3;
    this.updateEstadoKambas(this.draggedTarea);
    //this.tareasTerminadas.push(this.draggedTarea);  
    this.draggedTarea = null;
    
  }

   /**
   * Metodo de evento que se activa cuando el usuario levanta un item del drag and drop
   * almacendando todas sus propiedades el objecto obj de tipo @prop TareasDragModel 
   * y lo almacena en la variable de clase @prop draggedTarea para su posterior manipulacion en el 
   * modulo de tareas terminadas.
   * 
   * @param {*} event evento generado por el drag and drop
   * @param {TareasDragModel} obj objecto que es tomado por el usuario
   * @memberof KambanComponent
   */
  public dragStartTareasTerminadas(event: any,obj: TareasDragModel){
    this.draggedTarea = obj;
  }

  /**
   * Metodo que se ejecuta cuando el drop ya se a efectuado. Es el fin de la secuancia del drag and drop
   * Este metodo tiene la tarea de resetear la variable de clase @prop draggedTarea cuando comienza la accion 
   * en el modulo de tareas terminadas.
   * 
   * @param {*} event evento generado al terminar el drag and drop
   * @memberof KambanComponent
   */
  public dragEndTareasTerminadas(event: any): void{
    this.draggedTarea = null;
  }

  /**
   * Genera un los datos de forma asincrona para llenar los modulos de kamban llamando al servicio srvTareasDrag
   * de la clase TareasDragService.
   * Llama los los metdos:
   * * todasLasTareas genera la data para todas las tareas en base a al id del proyecto
   * * tareasPendientes genera la data para las tareas pendientes en base al id del proyecto
   * * tareasEnDesarrollo genera la data para las tareas en desarrollo en base al id del proyecto
   * * tareasTerminadas genera la data para las tareas terminadas en base al id del proyecto
   * Y le asigna el valor obtenido desde el servidor a las siguientes variables globales de la pagina
   * todasLasTareas
   * tareasPendientes
   * tareasEnDesarrollo
   * tareasTerminadas
   * 
   * @param {number} idProyecto 
   * @memberof KambanComponent
   */
  public generarDataKamban(idProyecto: number): void{
    //Llena la variable para todas las tareas
    this.srvTareasDrag.todasLasTareas(idProyecto).subscribe(
      resp=> {
        this.todasLasTareas = resp.body.data;
    });
    //Llena la variable para todas las tareas pendientes
    this.srvTareasDrag.tareasPendientes(idProyecto).subscribe(
      resp=> {
        this.tareasPendientes = resp.body.data;
    });
    //Llena la variable para todas las tareas en desarrollo
    this.srvTareasDrag.tareasEnDesarrollo(idProyecto).subscribe(
      resp=> {
        this.tareasEnDesarrollo = resp.body.data;
    });
    //Llena la variable para las tareas terminadas.
    this.srvTareasDrag.tareasTerminadas(idProyecto).subscribe(
      resp=> {
        this.tareasTerminadas = resp.body.data;
    });
  }
  /**
   * Llama al metodo updateEstadoKamban donde se le pasa un objeto de tipo TareasDragModel
   * del servicio srvTareasDrag que se encuentra en la clase TareasDragService donde se ejecuta una
   * llamada asincrona para realizar un update en el servidor.
   * al momento de realizar el update, realiza una actualizacion de los modulos del kambas despues
   * de objtener la respuesta desde el servidor.
   * 
   * @param {TareasDragModel} obj objecto de tipo TareasDragModel que se utilizara para el update
   * del estado kamban,
   * @memberof KambanComponent
   */
  public updateEstadoKambas(obj :TareasDragModel): void{
    this.srvTareasDrag.updateEstadoKamban(obj).subscribe(resp=> {
      this.resetKamban();
    });
  }
  /**
   * Metodo para realizar la carga generica de las clases: 
   * positivo : Genera en las tareas de los modulos una barra verde que significa que la tarea
   * en cuanto a tiempo, porcentaje y estado del kamban, tiene tiempo a favor.
   * atrasado: Genera en las tareas de los modulos una barra roja que significa que la tarea
   * en cuanto a tiempo, porcentaje y estado del kamban sea 2 (en desarrollo), se encuentra atrasada.
   * iguales: Genera en las tareas de los modulos una barra azul que significa que la tarea se encuentra
   * en cuanto a tiempo, porcentaje iguales que el esperado, y que es estado kamban sea 3 (terminado)
   * Genera un string que sera tomado por la directiva NgClass para la asignacion dinamica.
   * 
   * @param {TareasDragModel} obj objeto con propiedades las cuales seran comparadas para generar 
   * el cambio de clases dinamico
   * @returns {string} retorna la clase en forma de string
   * @memberof KambanComponent
   */
  public dinamicClassAdvancePercentage(obj: TareasDragModel): string{
    if(obj.estadoKamban != 3) {
      if(obj.porcentajeReal > obj.porcentajeEsperado){
        return 'positivo';
      }else if (obj.porcentajeReal < obj.porcentajeEsperado){
        return 'atrasado';
      }else{
        if(obj.porcentajeReal == 100 || obj.estadoKamban == 3){
          return 'iguales';
        }else {
          if(this.hoy > obj.fechaTermino){
            return 'atrasado';
          }else{
            return 'positivo';
          }
        }
      }  
    }else{
      return 'iguales';
    }
  }

  /**
   * Metodo de utilidad que genera un reset a los modulos del kamban tanto en el componente 
   * KambanComponent y todos los componentes que deseen utilizar este reset.
   * 
   * @memberof KambanComponent
   */
  public resetKamban(): void{
    this.generarDataKamban(this.routerParamId);
  }

  /**
   * Metodo que obtiene el porcentaje de avance actual de la tarea en progreso.
   * Levanta un modal para la edicion del porcentaje de la tarea.
   * 
   * 
   * @param {*} obj objeto del kamban que se desea modificar la tarea.
   * @memberof KambanComponent
   */
  public obtenerPorcentajeAvance(obj: any): void {
    this.porcentajeAvanzado = obj.porcentajeReal;
    this.idTarea = obj.idTarea;
    this.idProyecto = obj.idProyecto;
    this.displayDialogoPorcentaje = true;
  }

  /**
   * Evento que updata los porcentajes de las tareas.
   * Llama al servicio updatePorcentajeKambanTarea de la clase TaskService
   * 
   * @memberof KambanComponent
   */
  public updateAvanceTarea(): void {
    this.srvTareas.updatePorcentajeKambanTarea(this.porcentajeAvanzado,this.idTarea,this.idProyecto).subscribe(
      resp => {
        this.displayDialogoPorcentaje = false;
        this.resetKamban();
      }
    );
  }
}
