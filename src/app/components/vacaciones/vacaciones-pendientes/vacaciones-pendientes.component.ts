// Angular
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-vacaciones-pendientes',
  templateUrl: './vacaciones-pendientes.component.html',
  styleUrls: ['./vacaciones-pendientes.component.css'],
})
export class VacacionesPendientesComponent implements OnInit {
  vacaciones: Vacaciones[];
  contratos: Contrato[];
  selectedVacaciones: Vacaciones;
  vacacionesTomadas: number[] = [];
  periodos: number;
  selectedContrato: Contrato;

  constructor(
    private contratoService: ContratoService,
    private vacacionesService: VacacionesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  obtenerVacacionesPorEmpleado(cedula: string) {
    this.vacacionesService.buscarVacacionesPorEmpleado(cedula).subscribe(
      (array: Vacaciones[]) => {
        let vacaciones: Vacaciones[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Vacaciones;
          vacaciones.push(element);
        }
        this.vacaciones = vacaciones.sort(function (a, b) {
          if (a.contrato.idContrato > b.contrato.idContrato) {
            return 1;
          }
          if (a.contrato.idContrato < b.contrato.idContrato) {
            return -1;
          }
          return 0;
        });
      },
      (error) => console.error(error)
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

  obtenerVacacionesTomadas(contrato: Contrato) {
    let returnList: number[] = [];
    this.vacacionesService
      .buscarVacacionesTomadasPorEmpleado(contrato)
      .subscribe((array: number[]) => {
        for (let index = 0; index < array.length; index++) {
          const element = array[index] as number;
          returnList.push(element);
        }
        this.vacacionesTomadas = returnList;
      });
  }

  calcularPeriodosVacaciones(dateString) {
    let hoy = new Date();
    let inicioContrato = new Date(dateString);
    let periodos = hoy.getFullYear() - inicioContrato.getFullYear();
    let diferenciaMeses = hoy.getMonth() - inicioContrato.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < inicioContrato.getDate())
    ) {
      periodos--;
    }
    this.periodos = periodos;
  }

  obtenerCalculos(contrato: Contrato) {
    this.periodos = 0;
    this.vacacionesTomadas = [];
    this.calcularPeriodosVacaciones(contrato.fechaInicio);
    this.obtenerVacacionesTomadas(contrato);
  }

  ngOnInit(): void {
    this.obtenerContratos();
  }
}
