import { TareaNoProgramada } from './../../@model/custom/tarea-no-programada';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.services';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class TareaNoProgramadaService extends BaseService {

    actionUrl = 'tarea-no-programada';
    constructor(protected http: HttpClient) { super(http) }

    public getTodasLasNoTareas(): Observable<HttpResponse<GenericResponseModel>> {
        return this.Get(this.actionUrl, null);
    }
    
    public guardarNoTareas(obj : TareaNoProgramada): Observable<HttpResponse<GenericResponseModel>>{
        return this.Post(this.actionUrl, obj);
    }
}