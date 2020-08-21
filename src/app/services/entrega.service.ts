// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { EntregaDyE } from '../models/EntregaDyE';

@Injectable({
  providedIn: 'root',
})
export class EntregaService extends CommonService<EntregaDyE, number> {
  constructor(http: HttpClient) {
    super(http);
  }
}
