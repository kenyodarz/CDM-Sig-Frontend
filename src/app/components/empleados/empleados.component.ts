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
// Modelos
import { Empleado } from 'src/app/models/Empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[];
  empleado: Empleado;
  selectedEmpleado: Empleado;
  items: MenuItem[];
  empleadoForm: FormGroup;
  errorMessage: string = '';
  displayModal: boolean = false;

  titulo = 'Listado De Trabajadores';

  constructor(
    private empleadoService: EmpleadoService,
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

  guardarEmpleado() {
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

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.empleadoForm = this.fb.group({
      cedula: new FormControl(null, Validators.required),
      nombres: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      genero: new FormControl(null, Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      eps: new FormControl(null, Validators.required),
      afp: new FormControl(null, Validators.required),
      arl: new FormControl(null, Validators.required),
      cajaComFamiliar: new FormControl(null, Validators.required),
      alergia: new FormControl(null, Validators.required),
      medimentos: new FormControl(null, Validators.required),
      EnCasoEmergencia: new FormControl(null, Validators.required)
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
  }
}
