// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Capacitacion } from 'src/app/models/Capacitacion';

@Component({
  selector: 'app-byempleados',
  templateUrl: './byempleados.component.html',
  styleUrls: ['./byempleados.component.css'],
})
export class ByempleadosComponent implements OnInit {
  capacitaciones: Capacitacion[] = [];
  empleados: Empleado[];
  selectedEmpleado: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    private capacitacionService: CapacitacionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  obtenerCapacitaciones(cedula: string) {
    this.capacitacionService.buscarEmpleadoPorID(cedula).subscribe(
      (array: Capacitacion[]) => {
        let capacitaciones: Capacitacion[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Capacitacion;
          capacitaciones.push(element);
        }
        this.capacitaciones = capacitaciones.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
            return -1;
          }
          return 0;
        });
        // console.log(this.capacitaciones);
      },
      (error) => {
        console.error(error);
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
        // console.log(this.empleados);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarCapacitaciones() {
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
      this.obtenerCapacitaciones(this.selectedEmpleado.cedula);
    }
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.selectedEmpleado = null;
  }
}
