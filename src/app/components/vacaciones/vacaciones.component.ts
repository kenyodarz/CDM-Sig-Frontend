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
import { ContratoService } from 'src/app/services/contrato.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';
// Modelos
import { Contrato } from 'src/app/models/Contrato';
import { Vacaciones } from 'src/app/models/Vacaciones';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css'],
})
export class VacacionesComponent implements OnInit {
  vacaciones: Vacaciones[];
  vacacion: Vacaciones;
  selectedVacaciones: Vacaciones;
  contratos: Contrato[];
  formVacaciones: FormGroup;

  items: MenuItem[];
  displayModal = false;
  es: any;

  constructor(
    private contratoService: ContratoService,
    private vacacionesService: VacacionesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerVacaciones() {
    this.vacacionesService.getAll().subscribe(
      (array: Vacaciones[]) => {
        let vacaciones: Vacaciones[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index];
          vacaciones.push(element);
        }
        this.vacaciones = vacaciones.sort(function (a, b) {
          if (a.idVacaciones > b.idVacaciones) {
            return 1;
          }
          if (a.idVacaciones < b.idVacaciones) {
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

  obtenerContratos() {
    this.contratoService.getAll().subscribe(
      (array: Contrato[]) => {
        let contratos: Contrato[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Contrato;
          if (element.tipoContrato === 'Contrato a término indefinido') {
            if (!element.liquidado) {
              contratos.push(element);
            }
          }
        }
        this.contratos = contratos.sort(function (a, b) {
          if (a.idContrato > b.idContrato) {
            return 1;
          }
          if (a.idContrato < b.idContrato) {
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

  guardarVacaciones() {
    this.vacacionesService
      .save(this.vacacion)
      .subscribe((vacacion: Vacaciones) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado Con Exito',
          detail: 'El periodo de Vacaciones a sido Guardado con exito',
        });
        this.displayModal = false;
        this.validadVacaciones(vacacion);
      });
  }
  validadVacaciones(vacacion: Vacaciones) {
    let index = this.vacaciones.findIndex(
      (e) => e.idVacaciones === vacacion.idVacaciones
    );
    if (index != -1) {
      this.vacaciones[index] = vacacion;
    } else {
      this.vacaciones.push(vacacion);
    }
    this.formVacaciones.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formVacaciones.reset();
    if (editar) {
      if (
        this.selectedVacaciones !== null &&
        this.selectedVacaciones.idVacaciones !== null
      ) {
        this.formVacaciones.patchValue(this.selectedVacaciones);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe Seleccionar un registro a editar',
        });
        return;
      }
    } else {
      this.vacacion = new Vacaciones();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.vacacion = this.formVacaciones.value;
    this.guardarVacaciones();
  }

  eliminar() {
    if (
      this.selectedVacaciones === null ||
      this.selectedVacaciones.idVacaciones === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un registro a eliminar',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el registro?',
      accept: () => {
        this.vacacionesService
          .delete(this.selectedVacaciones.idVacaciones)
          .subscribe((vacacion: Vacaciones) => {
            this.messageService.add({
              severity: 'info',
              summary: 'Procesado',
              detail:
                'El registro de vacaciones ha sido eliminado correctamente',
            });
            this.eliminarVacacion(vacacion);
          });
      },
    });
  }
  eliminarVacacion(vacacion: Vacaciones) {
    let index = this.vacaciones.findIndex(
      (e) => e.idVacaciones === vacacion.idVacaciones
    );
    if (index != -1) {
      this.vacaciones.splice(index, 1);
    }
  }

  calcularDias(inicio, fin) {
    let inicioDate = new Date(inicio).getTime();
    let finDate = new Date(fin).getTime();
    let dif = finDate - inicioDate;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
  }

  ngOnInit(): void {
    this.obtenerContratos();
    this.obtenerVacaciones();
    this.selectedVacaciones = null;
    this.formVacaciones = this.fb.group({
      idVacaciones: new FormControl(),
      fechaInicio: new FormControl(null, Validators.required),
      fechaFin: new FormControl(null, Validators.required),
      contrato: new FormControl(null, Validators.required),
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
        command: () => this.obtenerVacaciones(),
      },
      {
        label: 'Buscar por Trabajador',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigateByUrl('/vacaciones/porempleado'),
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
