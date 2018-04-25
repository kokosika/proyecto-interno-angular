import { BaseService } from './../base.services';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserModel } from '../../@model/custom/user.model';
import { Observable } from 'rxjs/Observable';
import { GenericResponseModel } from '../../@model/generic-response.model';

@Injectable()
export class UserService extends BaseService {
    actionUrl = 'user';
    constructor(protected http: HttpClient) { super(http) }

    /**
     * 
     * @param user 
     */
    public validateLogin(user: UserModel): Observable<HttpResponse<GenericResponseModel>>{
        return this.Post(this.actionUrl + '/login',user);        
    }

    public comboAllUsuarios() : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, null);
    } 

    public comboUsuariosContraparte() : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl + '/get-usuarioscontraparte', null);
    }

}