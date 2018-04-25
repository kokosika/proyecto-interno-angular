import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BaseService } from "../base.services";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { IfObservable } from "rxjs/observable/IfObservable";
import { GenericResponseModel } from "../../@model/generic-response.model";

@Injectable()
export class ClienteService extends BaseService{
    actionUrl = 'clientes';
    constructor(protected http: HttpClient) { super(http) }
    /**
     * 
     * @param cliente
     */
    public getInfoCliente(id: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.Get(this.actionUrl, id);
    }

    public getClientePorcentajeProyecto():  Observable<HttpResponse<GenericResponseModel>> {
        return this.Get(this.actionUrl + '/cliente-porcentaje-proyecto', null);
    }

    public getComboCliente(): Observable<HttpResponse<GenericResponseModel>> {
        return this.Get(this.actionUrl + '/combo-cliente', null);
    }

    public getClientePorentajeEtapasProyecto(idCliente: string, idContraparte: string): Observable<HttpResponse<GenericResponseModel>>{
        return this.http.get<GenericResponseModel>(
            this.urlServer + this.actionUrl + '/cliente-etapa-proyecto',
            { observe: 'response' , params : { idCliente: idCliente , idContraparte : idContraparte }});
        //return this.Get(this.actionUrl + '/cliente-etapa-proyecto', null);
    }
}