// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
// Services
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { ItemsService } from 'src/app/services/items.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { EntregaDyE } from 'src/app/models/EntregaDyE';
import { Item } from 'src/app/models/Item';
import { ItemsComponent } from './items/items.component';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css'],
})
export class EntregaComponent implements OnInit {
  entregas: EntregaDyE[];
  entrega: EntregaDyE;
  selectedEntrega: EntregaDyE = {
    idEntregaDyE: null,
    empleado: null,
    descripcion: null,
    fechaEntregaDyE: null,
    items: null,
    tipo: null,
  };
  empleados: Empleado[];
  arrayItems: Item[];
  selectedItems: Item[] = [];

  items: MenuItem[];
  formEntrega: FormGroup;
  displayModal = false;
  es: any;
  tipoEntrega:any[]

  constructor(
    private entragaService: EntregaService,
    private itemsService: ItemsService,
    private empleadoService: EmpleadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerEntregas() {
    this.entragaService.getAll().subscribe((array: EntregaDyE[]) => {
      let entregas: EntregaDyE[] = [];
      for (let index = 0; index < array.length; index++) {
        let element = array[index] as EntregaDyE;
        entregas.push(element);
      }
      this.entregas = entregas.sort(function (a, b) {
        if (a.idEntregaDyE < b.idEntregaDyE) {
          return 1;
        }
        if (a.idEntregaDyE > b.idEntregaDyE) {
          return -1;
        }
        return 0;
      });
    });
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

  obtenerItems() {
    this.itemsService.getAll().subscribe(
      (array: Item[]) => {
        let items: Item[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Item;
          items.push(element);
        }
        this.arrayItems = items.sort(function (a, b) {
          if (a.tipo > b.tipo) {
            return 1;
          }
          if (a.tipo < b.tipo) {
            return -1;
          }
          return 0;
        });
      },
      (error) => console.error(error)
    );
  }
  guardarEntrega() {
    this.entragaService.save(this.entrega).subscribe((entrega: EntregaDyE) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Correcto!',
        detail:
          'La entrega de ' +
          entrega.tipo +
          ' a ' +
          entrega.empleado.cedula +
          ' Se guardo correctamente',
      });
      this.displayModal = false;
      this.validarEntrega(entrega);
    });
  }
  validarEntrega(entrega: EntregaDyE) {
    let index = this.entregas.findIndex(
      (e) => e.idEntregaDyE === entrega.idEntregaDyE
    );
    if (index != -1) {
      this.entregas[index] = entrega;
    } else {
      this.entregas.push(entrega);
    }
    this.formEntrega.reset();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formEntrega.reset();
    if (editar) {
      if (
        this.selectedEntrega !== null &&
        this.selectedEntrega.idEntregaDyE !== null
      ) {
        this.formEntrega.patchValue(this.selectedEntrega);
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: '¡¡¡Advertencia!!!',
          detail: 'Debe seleccionar un Registro',
        });
        return;
      }
    } else {
      this.entrega = new EntregaDyE();
    }
    this.displayModal = true;
  }

  onGuardar() {
    this.entrega = this.formEntrega.value;
    this.guardarEntrega();
  }

  eliminar() {
    if (
      this.selectedEntrega === null ||
      this.selectedEntrega.idEntregaDyE === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe seleccionar un Registro',
      });
      return;
    }
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar este registros?',
      accept: () => {
        this.entragaService
          .delete(this.selectedEntrega.idEntregaDyE)
          .subscribe((entrega: EntregaDyE) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Completado!',
              detail:
                'el Registro de entrega de ' +
                entrega.tipo +
                ' a ' +
                entrega.empleado.cedula +
                ' se ha eliminado correctamente',
            });
            this.eliminarEntrega(entrega);
          });
      },
    });
  }
  eliminarEntrega(entrega: EntregaDyE) {
    let index = this.entregas.findIndex(
      (e) => e.idEntregaDyE === entrega.idEntregaDyE
    );
    if (index != -1) {
      this.entregas.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.obtenerEntregas();
    this.obtenerItems();
    this.selectedEntrega = null;
    this.formEntrega = this.fb.group({
      idEntregaDyE: new FormControl(),
      empleado: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      fechaEntregaDyE: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
    });
      this.tipoEntrega = [
        { label: 'Dotacion', value: 'Dotacion' },
        { label: 'EPP', value: 'EPP' },
      ];
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
        command: () => this.obtenerEntregas(),
      },
      {
        label: 'Buscar Por Trabajador',
        icon: 'pi pi-fw pi-search',
        command: () => this.router.navigateByUrl('/entregas/porempleado'),
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
  show(entrega: EntregaDyE) {
    const ref = this.dialogService.open(ItemsComponent, {
      header: 'Lista de Items',
      width: '100%',
      height: '100%',
      data: {
        entrega: entrega
      },
    });
    ref.onClose.subscribe((items: Item[]) => {
      console.log(items);
      this.entragaService
        .agregarItems(entrega, items)
        .subscribe((nuevaEntrega: EntregaDyE) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Agregado',
            detail: 'Se ha agregado los itemss con exito',
          });
          this.validarEntrega(nuevaEntrega);
        });
    });
  }
}