// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Empleado } from '../models/Empleado'

const API_URL: string = 'http://localhost:8080/api/empleados/';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(API_URL + 'all');
  }

  save(empleado: Empleado): Observable<Empleado> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Empleado>(API_URL + 'save', JSON.stringify(empleado), {
      headers: headers,
    });
  }

  delete(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(API_URL + 'delete/' + id);
  }
}
