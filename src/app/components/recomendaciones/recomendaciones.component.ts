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
import { ExamenesService } from 'src/app/services/examenes.service';
import { RecomendacionService } from 'src/app/services/recomendacion.service';
// Modelos
import { Examen } from 'src/app/models/Examen';
import { Recomendacion } from 'src/app/models/Recomendacion';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css'],
})
export class RecomendacionesComponent implements OnInit {
  recomendaciones: Recomendacion[];
  recomendacion: Recomendacion;
  selectedRecomendacion: Recomendacion;
  examenes: Examen[];
  formRecomendacion: FormGroup;
  tipoSeguimiento: any[]

  items: MenuItem[];
  displayModal = false;
  es: any;
  tipoExamen: any;

  constructor(
    private recomendacionService: RecomendacionService,
    private examenService: ExamenesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerRecomendaciones() {
    this.recomendacionService.getAll().subscribe((array: Recomendacion[]) => {
      let recomendaciones: Recomendacion[] = [];
      for (let index = 0; index < array.length; index++) {
        let element = array[index] as Recomendacion;
        recomendaciones.push(element);
      }
      this.recomendaciones = recomendaciones.sort(function (a, b) {
        if (a.examen.fecha > b.examen.fecha) {
          return -1;
        }
        if (a.examen.fecha < b.examen.fecha) {
          return 1;
        }
        return 0;
      });
    });
  }

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

  guardarRecomendacion() {
    this.recomendacionService.save(this.recomendacion).subscribe(
      (recomendacion: Recomendacion) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail: 'La recomendacion a sido guardada correctamente',
        });
        this.displayModal = false;
        this.validarRecomendacion(recomendacion);
      },
      (error) => console.error(error)
    );
  }
  validarRecomendacion(recomendacion: Recomendacion) {
    let index = this.recomendaciones.findIndex(
      (e) => (e.idRecomendaciones = recomendacion.idRecomendaciones)
    );
    if (index != -1) {
      this.recomendaciones[index] = recomendacion;
    } else {
      this.recomendaciones.push(recomendacion);
    }
    this.formRecomendacion.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formRecomendacion.reset();
    if (editar) {
      if (
        this.selectedRecomendacion !== null &&
        this.selectedRecomendacion.idRecomendaciones !== null
      ) {
        this.formRecomendacion.patchValue(this.selectedRecomendacion);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar una recomendacion a editar',
        });
        return;
      }
    } else {
      this.recomendacion = new Recomendacion();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.recomendacion = this.formRecomendacion.value;
    this.guardarRecomendacion();
  }

  eliminar() {
    if (
      this.selectedRecomendacion === null ||
      this.selectedRecomendacion.idRecomendaciones === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Para eliminar debe seleccionar una recomendacion',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el examen?',
      accept: () => {
        this.recomendacionService
          .delete(this.selectedRecomendacion.idRecomendaciones)
          .subscribe((recomendacion: Recomendacion) => {
            this.messageService.add({
              severity: 'Info',
              summary: 'Correcto',
              detail: 'La recomendacion ha sido borrada correctamente',
            });
            this.eliminarRecomendacion(recomendacion);
          });
      },
    });
  }
  eliminarRecomendacion(recomendacion: Recomendacion) {
    let index = this.recomendaciones.findIndex(
      (e) => (e.idRecomendaciones = recomendacion.idRecomendaciones)
    );
    if (index != -1) {
      this.recomendaciones.splice(index, 1);
    }
  }

  onEditar(recomendacion: Recomendacion) {
    this.selectedRecomendacion = null;
    this.selectedRecomendacion = recomendacion;
    this.mostrarDialogoGuardar(true);
  }
  onEliminar(recomendacion: Recomendacion) {
    this.selectedRecomendacion = null;
    this.selectedRecomendacion = recomendacion;
    this.eliminar();
  }

  ngOnInit(): void {
    this.obtenerRecomendaciones();
    this.obtenerExamens();
    this.selectedRecomendacion = null;
    this.formRecomendacion = this.fb.group({
      idRecomendaciones: new FormControl(),
      examen: new FormControl(null, Validators.required),
      recommendation: new FormControl(null, Validators.required),
      tipoSeguimiento: new FormControl(null, Validators.required),
      primeraSeguimiento: new FormControl(),
      segundaSeguimiento: new FormControl(),
      terceraSeguimiento: new FormControl(),
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
        command: () => this.obtenerRecomendaciones(),
      },
    ];
    this.tipoSeguimiento = [
      { label: 'Por recomendación', value: 'Recomendacion' },
      { label: 'Por restricción', value: 'Restriccion' },
    ];
  }
}
