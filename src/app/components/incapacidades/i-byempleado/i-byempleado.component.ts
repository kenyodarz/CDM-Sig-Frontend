// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IncapacidadService } from 'src/app/services/incapacidad.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Incapacidad } from 'src/app/models/Incapacidad';

@Component({
  selector: 'app-i-byempleado',
  templateUrl: './i-byempleado.component.html',
  styleUrls: ['./i-byempleado.component.css'],
})
export class IByempleadoComponent implements OnInit {
  incapacidades: Incapacidad[] = [];
  empleados: Empleado[];
  selectedEmpleado: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    private incapacidadService: IncapacidadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  obtenerIncapacidades(cedula: string) {
    this.incapacidadService.buscarIncapacidadesporEmpleado(cedula).subscribe(
      (array: Incapacidad[]) => {
        let incapacidades: Incapacidad[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Incapacidad;
          incapacidades.push(element);
        }
        this.incapacidades = incapacidades.sort(function (a, b) {
          if (a.idIncapacidad > b.idIncapacidad) {
            return 1;
          }
          if (a.idIncapacidad < b.idIncapacidad) {
            return -1;
          }
          return 0;
        });
        console.log(this.incapacidades);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  obtenerEmpleados() {
    this.empleadoService.getAll().subscribe(
      (result: Empleado[]) => {
        let empleados: Empleado[] = [];
        for (let index = 0; index < result.length; index++) {
          let empleado = result[index] as Empleado;
          empleados.push(empleado);
        }
        this.empleados = empleados.sort(function (a, b) {
          if (a.apellidos > b.apellidos) {
            return 1;
          }
          if (a.apellidos < b.apellidos) {
            return -1;
          }
          return 0;
        });
        console.log(this.empleados);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  buscarIncapacidades() {
    if (
      this.selectedEmpleado === null ||
      this.selectedEmpleado.cedula === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un Trabajador a Buscar',
      });
      return;
    } else {
      this.obtenerIncapacidades(this.selectedEmpleado.cedula);
    }
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.selectedEmpleado = null;
  }
}
