// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// Services
import { EmpleadoService } from 'src/app/services/empleado.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Documento } from 'src/app/models/Documento';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  documentos: Documento[];
  documento: Documento;
  selectedDocumento: Documento;
  empleados: Empleado[];

  items: MenuItem[];
  uploadDocumento: File;
  formDocumento: FormGroup;
  displayModal = false;
  tipo: any;

  constructor(
    private empleadoService: EmpleadoService,
    private documentoService: DocumentosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerDocumentos() {
    this.documentoService.getAll().subscribe(
      (array: Documento[]) => {
        let documentos: Documento[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Documento;
          documentos.push(element);
        }
        this.documentos = documentos.sort(function (a, b) {
          if (a.createAt > b.createAt) {
            return 1;
          }
          if (a.createAt < b.createAt) {
            return -1;
          }
          return 0;
        });
      },
      (error) => console.error(error)
    );
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
        // console.log(this.empleados);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarDocumento() {
    this.documentoService
      .saveFile(this.documento, this.uploadDocumento)
      .subscribe((documento: Documento) => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Correcto!',
          detail:
            'El Documento: ' +
            documento.nombre +
            ' ha sido cargado correctamente',
        });
        this.formDocumento.reset();
        this.uploadDocumento = null
      });
  }


  onGuardar() {
    this.documento = this.formDocumento.value;
    this.guardarDocumento();
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

  seleccionarArchivo(event) {
    this.uploadDocumento = event.target.files[0];
    console.info(this.uploadDocumento);
    console.info('size', this.uploadDocumento.size);
    console.info('type', this.uploadDocumento.type);
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.formDocumento = this.fb.group({
      idDocumento: new FormControl(),
      empleado: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
    });
    this.tipo = [
      { label: 'Cedula de Ciudadania', value: 'Cedula de Ciudadania' },
      { label: 'Examen Ingreso', value: 'Examen Ingreso' },
      { label: 'Examen Periodico', value: 'Examen Periodico' },
      { label: 'Examen Final', value: 'Examen Final' },
      { label: 'Incapacidad', value: 'Incapacidad' },
      { label: 'Hoja de Vida', value: 'Hoja de Vida' },
      { label: 'Soporte', value: 'Soporte' },
      { label: 'Certificacion EPS', value: 'Certificacion EPS' },
      { label: 'Certificacion AFP', value: 'Certificacion AFP' },
    ];
  }
}
