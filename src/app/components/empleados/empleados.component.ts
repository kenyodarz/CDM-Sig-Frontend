// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EpsService } from 'src/app/services/eps.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Eps } from 'src/app/models/Eps';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];
  empleado: Empleado;
  selectedEmpleado: Empleado;
  eps: Eps[];
  selectedFoto: File;
  items: MenuItem[];
  empleadoForm: FormGroup;
  errorMessage: string = '';
  displayModal: boolean = false;
  generos: any;
  es: any;

  titulo = 'Listado De Trabajadores';

  constructor(
    private empleadoService: EmpleadoService,
    private epsService: EpsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

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
  obtenerEPS() {
    this.epsService.getAll().subscribe(
      (result: Eps[]) => {
        let eps: Eps[] = [];
        for (let index = 0; index < result.length; index++) {
          let element = result[index] as Eps;
          eps.push(element);
        }
        this.eps = eps.sort(function (a, b) {
          if (a.nombre > b.nombre) {
            return 1;
          }
          if (a.nombre < b.nombre) {
            return -1;
          }
          return 0;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarEmpleado() {
    if (!this.selectedFoto) {
      this.empleadoService.save(this.empleado).subscribe((result: Empleado) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'El empleado: ' + result.cedula + ' ha sido guardado correctamente',
        });
        this.displayModal = false;
        this.validarEmpleado(result);
      });
    } else {
      this.empleadoService
        .crearConFoto(this.empleado, this.selectedFoto)
        .subscribe((result: Empleado) => {
          this.messageService.add({
            severity: 'success',
            summary: '¡Correcto!',
            detail:
              'El empleado: ' +
              result.cedula +
              ' ha sido guardado correctamente',
          });
          this.displayModal = false;
          this.validarEmpleado(result);
        });
    }
  }

  editarConFoto() {
    if (!this.selectedFoto) {
      this.guardarEmpleado();
    } else {
      this.empleadoService
        .editarConFoto(this.empleado, this.selectedFoto)
        .subscribe((result: Empleado) => {
          this.messageService.add({
            severity: 'success',
            summary: '¡Correcto!',
            detail:
              'El empleado: ' +
              result.cedula +
              ' ha sido Editado correctamente',
          });
          this.displayModal = false;
          this.validarEmpleado(result);
        });
    }
  }

  validarEmpleado(empleado: Empleado) {
    let index = this.empleados.findIndex((e) => e.cedula === empleado.cedula);
    if (index != -1) {
      this.empleados[index] = empleado;
    } else {
      this.empleados.push(empleado);
    }
    this.empleadoForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.empleadoForm.reset();
    if (editar) {
      if (
        this.selectedEmpleado !== null &&
        this.selectedEmpleado.cedula !== null
      ) {
        this.empleadoForm.patchValue(this.selectedEmpleado);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un Trabajador',
        });
        return;
      }
    } else {
      this.empleado = new Empleado();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.empleado = this.empleadoForm.value;
    console.log(this.empleado)
    this.guardarEmpleado();
  }

  eliminar() {
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
    }
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar el Trabajador?',
      accept: () => {
        this.empleadoService
          .delete(this.selectedEmpleado.cedula)
          .subscribe((result: Empleado) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail:
                'El alumno: ' +
                result.cedula +
                ' ha sido eliminado correctamente',
            });
            this.eliminarAlumno(result.cedula);
          });
      },
    });
  }
  eliminarAlumno(cedula: string) {
    let index = this.empleados.findIndex((e) => e.cedula === cedula);
    if (index != -1) {
      this.empleados.splice(index, 1);
    }
  }

  seleccionarFoto(event): void {
    this.selectedFoto = event.target.files[0];
    console.info(this.selectedFoto);
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.obtenerEPS();
    this.generos = [
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Femenino', value: 'Femenino' },
    ];
    this.empleadoForm = this.fb.group({
      cedula: new FormControl(null, Validators.required),
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      direccion: new FormControl(),
      telefono: new FormControl(null, Validators.required),
      eps: new FormControl(null, Validators.required),
      afp: new FormControl(),
      arl: new FormControl(null, Validators.required),
      cajaComFamiliar: new FormControl(),
      alergia: new FormControl(),
      medimentos: new FormControl(),
      enCasoEmergencia: new FormControl(),
    });
    this.selectedEmpleado = null;
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
        command: () => this.obtenerEmpleados(),
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
}
