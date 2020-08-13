// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Capacitacion } from '../models/Capacitacion';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root',
})
export class CapacitacionService extends CommonService<Capacitacion, number> {
  protected API_URL: string = 'http://localhost:8080/api/capacitaciones/';
  constructor(http: HttpClient) {
    super(http);
  }
  ver(idCapacitacion: number): Observable<Capacitacion> {
    return this.http.get<Capacitacion>(this.API_URL + idCapacitacion);
  }

  asignarEmpleados(
    capacitacion: Capacitacion,
    empleados: Empleado[]
  ): Observable<Capacitacion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Capacitacion>(
      this.API_URL + capacitacion.idCapacitacion + '/asignar-empleados',
      empleados,
      { headers: headers }
    );
  }
  eliminarEmpleados(
    capacitacion: Capacitacion,
    empleado: Empleado
  ): Observable<Capacitacion> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<Capacitacion>(
      this.API_URL + capacitacion.idCapacitacion + '/eliminar-empleados',
      empleado,
      { headers: headers }
    );
  }
  buscarEmpleadoPorID(cedula: string): Observable<Capacitacion[]> {
    return this.http.get<Capacitacion[]>(this.API_URL + 'empleado/' + cedula);
  }
}
