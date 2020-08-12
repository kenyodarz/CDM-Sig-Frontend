// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
// Modelos
import { Capacitacion } from 'src/app/models/Capacitacion';
import { Empleado } from 'src/app/models/Empleado';
// Servicios
import { CapacitacionService } from 'src/app/services/capacitacion.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-asignar-empleados',
  templateUrl: './asignar-empleados.component.html',
  styleUrls: ['./asignar-empleados.component.css'],
})
export class AsignarEmpleadosComponent implements OnInit {
  capacitacion: Capacitacion;
  empleados: Empleado[];
  selectedEmpleados: Empleado[] = [];
  first = 0;
  rows = 10;

  constructor(
    private route: ActivatedRoute,
    private capacitacionService: CapacitacionService,
    private empleadoService: EmpleadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  obtenerCapacitacion(idCapacitacion: number) {
    this.capacitacionService
      .ver(idCapacitacion)
      .subscribe((capacitacion: Capacitacion) => {
        console.log(capacitacion);
        this.capacitacion = capacitacion;
      });
  }

  obtenerEmpleados() {
    this.empleadoService.getAll().subscribe(
      (result: Empleado[]) => {
        let empleados: Empleado[] = [];
        for (let i = 0; i < result.length; i++) {
          let empleado = result[i] as Empleado;
          let index = this.capacitacion.empleados.findIndex(
            (e) => e.cedula === empleado.cedula
          );
          if (index === -1) {
            empleados.push(empleado);
          }
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

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }
  isLastPage(): boolean {
    return this.empleados
      ? this.first <= this.empleados.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.empleados ? this.first === 0 : true;
  }

  asignarEmpleados() {
    console.log(this.selectedEmpleados);
    console.log(this.capacitacion);
    this.capacitacionService
      .asignarEmpleados(this.capacitacion, this.selectedEmpleados)
      .subscribe((capacitacion: Capacitacion) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'Se han asignado: ' +
            capacitacion.tema +
            ' se ha guardado correctamente',
        });
        console.log(capacitacion);
      });
    this.router.navigateByUrl('/capacitaciones');
  }
  volver() {
    this.router.navigateByUrl('/capacitaciones');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idCapacitacion: number = +params.get('id');
      this.obtenerCapacitacion(idCapacitacion);
    });
    this.obtenerEmpleados();
  }
}
