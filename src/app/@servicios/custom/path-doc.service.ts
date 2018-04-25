import { Observable } from 'rxjs/Observable';
import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class PathDocService extends BaseService {
    actionUrl = 'path-doc';
    constructor(protected http: HttpClient) { super(http) }


    public getAllPathsDocXML(id: number){
        return this.PostXML(this.actionUrl + '/xml' , id);        
    }

    public getAllPathsDocMPP(id: number): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/mpp' , id);        
    }

    public getNombreMimeProyecto(id: number):Observable<HttpResponse<GenericResponseModel>> {
        return this.Get(this.actionUrl+'/nombre', id);
    }


}