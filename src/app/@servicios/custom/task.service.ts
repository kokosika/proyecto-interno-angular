import { GenericResponseModel } from './../../@model/generic-response.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService extends BaseService {
    actionUrl = 'tasks';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param user 
     */
    public getAllTask(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }

    /**
     * 
     * @param user 
     */
    public getAllTareas(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl +  '/all',null);
    }

    /**
     * 
     * 
     * @param {number} porcentaje 
     * @param {string} idTarea 
     * @param {number} idProyecto 
     * @returns {Observable<HttpResponse<GenericResponseModel>>} 
     * @memberof TaskService
     */
    public updatePorcentajeKambanTarea(porcentaje: number ,idTarea: string ,idProyecto: number): Observable<HttpResponse<GenericResponseModel>>{
        const data = {porcAvanceTarea: porcentaje , idTarea: idTarea, idProyecto : idProyecto }
        return this.http.post<GenericResponseModel>(
            this.urlServer + this.actionUrl + '/update-porcentaje-tarea',
            JSON.stringify(data),
            { observe : 'response', headers: this.headers});
    }
}