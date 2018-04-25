import { GenericResponseModel } from './../../@model/generic-response.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.services';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class OccupationService extends BaseService {
    actionUrl = 'ocupation';
    constructor(protected http: HttpClient) { super(http) }

    
    public getComboAllOccupation(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl+ '/get-combo', null);        
    }

    public getConsultarCargos(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl+ '/get-consultar', id);        
    }



}