// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
// Modelo
import { Empleado } from '../models/Empleado';

const API_URL: string = 'http://localhost:8080/api/empleados/';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(API_URL + 'all');
  }

  save(empleado: Empleado): Observable<Empleado> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<Empleado>(
      API_URL + 'save',
      JSON.stringify(empleado),
      {
        headers: headers,
      }
    );
  }

  delete(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(API_URL + 'delete/' + id);
  }

  crearConFoto(empleado: Empleado, archivo: File): Observable<Empleado> {
    const formData = new FormData();
    const date = new Date(empleado.fechaNacimiento);
    console.log(empleado);
    formData.append('archivo', archivo);
    formData.append('cedula', empleado.cedula);
    formData.append('nombres', empleado.nombres);
    formData.append('apellidos', empleado.apellidos);
    formData.append('genero', empleado.genero);
    formData.append('fechaNacimiento', date.toUTCString());
    formData.append('direccion', empleado.direccion);
    formData.append('telefono', empleado.telefono);
    formData.append('eps', empleado.eps['nit']);
    formData.append('afp', empleado.afp);
    formData.append('arl', empleado.arl);
    formData.append('cajaComFamiliar', empleado.cajaComFamiliar);
    formData.append('alergia', empleado.alergia);
    formData.append('medimentos', empleado.medimentos);
    formData.append('EnCasoEmergencia', empleado.enCasoEmergencia);
    return this.http.post<Empleado>(API_URL + 'save-with-photo', formData);
  }

  editarConFoto(empleado: Empleado, archivo: File): Observable<Empleado> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('cedula', empleado.cedula);
    formData.append('nombres', empleado.nombres);
    formData.append('apellidos', empleado.apellidos);
    formData.append('genero', empleado.genero);
    formData.append('fechaNacimiento', empleado.fechaNacimiento.toDateString());
    formData.append('direccion', empleado.direccion);
    formData.append('telefono', empleado.telefono);
    formData.append('eps', empleado.eps['nit']);
    formData.append('afp', empleado.afp);
    formData.append('arl', empleado.arl);
    formData.append('cajaComFamiliar', empleado.cajaComFamiliar);
    formData.append('alergia', empleado.alergia);
    formData.append('medimentos', empleado.medimentos);
    formData.append('EnCasoEmergencia', empleado.enCasoEmergencia);
    return this.http.put<Empleado>(
      API_URL + `${API_URL}edit-with-photo/${empleado.cedula}`,
      formData
    );
  }
}
