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
export class AfpService extends CommonService<Afp, number>{
  protected API_URL: string = 'http://localhost:8080/api/afp/';

  constructor(http: HttpClient) {
    super(http);
  }
}
