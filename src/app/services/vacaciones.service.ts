// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Vacaciones } from '../models/Vacaciones';
import { Contrato } from '../models/Contrato';
@Injectable({
  providedIn: 'root',
})
export class VacacionesService extends CommonService<Vacaciones, number> {
  protected API_URL: string = 'http://localhost:8080/api/vacaciones/';
  constructor(http: HttpClient) {
    super(http);
  }
  buscarVacacionesPorEmpleado(cedula: string): Observable<Vacaciones[]> {
    return this.http.get<Vacaciones[]>(this.API_URL + 'empleado/' + cedula);
  }
  buscarVacacionesTomadasPorEmpleado(contrato: Contrato): Observable<number[]> {
    return this.http.get<number[]>(
      this.API_URL +
        'empleado/' +
        contrato.empleado.cedula +
        '/tomadas/' +
        contrato.idContrato
    );
  }
}
