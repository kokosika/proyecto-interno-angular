import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BaseService } from "../base.services";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { GenericResponseModel } from "../../@model/generic-response.model";

@Injectable()
export class ProbRiesgoService extends BaseService {
    actionUrl = 'probriesgos';
    constructor(protected http: HttpClient) { super(http) }

    public comboProbRiesgo() : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, null);
    }
}