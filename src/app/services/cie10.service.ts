// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { CIE10 } from '../models/CIE10';

@Injectable({
  providedIn: 'root',
})
export class Cie10Service extends CommonService<CIE10, string> {
  protected API_URL: string =
    'http://app.cdmservicios.com/sigcdm-backend/api/cie10/';
  // protected API_URL: string = 'http://localhost:8080/api/cie10/';
  constructor(http: HttpClient) {
    super(http);
  }
}
