import { Injectable } from "@angular/core";
import { BaseService } from "../base.services";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { GenericResponseModel } from "../../@model/generic-response.model";
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NextActivitiesService extends BaseService{
    actionUrl = 'nextactivities';
    constructor(protected http: HttpClient) { super(http) }

    public getAllNextActivitiesProyecto (id: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }
}