// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { CajaComFamiliar } from '../models/CajaComFamiliar';

@Injectable({
  providedIn: 'root',
})
export class CajaComFamiliarService extends CommonService<CajaComFamiliar, number>{
  protected API_URL: string = 'http://localhost:8080/api/caja/';

  constructor(http: HttpClient) {
    super(http);
  }
}
