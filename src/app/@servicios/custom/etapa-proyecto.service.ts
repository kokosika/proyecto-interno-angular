import { GenericResponseModel } from './../../@model/generic-response.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EtapaProyectoService extends BaseService {
    actionUrl = 'etapa-proyecto';
    constructor(protected http: HttpClient) { super(http) }

    public getAllEtapaProyecto () : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, null);
    }

}