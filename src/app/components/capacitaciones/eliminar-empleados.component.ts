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
  selector: 'app-eliminar-empleados',
  templateUrl: './eliminar-empleados.component.html',
  styleUrls: ['./eliminar-empleados.component.css'],
})
export class EliminarEmpleadosComponent implements OnInit {
  capacitacion: Capacitacion;
  empleados: Empleado[];
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
        this.empleados = capacitacion.empleados;
      });
  }
  eliminarTrabajador(empleado: Empleado) {
    this.capacitacionService
      .eliminarEmpleados(this.capacitacion, empleado)
      .subscribe((capacitacion: Capacitacion) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Trabajador eliminado con exito de la capacitacion',
        });
        this.capacitacion = capacitacion;
      });
    let index = this.empleados.findIndex((e) => e.cedula === empleado.cedula);
    if (index != -1) {
      this.empleados.splice(index, 1);
    }
  }
  volver(){
    this.router.navigateByUrl('/capacitaciones');
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idCapacitacion: number = +params.get('id');
      this.obtenerCapacitacion(idCapacitacion);
    });
  }
}
