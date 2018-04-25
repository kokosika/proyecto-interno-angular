import { Component, OnInit, Input } from '@angular/core';
import { RiesgoModel } from '../../@model/custom/riesgos.model';
import { RiesgosService } from '../../@servicios/custom/riesgos.service';
import { ActivatedRoute } from '@angular/router';
import { AllUserDropList } from '../../@model/custom/allUserDropList.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComboModel } from '../../@model/util/combo.model';
import { OccupationService } from '../../@servicios/custom/occupation.service';
import { UsuarioContraparteModel } from '../../@model/custom/usuario-contraparte.model';
import { UserService } from '../../@servicios/custom/user.service';
import { ProbRiesgoModel } from '../../@model/custom/prob-riesgo.model';
import { ProbRiesgoService } from '../../@servicios/custom/prob-riesgo.service';
import { VigRiesgoModel } from '../../@model/custom/vig-riesgo.model';
import { VigRiesgoService } from '../../@servicios/custom/vig-riesgo.service';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'app-riesgos',
    templateUrl: './riesgos.component.html',
    styleUrls: ['./riesgos.component.css']
})

export class RiesgosComponent implements OnInit {
    rFormInsert: FormGroup;
    comboJP: ComboModel[];
    comboPR: ProbRiesgoModel[];
    comboVG: VigRiesgoModel[];
    comboUC: UsuarioContraparteModel[];
    rFormEdit: FormGroup;
    displayDialog: boolean;
    displayEdit: boolean;
    newRiesgo: boolean;
    selectedRiesgo: RiesgoModel;
    riesgo: RiesgoModel = new RiesgoModel();
    riesgos: RiesgoModel[];
    allUserDrop: AllUserDropList[];
    routerParamId: any;
    cols: any[];

    /**
   * constructor
   * @param fb form builder
   * @param srvRiesgo type user service
   */

    constructor(private fb: FormBuilder,
        private srvRiesgo: RiesgosService,
        private srvProbRiesgo: ProbRiesgoService,
        private srvVigRiesgo: VigRiesgoService,
        private srvUser: UserService,
        private confi: ConfirmationService,
        private srvOccupation: OccupationService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe( 
            params => {
                this.routerParamId =  params.id;
                this.getRiesgos();
            }
            
        );

        this.rFormInsert = this.fb.group({
            idProyecto: [null],
            nombreRiesgo: [null],
            descripcionRiesgo: [null],
            planDMitigac: [null],
            planDAcuerdos: [null],
            idResponsable: [null],
            idProbRiesgo: [null],
            idVigRiesgo: [null]
      });

      this.rFormEdit = this.fb.group({
          idRiesgo:[null],
            idProyecto: [null],
            nombreRiesgo: [null],
            descripcionRiesgo: [null],
            planDMitigac: [null],
            planDAcuerdos: [null],
            idResponsable: [null],
            idProbRiesgo: [null],
            idVigRiesgo: [null]
      });
        
     }

     getRiesgos(){
        this.srvRiesgo.getAllRiesgos(this.routerParamId).subscribe(resp=>{
            this.riesgos = resp.body.data;
        });
     }

    ngOnInit() { 
        this.cols = [
            { field: 'nombreRiesgo', header: 'Nombre Riesgo' },
            { field: 'descripcionRiesgo', header: 'Descripción Riesgo' },
            { field: 'planDeMitigacion', header: 'Plan de Mitigación' },
            { field: 'planDeAcuerdos', header: 'Plan de Acuerdos' },
            { field: 'nombreResponsable', header: 'Responsable' },
            { field: 'cargo', header: 'Cargo' },
            { field: 'probabilidadRiesgo', header: 'Probabilidad Riesgo'},
            { field: 'vigenciaRiesgo', header: 'Vigencia Riesgo'}
        ];
        //this.srvRiesgo.getAllRiesgos(this.routerParamId).subscribe(resp=>{
            this.generateAllUserDropList();
            this.cargarCombos();
        this.cargarComboUC();
        this.cargarComboPR();
        this.cargarComboVR();
    }

    showDialogToAdd() {
        this.rFormInsert.reset();
        this.displayDialog = true;
    }


    /**
   * call save service type user
   * @param riesgo object from form
   */

    save(obj: any) {
        const risk = new RiesgoModel();
        const variableUC: string = obj.idResponsable.code;
        const lenghtVariableUC = variableUC.length;
        const variableU: string = variableUC.substring(0, (lenghtVariableUC - 1));
        const variableC: string = variableUC.substring((lenghtVariableUC - 1), (lenghtVariableUC));
       
        //risk.idRiesgo = obj.idRiesgo;
        risk.nombreRiesgo = obj.nombreRiesgo;
        risk.descripcionRiesgo = obj.descripcionRiesgo;
        risk.planDeMitigacion = obj.planDMitigac;
        risk.planDeAcuerdos = obj.planDAcuerdos;
        risk.idProyecto = obj.idProyecto = this.routerParamId;
        risk.nombreResponsable = variableU;
        risk.identTipoUsuario = variableC;
        risk.probabilidadRiesgo = obj.idProbRiesgo.idProbRiesgo;
        risk.vigenciaRiesgo = obj.idVigRiesgo.idVigRiesgo;

        //console.log(risk);

        this.srvRiesgo.saveRiesgos(risk).subscribe(resp => {
            //this.getAll();
            this.getRiesgos();
            this.displayDialog = false;
      });        
    }



    /**
   * call update service type user
   * @param riesgo object from form
   */
    update(obj: any) {
        const risk = new RiesgoModel();
        const variableUC: string = obj.idResponsable.code;
        const lenghtVariableUC = variableUC.length;
        const variableU: string = variableUC.substring(0, (lenghtVariableUC - 1));
        const variableC: string = variableUC.substring((lenghtVariableUC - 1), (lenghtVariableUC));


        risk.idRiesgo = obj.idRiesgo;
        risk.nombreRiesgo = obj.nombreRiesgo;
        risk.descripcionRiesgo = obj.descripcionRiesgo;
        risk.planDeMitigacion = obj.planDMitigac;
        risk.planDeAcuerdos = obj.planDAcuerdos;
        risk.idProyecto = obj.idProyecto = this.routerParamId;
        risk.nombreResponsable = variableU;
        risk.identTipoUsuario = variableC;
        risk.probabilidadRiesgo = obj.idProbRiesgo.idProbRiesgo;
        risk.vigenciaRiesgo = obj.idVigRiesgo.idVigRiesgo;
    
        // console.log(risk);

        this.srvRiesgo.updateRiesgos(risk).subscribe(resp => {
            // console.log("entra2");
      this.displayEdit = false;
      this.getRiesgos();
    });

    }

    /**
   * call delete service type user confirmation dialog
   * @param id for delete register
   */
  
   deleteConfir(id: number) {
        //console.log('entra');
        console.log(id);
      //  debugger
        this.confi.confirm({
            message: '¿Desea eliminar el riesgo?',
            accept: () => {
                this.srvRiesgo.deleteRiesgo(id).subscribe(resp => {
                    this.getRiesgos();
                    console.log(resp.body);
                });
            }
        });
    }
   

cargarCombos(){
    this.srvOccupation.getConsultarCargos(1).subscribe( resp => {
        this.comboJP = resp.body.data;
    });
}

    cargarComboUC() {
        this.srvUser.comboUsuariosContraparte().subscribe(resp => {
            this.comboUC = resp.body.data;
        });
    }

    cargarComboPR() {
        this.srvProbRiesgo.comboProbRiesgo().subscribe(resp => {
            this.comboPR = resp.body.data;
            console.log(this.comboPR);
        });
    }

    cargarComboVR() {
        this.srvVigRiesgo.comboVigRiesgo().subscribe(resp => {
            this.comboVG = resp.body.data;
        });
    }

    close() {
        this.displayDialog = false;
        this.displayEdit = false;
    }

    findSelectedCarIndex(): number {
        return this.riesgos.indexOf(this.selectedRiesgo);
    }

    generateAllUserDropList(){
        this.srvRiesgo.getAllUserDropList().subscribe(resp=>{
            this.allUserDrop = resp.body.data;
        });
    }

      /**
   * Selected row for table for edited
   * and show dialog edited
   * @param riesgo type user object
   */
  selectRow(riesgo: RiesgoModel) {
    this.rFormEdit.reset();
    this.rFormEdit.controls['idRiesgo'].setValue(riesgo.idRiesgo);
    this.rFormEdit.controls['idProyecto'].setValue(riesgo.idProyecto);
    this.rFormEdit.controls['nombreRiesgo'].setValue(riesgo.nombreRiesgo);
    this.rFormEdit.controls['descripcionRiesgo'].setValue(riesgo.descripcionRiesgo);
    this.rFormEdit.controls['planDMitigac'].setValue(riesgo.planDeMitigacion);
    this.rFormEdit.controls['planDAcuerdos'].setValue(riesgo.planDeAcuerdos);
        //public  idProbRiesgo: number;
        //public  nombProbRiesgo: string;
        //public code: any;
        //public nombreResponsable: String;
        //public idVigRiesgo: number;
        //public nombVigRiesgo: string;
        const paraProbRiesgo = { idProbRiesgo: riesgo.idProbRiesgo, nombProbRiesgo: riesgo.probabilidadRiesgo };

        const recibeUsuario = riesgo.idUsuario;
        const recibeTipoUsuario = riesgo.identTipoUsuario;
        const concatenarAmbasCadenas = recibeUsuario + recibeTipoUsuario;

        const paraUsuRespon = { code: concatenarAmbasCadenas, nombreResponsable: riesgo.nombreResponsable };

        const paraVigRiesgo = { idVigRiesgo: riesgo.idVigRiesgo, nombVigRiesgo: riesgo.vigenciaRiesgo }

        this.rFormEdit.controls['idResponsable'].setValue(paraUsuRespon);
        this.rFormEdit.controls['idProbRiesgo'].setValue(paraProbRiesgo);
        this.rFormEdit.controls['idVigRiesgo'].setValue(paraVigRiesgo);
    this.displayEdit = true;
    }

}

