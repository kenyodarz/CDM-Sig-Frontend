// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Incapacidad } from '../models/Incapacidad';

@Injectable({
  providedIn: 'root',
})
export class IncapacidadService extends CommonService<Incapacidad, number> {
  protected API_URL: string =
    'http://app.cdmservicios.com/sigcdm-backend/api/incapacidades/';
  // protected API_URL: string = 'http://localhost:8080/api/incapacidades/';
  constructor(http: HttpClient) {
    super(http);
  }
  buscarIncapacidadesporEmpleado(cedula: string): Observable<Incapacidad[]> {
    return this.http.get<Incapacidad[]>(this.API_URL + 'empleado/' + cedula);
  }
}
