import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base.services';
import { Observable } from 'rxjs/Observable';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class AssignamentService extends BaseService {
    actionUrl = 'ocupation';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param user 
     */
    public getAllOccupation(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }

    /**
     * 
     * @param user 
     */
    public getAllOccupationAll(obj: any): Observable<HttpResponse<GenericResponseModel>>{
        return this.Post(this.actionUrl + '/get-all', obj);
    }

     /**
     * 
     * @param user 
     */
    public getAssePorcForUser(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get('assignament', id);
    }

    public getAssePorcForUserAll(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get('assignament/get-all',null);
    }
}