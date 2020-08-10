// Angular
import { Injectable } from '@angular/core';
// Servicio Generico
import { CommonService } from './common.service';
// Modelo
import { Capacitacion } from '../models/Capacitacion';

@Injectable({
  providedIn: 'root',
})
export class CapacitacionService extends CommonService<Capacitacion, number> {
  protected API_URL: string = 'http://localhost:8080/api/capacitaciones/';
}
