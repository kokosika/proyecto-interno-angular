import { AvanceModel } from './../../@model/custom/avances.model';
import { BaseService } from './../base.services';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class AvancesService extends BaseService{
    actionUrl = 'avances';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param avance
     */
    public getAllAvances(id: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }

    public getDiasAtraso(id: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/getdiasatraso', id);
    }

    public saveAvances(avance: AvanceModel): Observable<HttpResponse<GenericResponseModel>>{
        return this.Post('insertavances', avance);
    }

    public updateAvance(avance: AvanceModel):Observable<HttpResponse<GenericResponseModel>>{
        return this.Post('updateavances',avance);
    }

      /**
     * 
     * @param id 
     */
    public deleteAvance(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl +'/deleteavance', id);
    }

    public getAvancesProyectosPorEstadoPorcentaje() :Observable<HttpResponse<GenericResponseModel>> {
        return this.Get(this.actionUrl + '/atrasos-aldia' , null);
    }

    public getAvancesProyectosAtrasadosDetalle() :Observable<HttpResponse<GenericResponseModel>> {
        return this.Get(this.actionUrl + '/atrasos-detalle' , null);
    }


}