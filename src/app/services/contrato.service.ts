// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Contrato } from '../models/Contrato';


@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  protected API_URL: string = 'http://localhost:8080/api/contratos/';

  constructor(private http: HttpClient){}

  getAll(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.API_URL + 'all');
  }

  save(entity: Contrato): Observable<Contrato> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Contrato>(this.API_URL + 'save', JSON.stringify(entity), {
      headers: headers,
    });
  }

  delete(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(this.API_URL + 'delete/' + id);
  }
}
