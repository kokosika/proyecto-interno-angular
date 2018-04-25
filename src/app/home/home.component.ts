import { AvancesService } from './../@servicios/custom/avances.service';
import { ContraparteService } from './../@servicios/custom/contraparte.service';
import { ClienteService } from './../@servicios/custom/cliente.service';
import { ProyectService } from './../@servicios/custom/proyect.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location, NumberFormatStyle, getLocaleNumberFormat, PercentPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../@servicios/custom/user.service';
import { ComboModel } from '../@model/util/combo.model';
import { TaskService } from '../@servicios/custom/task.service';
import { TareaNoProgramadaService } from '../@servicios/custom/tarea-no-programada.service';
import { TareaNoProgramada } from '../@model/custom/tarea-no-programada';
import { EtapaProyectoService } from '../@servicios/custom/etapa-proyecto.service';
import { EtapaProyectoModel } from '../@model/custom/etapa-proyecto.model';
import { DatePipe } from '@angular/common';
import { ClientePorcentajeProyectoModel } from '../@model/custom/cliente-porcentaje-proyecto.model';
import { GraficosModel } from '../@model/util/graficos.model';
import { ProyectModel } from '../@model/custom/proyect.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public proyectos: any[];
  public tareas: any[];
  public otrasTareas: any[];
  private seleccionCliente: any;
  private seleccionContraparte: any;
  public cols: any[];
  public avancesData: ProyectModel[];
  rFormInsert: FormGroup;
  displayInsert = false;
  usuarios: ComboModel[];
  comboClientes: ComboModel[];
  comboContraparte: ComboModel[];
  graficoClientePorProyectos: any;
  graficoClientePorEtapas: any;
  graficoAvances:any; 
  es: any;
  comboData: any[];
  opcionesGrafico: any;
  constructor(
    private fb: FormBuilder,
    private srvUser: UserService,
    private srvProyecto: ProyectService,
    private srvTarea: TaskService,
    private srvTareaNoProg: TareaNoProgramadaService,
    private srvEtapaProyecto: EtapaProyectoService,
    private srcClienteInfo: ClienteService,
    private srvContraparte: ContraparteService,
    private srvAvances: AvancesService,
    private router:Router,
  ) {
    this.rFormInsert = this.fb.group({
      usuarioReceptor: [null, Validators.compose([Validators.required])],
      mensaje: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      fechaTermino: [null, Validators.compose([Validators.required])]
    });
    this.llenarCombos();
  }

  ngOnInit() {
    this.seleccionCliente = null;
    this.seleccionContraparte = null;
    this.graficoClientePorProyecto();
    this.graficoClientesPorEtapas(this.seleccionCliente,this.seleccionContraparte);
    this.graficoAvance();
    this.cols = [
      { field: 'nombreProyecto', header: 'Nombre Proyecto' },
      { field: 'userJP', header: 'Jefe Proyecto' }
    ];
    this.srvAvances.getAvancesProyectosAtrasadosDetalle().subscribe(
      resp => {
        this.avancesData = resp.body.data;
      }
    );
    this.opcionesGrafico = {
      legend: {
        position: 'bottom'
      }
    };
    this.llenarTareas();  
    this.configuracionIdiomaCalendario();  
  }

  llenarCombos() {
    this.srvUser.comboAllUsuarios().subscribe(resp => {
      this.usuarios = resp.body.data;
    });
    this.comboContraparte = [];
    this.srcClienteInfo.getComboCliente().subscribe(resp => {
      this.comboClientes = resp.body.data;
    });
  }

  private configuracionIdiomaCalendario(){
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado'
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic'
      ],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }

  llenarTareas() {
    this.srvProyecto.getAllProyect().subscribe(resp => {
      this.proyectos = resp.body.data;
    });
    this.srvTarea.getAllTareas().subscribe(resp => {
      this.tareas = resp.body.data;
    });
    this.srvTareaNoProg.getTodasLasNoTareas().subscribe(resp => {
      this.otrasTareas = resp.body.data;
    });
  }

  mostrarDialogo() {
    this.displayInsert = true;
  }

  save(obj: any) {
    let receptores = [];
    receptores = obj.usuarioReceptor;
    receptores.map(item => {
      console.log(item.code);
      const tarea = new TareaNoProgramada();
      tarea.mensaje = obj.mensaje;
      tarea.usuarioReceptor = item.code;
      tarea.usuarioEnviante = 1;
      tarea.fechaTermino = obj.fechaTermino;
      this.srvTareaNoProg.guardarNoTareas(tarea).subscribe(resp => {
        console.log(resp);
        this.rFormInsert.reset();
        this.llenarTareas();
      });
    });

    this.displayInsert = false;
  }
  onChangeCliente(value: any): void{    
    let cliente: string = null;
    cliente = (value == null)? null : value.code;
    this.seleccionCliente = cliente;
    this.graficoClientesPorEtapas(this.seleccionCliente, this.seleccionContraparte);
    this.srvContraparte.getComboContraparte(this.seleccionCliente).subscribe(
      resp => {
        this.comboContraparte  = resp.body.data;
      }
    );
  }

  onChangeContraparte(value: any): void{
    let contraparte: string = null;
    contraparte = (value == null)? null : value.code;
    this.seleccionContraparte = contraparte;
    this.graficoClientesPorEtapas(this.seleccionCliente, this.seleccionContraparte);
  }


  private graficoClientePorProyecto(): void{
    this.srcClienteInfo.getClientePorcentajeProyecto().subscribe(resp => {     
      let clienteInfoArray: ClientePorcentajeProyectoModel [];  
      let labelChar = [];
      let clienteInfoPorcentaje = [];
      let color = [];
      clienteInfoArray = resp.body.data;
      clienteInfoArray.map((items) => {
        labelChar.push(items.nombreCliente);
        clienteInfoPorcentaje.push(items.porcentaje.toFixed(0));
        color.push('#'+Math.random().toString(16).slice(-6));
      });      
      this.graficoClientePorProyectos = {
        labels: labelChar,
        datasets: [
          {
            data: clienteInfoPorcentaje,
            backgroundColor: color,
            hoverBackgroundColor: color
          }
        ]
      };
    });
  }

  private graficoClientesPorEtapas(idCliente: string, idContraparte: string): void{
    this.srcClienteInfo.getClientePorentajeEtapasProyecto(idCliente, idContraparte).subscribe(resp => {     
      let clienteInfoArray: ClientePorcentajeProyectoModel [];  
      let labelChar = [];
      let clienteInfoPorcentaje = [];
      let color = [];
      clienteInfoArray = resp.body.data;
      clienteInfoArray.map((items) => {
        labelChar.push(items.nombreCliente);
        if (Number.parseInt(items.porcentaje.toFixed(0)) != 0) {
          clienteInfoPorcentaje.push(items.porcentaje.toFixed(0));
        }
        color.push('#'+Math.random().toString(16).slice(-6));
      });      
      this.graficoClientePorEtapas = {
        labels: labelChar,
        datasets: [
          {
            data: clienteInfoPorcentaje,
            backgroundColor: color,
            hoverBackgroundColor: color
          }
        ]
      };
    });
  }

  private graficoAvance(): void{
    this.srvAvances.getAvancesProyectosPorEstadoPorcentaje().subscribe(resp => {     
      let clienteInfoArray: GraficosModel [];  
      let labelChar = [];
      let clienteInfoPorcentaje = [];
      let color = [];
      clienteInfoArray = resp.body.data;
      clienteInfoArray.map((items) => {
        labelChar.push(items.labels);
        if (Number.parseInt(items.porcentaje.toFixed(0)) != 0) {
          clienteInfoPorcentaje.push(items.porcentaje.toFixed(0));
        }
        color.push('#'+Math.random().toString(16).slice(-6));
      });      
      this.graficoAvances = {
        labels: labelChar,
        datasets: [
          {
            data: clienteInfoPorcentaje,
            backgroundColor: color,
            hoverBackgroundColor: color
          }
        ]
      };
    });
  }
  public verProyecto(obj: any){
    this.router.navigate(['core/view-task/' + obj.idProyecto + '/' + obj.fechaInicio + '/' + obj.fechaFin ]);
  }
}
