// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { Arl } from '../models/Arl';

@Injectable({
  providedIn: 'root',
})
export class ArlService extends CommonService<Arl, number>{
  protected API_URL: string = 'http://localhost:8080/api/arl/';

  constructor(http: HttpClient) {
    super(http);
  }
}
