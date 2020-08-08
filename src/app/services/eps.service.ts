// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Eps } from '../models/Eps'

const API_URL: string = 'http://localhost:8080/api/eps/';

@Injectable({
  providedIn: 'root',
})
export class EpsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Eps[]> {
    return this.http.get<Eps[]>(API_URL + 'all');
  }

  save(empleado: Eps): Observable<Eps> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Eps>(API_URL + 'save', JSON.stringify(empleado), {
      headers: headers,
    });
  }

  delete(id: number): Observable<Eps> {
    return this.http.get<Eps>(API_URL + 'delete/' + id);
  }
}
