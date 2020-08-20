// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DocumentosService } from 'src/app/services/documentos.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-d-byempleado',
  templateUrl: './d-byempleado.component.html',
  styleUrls: ['./d-byempleado.component.css'],
})
export class DByempleadoComponent implements OnInit {
  documentos: Documento[] = [];
  empleados: Empleado[];
  selectedEmpleado: Empleado;

  constructor(
    private empleadoService: EmpleadoService,
    private documentoService: DocumentosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  obtenerDocumentos(cedula: string) {
    this.documentoService
      .getFilesByEmpleados(cedula)
      .subscribe((array: Documento[]) => {
        let documentos: Documento[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Documento;
          documentos.push(element);
        }
        this.documentos = documentos.sort(function (a, b) {
          if (a.tipo > b.tipo) {
            return 1;
          }
          if (a.tipo < b.tipo) {
            return -1;
          }
          return 0;
        });
      });
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
        console.log(this.empleados);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscaDocumentos() {
    if (
      this.selectedEmpleado === null ||
      this.selectedEmpleado.cedula === null
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: '¡¡¡Advertencia!!!',
        detail: 'Debe Seleccionar un Trabajador a Buscar',
      });
      return;
    } else {
      this.obtenerDocumentos(this.selectedEmpleado.cedula);
    }
  }

  eliminar(idDocumento: number) {
    this.confirmationService.confirm({
      message: '¿Esta seguro que desea eliminar el Documento?',
      accept: () => {
        this.documentoService
          .delete(idDocumento)
          .subscribe((documento: Documento) => {
            this.messageService.add({
              severity: 'success',
              summary: '¡Correcto!',
              detail:
                'El Documento: ' +
                documento.nombre +
                ' ha sido eliminado correctamente',
            });
            this.eliminarDocumento(documento);
          });
      },
    });
  }
  eliminarDocumento(documento: Documento) {
    let index = this.documentos.findIndex(
      (e) => e.idDocumento === documento.idDocumento
    );
    if (index !== -1) {
      this.documentos.slice(index, 1);
    }
  }

  verDocumento(idDocumento) {
    let fileURL: string = null;
    console.info(idDocumento);
    fileURL = 'http://localhost:8080/api/documentos/pdf/' + idDocumento;
    window.open(fileURL);
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.selectedEmpleado = null;
  }
}
