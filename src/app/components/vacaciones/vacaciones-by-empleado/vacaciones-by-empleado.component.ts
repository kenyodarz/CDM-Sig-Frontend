// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Vacaciones } from 'src/app/models/Vacaciones';

@Component({
  selector: 'app-vacaciones-by-empleado',
  templateUrl: './vacaciones-by-empleado.component.html',
  styleUrls: ['./vacaciones-by-empleado.component.css'],
})
export class VacacionesByEmpleadoComponent implements OnInit {
  vacaciones: Vacaciones[];
  empleados: Empleado[];
  selectedEmpleado: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    private vacacionesService: VacacionesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  obtenerVacacionesPorEmpleado(cedula: string) {
    this.vacacionesService.buscarVacacionesPorEmpleado(cedula).subscribe(
      (array: Vacaciones[]) => {
        let vacaciones: Vacaciones[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Vacaciones;
          vacaciones.push(element);
        }
        this.vacaciones = vacaciones.sort(function (a, b) {
          if (a.contrato.idContrato > b.contrato.idContrato) {
            return 1;
          }
          if (a.contrato.idContrato < b.contrato.idContrato) {
            return -1;
          }
          return 0;
        });
      },
      (error) => console.error(error)
    );
  }

  obtenerEmpleados() {
    this.empleadoService.getAll().subscribe(
      (array: Empleado[]) => {
        let empleados: Empleado[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Empleado;
          empleados.push(element);
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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarVacaciones() {
    if (
      this.selectedEmpleado === null ||
      this.selectedEmpleado.cedula === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un Trabajador',
      });
      return;
    } else {
      this.obtenerVacacionesPorEmpleado(this.selectedEmpleado.cedula);
    }
  }

  calcularDias(inicio, fin) {
    let inicioDate = new Date(inicio).getTime();
    let finDate = new Date(fin).getTime();
    let dif = finDate - inicioDate;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
  }

  regresar(){
    this.router.navigateByUrl('/vacaciones')
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.selectedEmpleado = null;
    this.vacaciones = [];
  }
}
