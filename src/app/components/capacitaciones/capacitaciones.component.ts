// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { CapacitacionService } from 'src/app/services/capacitacion.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Capacitacion } from 'src/app/models/Capacitacion';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css'],
})
export class CapacitacionesComponent implements OnInit {
  capacitaciones: Capacitacion[];
  capacitacion: Capacitacion;
  selectedCapacitacion: Capacitacion;
  selectedCapacitacion2: Capacitacion;
  empleados: Empleado[];

  items: MenuItem[];
  capacitacionForm: FormGroup;
  displayModal = false;
  es: any;
  position: 'topleft';

  constructor(
    private empleadoService: EmpleadoService,
    private capacitacionService: CapacitacionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerCapacitaciones() {
    this.capacitacionService.getAll().subscribe(
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
        console.log(this.capacitaciones);
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
  guardarCapacitacion() {
    this.capacitacionService
      .save(this.capacitacion)
      .subscribe((capacitacion: Capacitacion) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'La Capacitacion sobre: ' +
            capacitacion.tema +
            ' se ha guardado correctamente',
        });
        this.displayModal = false;
        this.validarCapacitacion(capacitacion);
      });
  }
  validarCapacitacion(capacitacion: Capacitacion) {
    let index = this.capacitaciones.findIndex(
      (e) => e.idCapacitacion === capacitacion.idCapacitacion
    );
    if (index != -1) {
      this.capacitaciones[index] = capacitacion;
    } else {
      this.capacitaciones.push(capacitacion);
    }
    this.capacitacionForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.capacitacionForm.reset();
    if (editar) {
      if (
        this.selectedCapacitacion !== null &&
        this.selectedCapacitacion.idCapacitacion !== null
      ) {
        this.capacitacionForm.patchValue(this.selectedCapacitacion);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar una Capacitacion',
        });
        return;
      }
    } else {
      this.capacitacion = new Capacitacion();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.capacitacion = this.capacitacionForm.value;
    console.log(this.capacitacion);
    this.guardarCapacitacion();
  }

  eliminar() {
    if (
      this.selectedCapacitacion === null ||
      this.selectedCapacitacion.idCapacitacion === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar una Capacitacion',
      });
      return;
    }
    this.confirmationService.confirm({
      message:
        '¿Está seguro desea eliminar la Capacitacion sobre ' +
        this.selectedCapacitacion.tema +
        ' con fecha del ' +
        this.selectedCapacitacion.fecha +
        '?',
      accept: () => {
        this.capacitacionService
          .delete(this.selectedCapacitacion.idCapacitacion)
          .subscribe((capacitacion: Capacitacion) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail:
                'La capacitacion sobre ' +
                capacitacion.tema +
                ' ha sido eliminada correctamente',
            });
            this.eliminarCapacitacion(capacitacion);
          });
      },
    });
  }
  eliminarCapacitacion(capacitacion: Capacitacion) {
    let index = this.capacitaciones.findIndex(
      (e) => e.idCapacitacion === capacitacion.idCapacitacion
    );
    if (index != -1) {
      this.capacitaciones.splice(index, 1);
    }
  }
  asignarEmpleados(capacitacion: Capacitacion) {
    this.router.navigateByUrl(
      '/capacitaciones/asignar-empleados/' + capacitacion.idCapacitacion
    );
  }
  eliminarEmpleados(capacitacion: Capacitacion) {
    this.router.navigateByUrl(
      '/capacitaciones/eliminar-empleados/' + capacitacion.idCapacitacion
    );
  }
  cargarTabla(capacitacion: Capacitacion) {
    this.empleados = capacitacion.empleados;
    this.selectedCapacitacion2 = capacitacion;
  }

  ngOnInit(): void {
    this.obtenerCapacitaciones();
    this.obtenerEmpleados();
    this.selectedCapacitacion = null;
    this.capacitacionForm = this.fb.group({
      idCapacitacion: new FormControl(),
      tema: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      empleados: new FormControl(),
    });
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.mostrarDialogoGuardar(false),
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.mostrarDialogoGuardar(true),
      },
      {
        label: 'Borrar',
        icon: 'pi pi-fw pi-trash',
        command: () => this.eliminar(),
      },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerCapacitaciones(),
      },
      {
        label: 'Buscar Por Trabajador',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigateByUrl('/capacitaciones/porempleado'),
      },
    ];
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    };
  }
  logout() {
    this.confirmationService.confirm({
      message: '¿Esta Seguro que desea cerrar sesion?',
      header: 'Cerrar Sesion',
      accept: () => {
        this.tokenStorageService.signOut();
        this.irAlInicio();
        window.location.reload();
      },
      reject: () => {
        this.irAlInicio();
      },
    });
  }
  irAlInicio() {
    window.location.replace('#/home');
  }
}
