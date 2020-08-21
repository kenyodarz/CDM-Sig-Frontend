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
import { EpsService } from 'src/app/services/eps.service';
import { ArlService } from 'src/app/services/arl.service';
import { AfpService } from 'src/app/services/afp.service';
import { CajaComFamiliarService } from 'src/app/services/caja-com-familiar.service';
// Modelos
import { Eps } from 'src/app/models/Eps';
import { Arl } from 'src/app/models/Arl';
import { Afp } from 'src/app/models/Afp';
import { CajaComFamiliar } from 'src/app/models/CajaComFamiliar';

@Component({
  selector: 'app-varios',
  templateUrl: './varios.component.html',
  styleUrls: ['./varios.component.css'],
})
export class VariosComponent implements OnInit {
  eps: Eps[];
  arl: Arl[];
  afp: Afp[];
  caja: CajaComFamiliar[];
  selectedEps: Eps = {
    nit: null,
    direccion: null,
    nombre: null,
    telefono: null,
  };
  selectedArl: Arl = {
    nit: null,
    direccion: null,
    nombre: null,
    telefono: null,
  };
  selectedAfp: Afp = {
    nit: null,
    direccion: null,
    nombre: null,
    telefono: null,
  };
  selectedCaja: CajaComFamiliar = {
    nit: null,
    direccion: null,
    nombre: null,
    telefono: null,
  };
  epsSingle: Eps;
  arlSingle: Arl;
  afpSingle: Afp;
  cajaSingle: CajaComFamiliar;
  selectedModel: string = null;

  formVarios: FormGroup;
  displayModal = false;
  items: MenuItem[];
  activeIndex: number = 0;

  constructor(
    private epsService: EpsService,
    private arlService: ArlService,
    private afpService: AfpService,
    private cajaService: CajaComFamiliarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
      }
    );
  }

  guardarEPS() {
    this.epsService.save(this.epsSingle).subscribe((eps: Eps) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Guardado!',
        detail:
          'La Eps ' + eps.nombre + ' ha sido guardada correctamente',
      });
      this.displayModal = false;
      this.selectedModel = null;
      this.validarEps(eps);
    });
  }
  validarEps(eps: Eps) {
    let index = this.eps.findIndex((e) => e.nit === eps.nit);
    if (index != 1) {
      this.eps[index] = eps;
    } else {
      this.eps.push(eps);
    }
    this.formVarios.reset;
    this.actualizar();
  }
  guardarARL() {
    this.arlService.save(this.arlSingle).subscribe((arl: Arl) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Guardado!',
        detail: 'La ARL ' + arl.nombre + ' ha sido guardada correctamente',
      });
      this.displayModal = false;
      this.selectedModel = null;
      this.validarArl(arl);
    });
  }
  validarArl(arl: Arl) {
    let index = this.arl.findIndex((e) => e.nit === arl.nit);
    if (index != 1) {
      this.arl[index] = arl;
    } else {
      this.arl.push(arl);
    }
    this.formVarios.reset;
    this.actualizar();
  }
  guardarAFP() {
    this.afpService.save(this.afpSingle).subscribe((afp: Afp) => {
      this.messageService.add({
        severity: 'success',
        summary: '¡Guardado!',
        detail:
          'El fondo de pension ' +
          afp.nombre +
          ' ha sido guardado correctamente',
      });
      this.displayModal = false;
      this.selectedModel = null;
      this.validarAfp(afp);
    });
  }
  validarAfp(afp: Afp) {
    let index = this.afp.findIndex((e) => e.nit === afp.nit);
    if (index != 1) {
      this.afp[index] = afp;
    } else {
      this.afp.push(afp);
    }
    this.formVarios.reset;
    this.actualizar();
  }
  guardarCaja() {
    this.cajaService
      .save(this.cajaSingle)
      .subscribe((caja: CajaComFamiliar) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Guardado!',
          detail:
            'La caja de compensacion ' +
            caja.nombre +
            ' ha sido guardada correctamente',
        });
        this.displayModal = false;
        this.selectedModel = null;
        this.validarAfp(caja);
      });
  }
  validarCaja(caja: CajaComFamiliar) {
    let index = this.caja.findIndex((e) => e.nit === caja.nit);
    if (index != 1) {
      this.caja[index] = caja;
    } else {
      this.caja.push(caja);
    }
    this.formVarios.reset;
    this.actualizar();
  }

  mostrarDialogoGuardar(editar: boolean) {
    this.formVarios.reset();
    switch (this.selectedModel) {
      case 'eps': {
        if (editar) {
          if (this.selectedEps !== null && this.selectedEps.nit !== null) {
            this.formVarios.patchValue(this.selectedEps);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: '¡¡¡Advertencia!!!',
              detail: 'Debe Seleccionar una EPS',
            });
            return;
          }
        } else {
          this.epsSingle = new Eps();
        }
        this.displayModal = true;
        break;
      }
      case 'arl': {
        if (editar) {
          if (this.selectedArl !== null && this.selectedArl.nit !== null) {
            this.formVarios.patchValue(this.selectedArl);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: '¡¡¡Advertencia!!!',
              detail: 'Debe Seleccionar una ARL',
            });
            return;
          }
        } else {
          this.arlSingle = new Arl();
        }
        this.displayModal = true;
        break;
      }
      case 'afp': {
        if (editar) {
          if (this.selectedAfp !== null && this.selectedAfp.nit !== null) {
            this.formVarios.patchValue(this.selectedAfp);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: '¡¡¡Advertencia!!!',
              detail: 'Debe Seleccionar un fonde de Pension',
            });
            return;
          }
        } else {
          this.afpSingle = new Afp();
        }
        this.displayModal = true;
        break;
      }
      case 'caja': {
        if (editar) {
          if (this.selectedCaja !== null && this.selectedCaja.nit !== null) {
            this.formVarios.patchValue(this.selectedCaja);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: '¡¡¡Advertencia!!!',
              detail: 'Debe Seleccionar una caja de compensacion',
            });
            return;
          }
        } else {
          this.cajaSingle = new CajaComFamiliar();
        }
        this.displayModal = true;
        break;
      }
    }
  }

  eliminar() {
    switch (this.selectedModel) {
      case 'eps': {
        if (this.selectedEps === null || this.selectedEps.nit === null) {
          this.messageService.add({
            severity: 'warn',
            summary: '¡¡¡Advertencia!!!',
            detail: 'Debe Seleccionar una EPS',
          });
          return;
        }
        this.confirmationService.confirm({
          message: '¿Está seguro que desea eliminar esta EPS?',
          accept: () => {
            this.epsService
              .delete(this.selectedEps.nit)
              .subscribe((eps: Eps) => {
                this.messageService.add({
                  severity: 'success',
                  summary: '¡Correcto!',
                  detail:
                    'La EPS ' + eps.nombre + ' ha sido borrada correctamente',
                });
                this.obtenerEPS();
                this.selectedModel = null;
              });
          },
        });
        break;
      }
      case 'arl': {
        if (this.selectedArl === null || this.selectedArl.nit === null) {
          this.messageService.add({
            severity: 'warn',
            summary: '¡¡¡Advertencia!!!',
            detail: 'Debe Seleccionar una ARL',
          });
          return;
        }
        this.confirmationService.confirm({
          message: '¿Está seguro que desea eliminar esta ARL?',
          accept: () => {
            this.arlService
              .delete(this.selectedArl.nit)
              .subscribe((arl: Arl) => {
                this.messageService.add({
                  severity: 'success',
                  summary: '¡Correcto!',
                  detail:
                    'La ARL ' + arl.nombre + ' ha sido borrada correctamente',
                });
                this.obtenerARL();
                this.selectedModel = null;
              });
          },
        });
        break;
      }
      case 'afp': {
        if (this.selectedAfp === null || this.selectedAfp.nit === null) {
          this.messageService.add({
            severity: 'warn',
            summary: '¡¡¡Advertencia!!!',
            detail: 'Debe Seleccionar un fondo de Pension',
          });
          return;
        }
        this.confirmationService.confirm({
          message: '¿Está seguro que desea eliminar este fondo de pension?',
          accept: () => {
            this.afpService
              .delete(this.selectedAfp.nit)
              .subscribe((afp: Afp) => {
                this.messageService.add({
                  severity: 'success',
                  summary: '¡Correcto!',
                  detail:
                    'El fondo de pension ' +
                    afp.nombre +
                    ' ha sido borrada correctamente',
                });
                this.obtenerAFP();
                this.selectedModel = null;
              });
          },
        });
        break;
      }
      case 'caja': {
        if (this.selectedCaja === null || this.selectedCaja.nit === null) {
          this.messageService.add({
            severity: 'warn',
            summary: '¡¡¡Advertencia!!!',
            detail: 'Debe Seleccionar una caja de compensacion',
          });
          return;
        }
        this.confirmationService.confirm({
          message: '¿Está seguro que desea eliminar esta caja de compensacion?',
          accept: () => {
            this.cajaService
              .delete(this.selectedCaja.nit)
              .subscribe((caja: CajaComFamiliar) => {
                this.messageService.add({
                  severity: 'success',
                  summary: '¡Correcto!',
                  detail:
                    'El fondo de pension ' +
                    caja.nombre +
                    ' ha sido borrada correctamente',
                });
                this.obtenerCaja();
                this.selectedModel = null;
              });
          },
        });
        break;
      }
    }
  }

  onGuardar() {
    switch (this.selectedModel) {
      case 'eps': {
        this.epsSingle = this.formVarios.value;
        this.guardarEPS();
        break;
      }
      case 'arl': {
        this.arlSingle = this.formVarios.value;
        this.guardarARL();
        break;
      }
      case 'afp': {
        this.afpSingle = this.formVarios.value;
        this.guardarAFP();
        break;
      }
      case 'caja': {
        this.cajaSingle = this.formVarios.value;
        this.guardarCaja();
        break;
      }
    }
  }
  actualizar() {
    this.obtenerEPS();
    this.obtenerARL();
    this.obtenerCaja();
    this.obtenerAFP();
  }

  ngOnInit(): void {
    this.actualizar();
    this.selectedTab();
    this.formVarios = this.fb.group({
      nit: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
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
        command: () => this.actualizar(),
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
  selectedTab() {
    switch (this.activeIndex) {
      case 0:
        this.selectedModel = 'eps';
        console.info(this.selectedModel);
        break;
      case 1:
        this.selectedModel = 'arl';
        console.info(this.selectedModel);
        break;
      case 2:
        this.selectedModel = 'afp';
        console.info(this.selectedModel);
        break;
      case 3:
        this.selectedModel = 'caja';
        console.info(this.selectedModel);
        break;
    }
  }
}
