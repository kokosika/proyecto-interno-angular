import { TareasDragModel } from './../../@model/custom/tareas-drag.model';
import { GenericResponseModel } from './../../@model/generic-response.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TareasDragService extends BaseService {
    actionUrl = 'tareas-drag';
    constructor(protected http: HttpClient) { super(http) }

    public todasLasTareas (idProyecto : number) : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/todas', idProyecto);
    }

    public tareasPendientes (idProyecto : number) : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/pendientes', idProyecto);
    }

    public tareasEnDesarrollo (idProyecto : number) : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/desarrollo', idProyecto);
    }

    public tareasTerminadas (idProyecto : number) : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/terminadas', idProyecto);
    }

    public updateEstadoKamban(obj :TareasDragModel) : Observable<HttpResponse<GenericResponseModel>> {
        return this.Post(this.actionUrl + '/update-estado',obj);
    }
}