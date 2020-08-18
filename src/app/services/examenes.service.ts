// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Examen } from '../models/Examen';

@Injectable({
  providedIn: 'root',
})
export class ExamenesService extends CommonService<Examen, number> {
  protected API_URL: string = 'http://localhost:8080/api/examenes/';
  constructor(http: HttpClient) {
    super(http);
  }

  buscarExamenesPorEmpleado(cedula: string): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.API_URL + 'empleado/' + cedula);
  }
}
