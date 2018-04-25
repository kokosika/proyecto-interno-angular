import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class ContraparteService extends BaseService {

    actionUrl = 'contraparte';
    constructor(protected http: HttpClient) { super(http) }

    public getComboContraparte(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl+ '/combo-contraparte' , id);
    } 
}