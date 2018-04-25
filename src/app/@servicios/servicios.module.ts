import { ContraparteService } from './custom/contraparte.service';
import { TareasDragService } from './custom/tareas-drag.service';
import { EtapaProyectoService } from './custom/etapa-proyecto.service';
import { AssignamentService } from './custom/assignament.services';
import { UserService } from './custom/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProyectService } from './custom/proyect.service';
import { TaskService } from './custom/task.service';
import { OccupationService } from './custom/occupation.service';
import { PathDocService } from './custom/path-doc.service';
import { TareaNoProgramadaService } from './custom/tarea-no-programada.service';
import { RiesgosService } from './custom/riesgos.service';
import { AvancesService } from './custom/avances.service';
import { ClienteService } from './custom/cliente.service';
import { NextActivitiesService } from './custom/next-activities.service';
import { ProbRiesgoService } from './custom/prob-riesgo.service';
import { VigRiesgoService } from './custom/vig-riesgo.service';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
import { RiesgosComponent } from '../@core/riesgos/riesgos.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [],
    providers: [
        UserService,
        NextActivitiesService,
        ProyectService,
        TaskService,
        ClienteService,
        ProbRiesgoService,
        VigRiesgoService,
        AssignamentService,
        OccupationService,
        PathDocService,
        TareaNoProgramadaService,
        EtapaProyectoService,
        TareasDragService,
	    RiesgosService,
        AvancesService,
        ContraparteService
    ],
})
export class ServicesModule {}