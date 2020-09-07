// Angular
import { Component, OnInit } from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import { transition, animate } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EpsService } from 'src/app/services/eps.service';
import { FotosService } from 'src/app/services/fotos.service';
import { ArlService } from 'src/app/services/arl.service';
import { AfpService } from 'src/app/services/afp.service';
import { CajaComFamiliarService } from 'src/app/services/caja-com-familiar.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Eps } from 'src/app/models/Eps';
import { Arl } from 'src/app/models/Arl';
import { Afp } from 'src/app/models/Afp';
import { Foto } from 'src/app/models/Foto';
import { CajaComFamiliar } from 'src/app/models/CajaComFamiliar';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  animations: [
    trigger('animation', [
      state(
        'visible',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out'),
      ]),
      transition('* => void', [
        animate(
          '250ms ease-in',
          style({
            height: 0,
            opacity: 0,
            transform: 'translateX(50%)',
          })
        ),
      ]),
    ]),
  ],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];
  empleado: Empleado;
  selectedEmpleado: Empleado;
  selectedEmpleado2: Empleado = {
    cedula: null,
    nombres: null,
    apellidos: null,
    genero: null,
    fechaNacimiento: null,
    direccion: null,
    telefono: null,
    eps: null,
    afp: null,
    arl: null,
    cajaComFamiliar: null,
    alergia: null,
    medicamentos: null,
    enCasoEmergencia: null,
    parentesco: null,
    municipio: null,
    telEmergencia: null,
    tipoSangre: null,
    fotoHashCode: null,
  };
  eps: Eps[];
  arl: Arl[];
  afp: Afp[];
  caja: CajaComFamiliar[];
  selectedFoto: File;
  items: MenuItem[];
  empleadoForm: FormGroup;
  errorMessage: '';
  displayModal: boolean = false;
  displayDetalle: boolean = false;
  generos: any;
  tipoSangre: any;
  es: any;
  edad: any;

  titulo = 'Listado De Trabajadores';

  constructor(
    private empleadoService: EmpleadoService,
    private epsService: EpsService,
    private arlService: ArlService,
    private afpService: AfpService,
    private fotoService: FotosService,
    private cajaService: CajaComFamiliarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
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
        // console.log(this.empleados);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  obtenerEPS() {
    this.epsService.getAll().subscribe(
      (result: Eps[]) => {
        let array: Eps[] = [];
        for (let index = 0; index < result.length; index++) {
          let element = result[index] as Eps;
          array.push(element);
        }
        this.eps = array.sort(function (a, b) {
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
        console.error(error);
      }
    );
  }
  obtenerARL() {
    this.arlService.getAll().subscribe(
      (result: Arl[]) => {
        let array: Arl[] = [];
        for (let index = 0; index < result.length; index++) {
          let element = result[index] as Arl;
          array.push(element);
        }
        this.arl = array.sort(function (a, b) {
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
        console.error(error);
      }
    );
  }
  obtenerAFP() {
    this.afpService.getAll().subscribe(
      (result: Afp[]) => {
        let array: Afp[] = [];
        for (let index = 0; index < result.length; index++) {
          let element = result[index] as Afp;
          array.push(element);
        }
        this.afp = array.sort(function (a, b) {
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
        console.error(error);
      }
    );
  }
  obtenerCaja() {
    this.cajaService.getAll().subscribe(
      (result: CajaComFamiliar[]) => {
        let array: CajaComFamiliar[] = [];
        for (let index = 0; index < result.length; index++) {
          let element = result[index] as CajaComFamiliar;
          array.push(element);
        }
        this.caja = array.sort(function (a, b) {
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
        console.error(error);
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
      this.empleadoService.save(this.empleado).subscribe((result: Empleado) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'El empleado: ' + result.cedula + ' ha sido guardado correctamente',
        });
        this.displayModal = false;
        this.validarEmpleado(result);
        this.guardarFoto(result, this.selectedFoto);
      });
    }
  }

  guardarFoto(empleado: Empleado, archivo: File) {
    this.fotoService.save(empleado.cedula, archivo).subscribe((result: Foto)=>{
      console.log(result);
    });
    this.selectedFoto = null
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
    // console.log(this.empleado);
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

  selectTrabajador(empleado: Empleado) {
    this.selectedEmpleado2 = null;
    this.messageService.add({
      key: 'trabajador',
      severity: 'info',
      summary: 'Trabajador Seleccionado',
      detail: empleado.cedula + ' ' + empleado.nombres,
    });
    this.selectedEmpleado2 = empleado;
    this.calcularEdad(this.selectedEmpleado2.fechaNacimiento);
  }

  calcularEdad(dateString) {
    let hoy = new Date();
    let fechaNacimiento = new Date(dateString);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    this.edad = edad;
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.obtenerEPS();
    this.obtenerARL();
    this.obtenerCaja();
    this.obtenerAFP();
    this.generos = [
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Femenino', value: 'Femenino' },
    ];
    this.tipoSangre = [
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' },
      { label: 'A+', value: 'A+' },
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' },
    ];
    this.empleadoForm = this.fb.group({
      cedula: new FormControl(null, Validators.required),
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      tipoSangre: new FormControl(null, Validators.required),
      direccion: new FormControl(),
      municipio: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      eps: new FormControl(null, Validators.required),
      afp: new FormControl(),
      arl: new FormControl(null, Validators.required),
      cajaComFamiliar: new FormControl(),
      alergia: new FormControl(),
      medicamentos: new FormControl(),
      enCasoEmergencia: new FormControl(),
      parentesco: new FormControl(),
      telEmergencia: new FormControl(),
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
