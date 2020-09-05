// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { Contrato } from '../models/Contrato';


@Injectable({
  providedIn: 'root',
})
export class ContratoService extends CommonService<Contrato, number> {
  protected API_URL: string =
    'http://app.cdmservicios.com/sigcdm-backend/api/contratos/';
  // protected API_URL: string = 'http://localhost:8080/api/contratos/';

  constructor(http: HttpClient) {
    super(http);
  }
}
