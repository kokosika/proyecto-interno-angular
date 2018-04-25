import { Injectable } from "@angular/core";
import { BaseService } from "../base.services";
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { GenericResponseModel } from "../../@model/generic-response.model";

@Injectable()
export class VigRiesgoService extends BaseService {
    actionUrl = 'vigriesgos';
    constructor(protected http: HttpClient) { super(http) }

    public comboVigRiesgo() : Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, null);
    }
}