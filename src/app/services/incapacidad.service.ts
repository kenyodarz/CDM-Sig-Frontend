// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { Incapacidad } from '../models/Incapacidad';

@Injectable({
  providedIn: 'root'
})
export class IncapacidadService extends CommonService<Incapacidad,number> {

  constructor(http: HttpClient) {
    super(http)
   }
}
