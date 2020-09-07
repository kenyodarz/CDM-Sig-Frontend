// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ContratoService } from 'src/app/services/contrato.service';
// Modelos
import { Contrato } from 'src/app/models/Contrato';
import { Empleado } from 'src/app/models/Empleado';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css'],
})
export class ContratosComponent implements OnInit {
  contratos: Contrato[];
  contrato: Contrato;
  selectedContrato: Contrato;
  empleados: Empleado[];
  selectedEmpleado: Empleado;
  items: MenuItem[];
  contratoForm: FormGroup;
  displayModal = false;
  tipoContratos: any;
  es: any;

  constructor(
    private empleadoService: EmpleadoService,
    private contratoService: ContratoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder
  ) {}

  obtenerContratos() {
    this.contratoService.getAll().subscribe(
      (result: Contrato[]) => {
        let contratos: Contrato[] = [];
        for (let index = 0; index < result.length; index++) {
          let e = result[index] as Contrato;
          contratos.push(e);
        }
        this.contratos = contratos.sort(function (a, b) {
          if (a.empleado.apellidos > b.empleado.apellidos) {
            return 1;
          }
          if (a.empleado.apellidos < b.empleado.apellidos) {
            return -1;
          }
          return 0;
        });
        // console.log(contratos);
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
  guardarContrato() {
    this.contratoService.save(this.contrato).subscribe((result: Contrato) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Correcto!',
        detail:
          'El Contrato de: ' +
          result.empleado.cedula +
          ' ha sido guardado correctamente',
      });
      this.displayModal = false;
      this.validarContrato(result);
    });
  }
  validarContrato(contrato: Contrato) {
    let index = this.contratos.findIndex(
      (e) => e.idContrato === contrato.idContrato
    );
    if (index != -1) {
      this.contratos[index] = contrato;
    } else {
      this.contratos.push(contrato);
    }
    this.contratoForm.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.contratoForm.reset();
    if (editar) {
      if (this.selectedContrato !== null && this.selectedContrato !== null) {
        this.contratoForm.patchValue(this.selectedContrato);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un Contrato',
        });
        return;
      }
    } else {
      this.contrato = new Contrato();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.contrato = this.contratoForm.value;
    // console.log(this.contrato);
    this.guardarContrato();
  }

  eliminar() {
    if (
      this.selectedContrato === null ||
      this.selectedContrato.idContrato === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un Contrato',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar el Contrato?',
      accept: () => {
        this.contratoService
          .delete(this.selectedContrato.idContrato)
          .subscribe((resultado: Contrato) => {
            this.messageService.add({
              severity: 'success',
              summary: '!Correcto¡',
              detail:
                'El contrato ' +
                resultado.idContrato +
                ' ha sido eliminado correctamente',
            });
            this.eliminarContrato(resultado);
          });
      },
    });
  }
  eliminarContrato(contrato: Contrato) {
    let index = this.contratos.findIndex(
      (e) => e.idContrato === contrato.idContrato
    );
    if (index != -1) {
      this.contratos.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.obtenerContratos();
    this.obtenerEmpleados();
    this.selectedContrato = null;
    this.contratoForm = this.fb.group({
      idContrato: new FormControl(),
      tipoContrato: new FormControl(null, Validators.required),
      fechaInicio: new FormControl(null, Validators.required),
      fechaFin: new FormControl(),
      salario: new FormControl(null, Validators.required),
      empleado: new FormControl(null, Validators.required),
      liquidado: new FormControl(),
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
        command: () => this.obtenerContratos(),
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
    this.tipoContratos = [
      { label: 'Contrato de Obra o labor', value: 'Contrato de Obra o labor' },
      {
        label: 'Contrato civil por prestación de servicios',
        value: 'Contrato civil por prestación de servicios',
      },
      { label: 'Contrato a término fijo', value: 'Contrato a término fijo' },
      {
        label: 'Contrato a término indefinido',
        value: 'Contrato a término indefinido',
      },
      { label: 'Contrato de aprendizaje', value: 'Contrato de aprendizaje' },
      {
        label: 'Contrato ocasional de trabajo',
        value: 'Contrato ocasional de trabajo',
      },
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
