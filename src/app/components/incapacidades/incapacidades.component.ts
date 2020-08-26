// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IncapacidadService } from 'src/app/services/incapacidad.service';
import { Cie10Service } from 'src/app/services/cie10.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Incapacidad } from 'src/app/models/Incapacidad';
import { CIE10 } from 'src/app/models/CIE10';

@Component({
  selector: 'app-incapacidades',
  templateUrl: './incapacidades.component.html',
  styleUrls: ['./incapacidades.component.css'],
})
export class IncapacidadesComponent implements OnInit {
  incapacidades: Incapacidad[];
  incapacidad: Incapacidad;
  selectedIncapacidad: Incapacidad;
  cie10: CIE10[];
  empleados: Empleado[];

  items: MenuItem[];
  incapacidadForm: FormGroup;
  displayModal = false;
  es: any;
  entidad: any;
  enfermedad: any;
  estado: any;

  constructor(
    private empleadoService: EmpleadoService,
    private incapacidadService: IncapacidadService,
    private cie10Service: Cie10Service,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerIncapacidades() {
    this.incapacidadService.getAll().subscribe(
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
        console.log(this.empleados);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerCIE10() {
    this.cie10Service.getAll().subscribe(
      (array: CIE10[]) => {
        let cie10: CIE10[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as CIE10;
          cie10.push(element);
        }
        this.cie10 = cie10.sort(function (a, b) {
          if (a.idCIE10 > b.idCIE10) {
            return 1;
          }
          if (a.idCIE10 < b.idCIE10) {
            return -1;
          }
          return 0;
        });
        console.log(this.cie10);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarIncapacidad() {
    this.incapacidadService
      .save(this.incapacidad)
      .subscribe((incapacidad: Incapacidad) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Guardado!',
          detail:
            'La Incapacidad de ' +
            incapacidad.empleado.cedula +
            ' ha sido guardada correctamente',
        });
        this.displayModal = false;
        this.validarIncapadidad(incapacidad);
      });
  }
  validarIncapadidad(incapacidad: Incapacidad) {
    let index = this.incapacidades.findIndex(
      (e) => e.idIncapacidad === incapacidad.idIncapacidad
    );
    if (index != -1) {
      this.incapacidades[index] = incapacidad;
    } else {
      this.incapacidades.push(incapacidad);
    }
    this.incapacidadForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.incapacidadForm.reset();
    if (editar) {
      if (
        this.selectedIncapacidad !== null &&
        this.selectedIncapacidad.idIncapacidad !== null
      ) {
        this.incapacidadForm.patchValue(this.selectedIncapacidad);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar una Incapacidad',
        });
        return;
      }
    } else {
      this.incapacidad = new Incapacidad();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.incapacidad = this.incapacidadForm.value;
    this.guardarIncapacidad();
  }

  eliminar() {
    if (
      this.selectedIncapacidad === null ||
      this.selectedIncapacidad.idIncapacidad === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar una Incapacidad',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar esta Incapadidad?',
      accept: () => {
        this.incapacidadService
          .delete(this.selectedIncapacidad.idIncapacidad)
          .subscribe((incapacidad: Incapacidad) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail: 'La incapacidad ha sido borrada correctamente',
            });
            this.eliminarIncapacidad(incapacidad);
          });
      },
    });
  }
  eliminarIncapacidad(incapacidad: Incapacidad) {
    let index = this.incapacidades.findIndex(
      (e) => e.idIncapacidad === incapacidad.idIncapacidad
    );
    if (index != -1) {
      this.incapacidades.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.obtenerCIE10();
    this.obtenerEmpleados();
    this.obtenerIncapacidades();
    this.selectedIncapacidad = null;
    this.incapacidadForm = this.fb.group({
      idIncapacidad: new FormControl(),
      fechaInicio: new FormControl(null, Validators.required),
      fechaFin: new FormControl(null, Validators.required),
      entidad: new FormControl(null, Validators.required),
      enfermedad: new FormControl(null, Validators.required),
      cie10: new FormControl(null, Validators.required),
      empleado: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required),
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
        command: () => this.obtenerIncapacidades(),
      },
      {
        label: 'Buscar Por Trabajador',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigateByUrl('/incapacidades/porempleado'),
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
    this.entidad = [
      { label: 'EPS', value: 'EPS' },
      { label: 'ARL', value: 'ARL' },
    ];
    this.estado = [
      { label: 'Transcrita', value: 'Transcrita' },
      { label: 'Pendiente', value: 'Pendiente' },
      { label: 'Pagada', value: 'Pagada' },
    ];
    this.enfermedad = [
      { label: 'Accidente Trabajo', value: 'Accidente Trabajo' },
      { label: 'Enfermedad Comun', value: 'Enfermedad Comun' },
      { label: 'Enfermedad Laboral', value: 'Enfermedad Laboral' },
    ];
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
