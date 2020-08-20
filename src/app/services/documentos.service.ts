// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Documento } from '../models/Documento';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService extends CommonService<Documento, number> {
  protected API_URL: string = 'http://localhost:8080/api/documentos/';

  constructor(http: HttpClient) {
    super(http);
  }

  saveFile(documento: Documento, archivo: File): Observable<Documento> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('tipo', documento.tipo);
    formData.append('nombre', documento.nombre);
    formData.append('empleado', null);
    return this.http.post<Documento>(
      this.API_URL + 'save-file/' + documento.empleado.cedula,
      formData
    );
  }

  getFilesByEmpleados(cedula: string): Observable<Documento[]>{
    return this.http.get<Documento[]>(this.API_URL + 'empleado/' + cedula);
  }
}
