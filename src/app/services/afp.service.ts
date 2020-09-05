// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { Afp } from '../models/Afp';

@Injectable({
  providedIn: 'root',
})
export class AfpService extends CommonService<Afp, string> {
  protected API_URL: string =
    'http://app.cdmservicios.com/sigcdm-backend/api/afp/';
  // protected API_URL: string = 'http://localhost:8080/api/afp/';

  constructor(http: HttpClient) {
    super(http);
  }
}
