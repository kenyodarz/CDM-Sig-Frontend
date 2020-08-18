// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { AuthService } from 'src/app/services/auth.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { ExamenesService } from 'src/app/services/examenes.service';
// Modelos
import { Contrato } from 'src/app/models/Contrato';
import { Examen } from 'src/app/models/Examen';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css'],
})
export class ExamenesComponent implements OnInit {
  examenes: Examen[];
  examen: Examen;
  selectedExamen: Examen;
  selectedExamenes: Examen[];
  contratos: Contrato[];
  formExamenes: FormGroup;

  items: MenuItem[];
  displayModal = false;
  es: any;
  tipoExamen: any;
  rowGroupMetadata: any;
  constructor(
    private contratoService: ContratoService,
    private examenService: ExamenesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerExamens() {
    this.examenService.getAll().subscribe(
      (array: Examen[]) => {
        let examenes: Examen[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Examen;
          examenes.push(element);
        }
        this.examenes = examenes.sort(function (a, b) {
          if (a.idExamen > b.idExamen) {
            return 1;
          }
          if (a.idExamen < b.idExamen) {
            return -1;
          }
          return 0;
        });
      },
      (error) => {
        console.error();
      }
    );
  }

  obtenerContratos() {
    this.contratoService.getAll().subscribe((array: Contrato[]) => {
      let contratos: Contrato[] = [];
      for (let index = 0; index < array.length; index++) {
        let element = array[index] as Contrato;
        contratos.push(element);
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
    });
  }

  guardarExamen() {
    this.examenService.save(this.examen).subscribe((examen: Examen) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Guardado!',
        detail:
          'El examen ' + examen.idExamen + ' ha sido guardado correctamente',
      });
      this.displayModal = false;
      this.validarExamen(examen);
    });
  }
  validarExamen(examen: Examen) {
    let index = this.examenes.findIndex((e) => e.idExamen === examen.idExamen);
    if (index != -1) {
      this.examenes[index] = examen;
    } else {
      this.examenes.push(examen);
    }
    this.formExamenes.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formExamenes.reset();
    if (editar) {
      if (this.selectedExamen !== null && this.selectedExamen !== null) {
        this.formExamenes.patchValue(this.selectedExamen);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un Examen',
        });
        return;
      }
    } else {
      this.examen = new Examen();
    }
    this.displayModal = true;
  }

  onGuardar() {
    if (!this.formExamenes.get('concepto').value) {
      this.formExamenes.patchValue({ restriccion: 'Sin Restricción' });
    }
    this.examen = this.formExamenes.value;
    this.guardarExamen();
  }

  eliminar() {
    if (this.selectedExamen === null || this.selectedExamen.idExamen === null) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe seleccionar un Examen',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el examen?',
      accept: () => {
        this.examenService
          .delete(this.selectedExamen.idExamen)
          .subscribe((examen: Examen) => {
            this.messageService.add({
              severity: 'Info',
              summary: 'Correcto',
              detail: 'El examen ha sido borrado correctamente',
            });
            this.eliminarExamen(examen);
          });
      },
    });
  }

  onEliminar(examen: Examen) {
    this.selectedExamen = null;
    this.selectedExamen = examen;
    console.log(this.selectedExamen);
    this.eliminar();
  }
  onEditar(examen: Examen) {
    this.selectedExamen = null;
    this.selectedExamen = examen;
    console.log(this.selectedExamen);
    this.mostrarDialogoGuardar(true);
  }

  eliminarExamen(examen: Examen) {
    let index = this.examenes.findIndex((e) => e.idExamen === examen.idExamen);
    if (index != -1) {
      this.examenes.splice(index, 1);
    }
  }

  updateRowMetaData() {
    this.rowGroupMetadata = {};

    if (this.examenes) {
      for (let i = 0; i < this.examenes.length; i++) {
        let rowData = this.examenes[i].contrato['idContrato'];
        let contrato = rowData;

        if (i == 0) {
          this.rowGroupMetadata[contrato] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.examenes[i - 1].contrato['idContrato'];
          let previousRowGroup = previousRowData;
          if (contrato === previousRowGroup) {
            this.rowGroupMetadata[contrato].size++;
          } else {
            this.rowGroupMetadata[contrato] = {
              index: i,
              size: 1,
            };
          }
        }
      }
    }
  }

  onSort() {
    this.updateRowMetaData();
  }

  ngOnInit(): void {
    this.obtenerContratos();
    this.obtenerExamens();
    this.selectedExamen = null;
    this.formExamenes = this.fb.group({
      idExamen: new FormControl(),
      fecha: new FormControl(null, Validators.required),
      concepto: new FormControl(false),
      restriccion: new FormControl(null),
      tipoExamen: new FormControl(null, Validators.required),
      contrato: new FormControl(null, Validators.required),
    });
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => this.mostrarDialogoGuardar(false),
      },
      // {
      //   label: 'Editar',
      //   icon: 'pi pi-fw pi-pencil',
      //   command: () => this.mostrarDialogoGuardar(true),
      // },
      // {
      //   label: 'Borrar',
      //   icon: 'pi pi-fw pi-trash',
      //   command: () => this.eliminar(),
      // },
      {
        label: 'Actualizar',
        icon: 'pi pi-fw pi-refresh',
        command: () => this.obtenerExamens(),
      },
      {
        label: 'Buscar Por Trabajador',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigateByUrl('/examenes/porempleado'),
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
    this.tipoExamen = [
      { label: 'Ingreso', value: 'Ingreso' },
      { label: 'Periodico', value: 'Periodico' },
      { label: 'Egreso', value: 'Egreso' },
      { label: 'PostIncapacidad', value: 'PostIncapacidad' },
    ];
  }
}
