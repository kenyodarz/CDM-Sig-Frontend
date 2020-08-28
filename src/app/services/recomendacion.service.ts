// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Recomendacion } from '../models/Recomendacion';

@Injectable({
  providedIn: 'root',
})
export class RecomendacionService extends CommonService<Recomendacion, number> {
  protected API_URL: string = 'http://localhost:8080/api/recomendaciones/';
  constructor(http: HttpClient) {
    super(http)
  }
}
