import { RiesgoModel } from './../../@model/custom/riesgos.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.services';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class RiesgosService extends BaseService {
    actionUrl = 'riesgos';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param riesgo 
     */
    public getAllRiesgos(id: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }
    public getAllUserDropList(): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get('alluser', null);
    }
    public saveRiesgos(riesgo: RiesgoModel): Observable<HttpResponse<GenericResponseModel>>{
        return this.Post('insertriesgos', riesgo);
    }
    public updateRiesgos(riesgo: RiesgoModel):Observable<HttpResponse<GenericResponseModel>>{
        return this.Post('updateriesgos',riesgo);
    }
     /**
     * 
     * @param id 
     */
    public deleteRiesgo(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl +'/deleteriesgo', id);
    }


}