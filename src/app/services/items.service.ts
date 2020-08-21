// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root',
})
export class ItemsService extends CommonService<Item, number> {
  protected API_URL: string = 'http://localhost:8080/api/items/';
  constructor(http: HttpClient) {
    super(http);
  }
}
