import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvancesService } from '../../@servicios/custom/avances.service';
import { ActivatedRoute } from '@angular/router';
import { AvanceModel } from '../../@model/custom/avances.model';
import { ConfirmDialogModule, ConfirmationService, SharedModule } from 'primeng/primeng';
declare var jsPDF;


@Component({
    moduleId: module.id,
    selector: 'app-avances',
    templateUrl: './avance-proyecto.component.html',
    styleUrls: ['./avance-proyecto.component.css']
})
export class AvanceProyectoComponent implements OnInit {
    routerParamId: any;
    cols: any[];
    colsPDF: any[];
    data: any;
    options:any;
    avance: AvanceModel = new AvanceModel();
    rFormInsertAvance: FormGroup;
    rFormEditAvance: FormGroup;
    avances: AvanceModel[];
    displayDialogAvance: boolean;
    displayEditAvance: boolean;
    selectedAvance: AvanceModel;
    fechas = [];
    descripcion = [];
    porcentajeReal = [];
    porcentajeEsperado = [];
      /**
   * constructor
   * @param fb form builder
   * @param srvAvance type user service
   */
    constructor(private fb: FormBuilder,
        private srvAvance: AvancesService,
        private confi: ConfirmationService,
    private route: ActivatedRoute ) {
    this.route.params.subscribe( 
        params => {
            this.routerParamId =  params.id;
            this.getAvances();
        }
        
    );

    this.rFormInsertAvance = this.fb.group({
            fechaAvance: [null],
        porcentajeAvance: [null],
        porcentajeEsperado: [null],
            descripcion: [null],
            diasAtraso: [null]
  });

  this.rFormEditAvance = this.fb.group({
    idAvanceProyecto: [null],
            fechaAvance: [null],
    porcentajeAvance: [null],
    porcentajeEsperado: [null],
            descripcion: [null],
            diasAtraso: [null]
});

    }
    getAvances(){
        this.srvAvance.getAllAvances(this.routerParamId).subscribe(resp => {
            this.avances = resp.body.data;
            this.porcentajeReal = [];
            this.porcentajeEsperado = [];
            this.fechas = [];
            this.avances.map((item) => {
                this.fechas.push(item.fechaAvance);
                console.log(item.porcentajeAvance);
                this.porcentajeReal.push(item.porcentajeAvance);
                this.porcentajeEsperado.push(item.porcentajeEsperado);
            });
            this.data = {
                labels: this.fechas,
                datasets: [
                    {
                        label: 'Avance Esperado',
                        data: this.porcentajeEsperado,
                        fill: false,
                        borderColor: '#4bc0c0'
            },
                    {
                        label: 'Avance Real',
                        data: this.porcentajeReal,
                        fill: false,
                        borderColor: '#565656'
                    }
                ]
            }
        });
     }
    ngOnInit() { 
        this.cols = [
            // { field: 'idAvanceProyecto', header: 'ID Avance' },
           // { field: 'idProyecto', header: 'ID Proyecto' },
            { field: 'fechaAvance', header: 'Fecha' },
            { field: 'porcentajeAvance', header: 'Porcentaje Avance' },
            { field: 'porcentajeEsperado', header: 'Porcentaje Esperado' },
            { field: 'descripcionAvance', header: 'Descripción' },
            { field: 'diasAtraso', header: 'Días Atraso' }
        ];
        this.colsPDF = [
            //  { dataKey: 'idAvanceProyecto', title: 'ID Riesgo' },
           // { field: 'idProyecto', header: 'ID Proyecto' },
            { dataKey: 'fechaAvance', title: 'Fecha' },
            { dataKey: 'porcentajeAvance', title: 'Porcentaje Avance' },
            { dataKey: 'porcentajeEsperado', title: 'Porcentaje Esperado' },
            { dataKey: 'descripcionAvance', title: 'Descripción' },
            { dataKey: 'diasAtraso', title: 'Días Atraso' }
        ]
    }

    showDialogToAddAvance() {
        this.rFormInsertAvance.reset();
        this.displayDialogAvance = true;
    }

    
/**
 * 
 * 
 * @param avance object from form
 */
saveAvance(avance: AvanceModel){
    avance.idProyecto = this.routerParamId;
    this.srvAvance.saveAvances(avance).subscribe(resp => {
        //this.getAll();
        this.getAvances();
        this.displayDialogAvance= false;
  });
}

/**
   * call update service type user
   * @param avance object from form
   */
updateAvance(avance: AvanceModel){
    avance.idProyecto = this.routerParamId;
    this.srvAvance.updateAvance(avance).subscribe(resp => {
        console.log("entra2");
      this.displayEditAvance = false;
      this.getAvances();
    });

    }

    /**
  * call delete service type user confirmation dialog
  * @param id for delete register
  */
    deleteConfir(id: number) {
        console.log(id);
        this.confi.confirm({
            message: '¿Desea eliminar el avance?',
            accept: () => {
                this.srvAvance.deleteAvance(id).subscribe(resp => {
                    this.getAvances();
                    console.log(resp.body);
                });
            }
        });
}

closeAvance(){
    this.displayDialogAvance = false;
    this.displayEditAvance = false;    
}


    downloadPDF(){
        var columns = this.colsPDF;
var rows = this.avances;
 
// Only pt supported (not mm or in) 
var doc = new jsPDF('landscape');
doc.autoTable(columns, rows);
doc.addPage();
doc.text(20, 20, 'Hello landscape world!');
doc.save('table.pdf');
    }

     /**
   * Selected row for table for edited
   * and show dialog edited
   * @param avance type user object
   */
  selectRowAvance(avance: AvanceModel){
    this.rFormEditAvance.controls['idAvanceProyecto'].setValue(avance.idAvanceProyecto);
        this.rFormEditAvance.controls['fechaAvance'].setValue(avance.fechaAvance);
      this.rFormEditAvance.controls['porcentajeAvance'].setValue(avance.porcentajeAvance);
      this.rFormEditAvance.controls['porcentajeEsperado'].setValue(avance.porcentajeEsperado);
      this.rFormEditAvance.controls['descripcion'].setValue(avance.descripcionAvance);
        this.rFormEditAvance.controls['diasAtraso'].setValue(avance.diasAtraso);
      this.displayEditAvance = true;
  }


}