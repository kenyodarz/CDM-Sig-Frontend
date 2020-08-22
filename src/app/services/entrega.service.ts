// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { EntregaDyE } from '../models/EntregaDyE';
import { Item } from '../models/Item';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EntregaService extends CommonService<EntregaDyE, number> {
  protected API_URL: string = 'http://localhost:8080/api/entregas/';
  constructor(http: HttpClient) {
    super(http);
  }
  agregarItems(entrega: EntregaDyE, items: Item[]): Observable<EntregaDyE> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<EntregaDyE>(
      this.API_URL + entrega.idEntregaDyE + '/items/cargar',
      items,
      { headers: headers }
    );
  }
  eliminarItem(id: number, item: Item): Observable<EntregaDyE> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put<EntregaDyE>(
      this.API_URL + id + '/items/eliminar',
      item,
      { headers: headers }
    );
  }
}
