// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
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
  totalVacaciones: Vacaciones[];
  contratos: Contrato[];
  selectedVacaciones: Vacaciones;
  vacacionesTomadas: number[] = [];
  periodos: number;
  selectedContrato: Contrato;
  items: MenuItem[];
  loading: boolean;
  rowGroupMetadata: any;
  @ViewChild('dt') table: Table;

  constructor(
    private contratoService: ContratoService,
    private vacacionesService: VacacionesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
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
        this.totalVacaciones = vacaciones.sort(function (a, b) {
          if (a.idVacaciones > b.idVacaciones) {
            return 1;
          }
          if (a.idVacaciones < b.idVacaciones) {
            return -1;
          }
          return 0;
        });
        this.updateRowGroupMetaData();
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
    return periodos;
  }
  calcularVacacionesTomadas(contrato: Contrato) {
    let tomadas: number = 0;
    for (let index = 0; index < this.totalVacaciones.length; index++) {
      const element = this.totalVacaciones[index];
      if (element.contrato.idContrato === contrato.idContrato) {
        tomadas++;
      }
    }
    return tomadas;
  }

  obtenerCalculos(contrato: Contrato) {
    this.periodos = 0;
    this.vacacionesTomadas = [];
    this.calcularPeriodosVacaciones(contrato.fechaInicio);
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.contratos) {
      for (let i = 0; i < this.contratos.length; i++) {
        let rowData = this.contratos[i];
        let cedulaEmpleado = rowData.empleado.cedula;
        if (i == 0) {
          this.rowGroupMetadata[cedulaEmpleado] = {
            index: 0,
            periodo: this.calcularPeriodosVacaciones(rowData.fechaInicio),
            cc: cedulaEmpleado,
            tomadas: this.calcularVacacionesTomadas(rowData),
            pendientes:
              this.calcularPeriodosVacaciones(rowData.fechaInicio) -
              this.calcularVacacionesTomadas(rowData),
          };
        } else {
          let previousRowData = this.totalVacaciones[i - 1];
          let previousRowGroup = previousRowData.contrato.empleado.cedula;
          if (cedulaEmpleado === previousRowGroup) {
            this.rowGroupMetadata[cedulaEmpleado].size++;
          } else {
            this.rowGroupMetadata[cedulaEmpleado] = {
              index: i,
              periodo: this.calcularPeriodosVacaciones(rowData.fechaInicio),
              cc: cedulaEmpleado,
              tomadas: this.calcularVacacionesTomadas(rowData),
              pendientes:
                this.calcularPeriodosVacaciones(rowData.fechaInicio) -
                this.calcularVacacionesTomadas(rowData),
            };
          }
        }
      }
    }
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'fechaInicio', 'equals');
  }
  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  GenerarExcel() {
    console.log('Generando excel');
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.table_to_sheet(
        document.getElementById('dt')
      );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'InformesExcel');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  ngOnInit(): void {
    this.obtenerContratos();
    this.obtenerVacaciones();
    this.loading = true;
  }
}
