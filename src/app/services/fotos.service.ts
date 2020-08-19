// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Foto } from '../models/Foto';

const API_URL: string = 'http://localhost:8080/api/fotos/';

@Injectable({
  providedIn: 'root',
})
export class FotosService {
  constructor(private http: HttpClient) {}
  save(idFoto: string, archivo: File): Observable<Foto> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('idFoto', idFoto);
    return this.http.post<Foto>(API_URL + 'save', formData);
  }
}
