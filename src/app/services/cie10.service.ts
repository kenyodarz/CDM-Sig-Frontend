// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { CIE10 } from '../models/CIE10';

@Injectable({
  providedIn: 'root'
})
export class Cie10Service extends CommonService<CIE10, string> {

  constructor(http: HttpClient) {
    super(http)
   }
   
}
