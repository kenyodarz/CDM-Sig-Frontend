// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ExamenesService } from 'src/app/services/examenes.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Examen } from 'src/app/models/Examen';

@Component({
  selector: 'app-e-byempleado',
  templateUrl: './e-byempleado.component.html',
  styleUrls: ['./e-byempleado.component.css'],
})
export class EByempleadoComponent implements OnInit {
  examenes: Examen[];
  empleados: Empleado[];
  selectedEmpleado: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    private examenService: ExamenesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  obtenerExamenesPorEmpleado(cedula: string) {
    this.examenService.buscarExamenesPorEmpleado(cedula).subscribe(
      (array: Examen[]) => {
        let examenes: Examen[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Examen;
          examenes.push(element);
        }
        this.examenes = examenes.sort(function (a, b) {
          if (a.fecha > b.fecha) {
            return 1;
          }
          if (a.fecha < b.fecha) {
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

  buscarExamenes() {
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
      this.obtenerExamenesPorEmpleado(this.selectedEmpleado.cedula);
    }
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.selectedEmpleado = null;
    this.examenes = []
  }
}
