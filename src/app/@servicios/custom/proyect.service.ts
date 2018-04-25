import { GenericResponseModel } from './../../@model/generic-response.model';
import { Observable } from 'rxjs/Observable';
import { ProyectModel } from './../../@model/custom/proyect.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';

@Injectable()
export class ProyectService extends BaseService {
    actionUrl = 'proyect';
    constructor(protected http: HttpClient) { super(http) }

    
    public getAllProyect(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, null);        
    }

    public getPorcentProyect(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl+ '/porcent', id);        
    }

    public getInfoproyecto(id: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get('proyectoinfo', id);
    }

    public getComboAllProyect(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/get-combo', null);    
    }

    public guardarProyecto(proyecto: ProyectModel):Observable<HttpResponse<GenericResponseModel>>{
        return this.Post(this.actionUrl, proyecto);
    }

    public rangoFechasTodosLosProyectos():Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/get-rango-fecha', null);
    }
}