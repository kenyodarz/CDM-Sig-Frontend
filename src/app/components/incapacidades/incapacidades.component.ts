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
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IncapacidadService } from 'src/app/services/incapacidad.service';
import { Cie10Service } from 'src/app/services/cie10.service';
// Modelos
import { Empleado } from 'src/app/models/Empleado';
import { Incapacidad } from 'src/app/models/Incapacidad';
import { CIE10 } from 'src/app/models/CIE10';

@Component({
  selector: 'app-incapacidades',
  templateUrl: './incapacidades.component.html',
  styleUrls: ['./incapacidades.component.css'],
})
export class IncapacidadesComponent implements OnInit {
  incapacidades: Incapacidad[];
  selectedIncapacidad: Incapacidad;
  cie10: CIE10[];
  empleados: Empleado[];

  items: MenuItem[];
  incapacidadForm: FormGroup;
  displayModal = false;
  es: any;

  constructor(
    private empleadoService: EmpleadoService,
    private incapacidadService: IncapacidadService,
    private cie10Service: Cie10Service,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  obtenerIncapacidades() {
    this.incapacidadService.getAll().subscribe(
      (array: Incapacidad[]) => {
        let incapacidades: Incapacidad[] = [];
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Incapacidad;
          incapacidades.push(element);
        }
        this.incapacidades = incapacidades.sort(function (a, b) {
          if (a.idIncapacidad > b.idIncapacidad) {
            return 1;
          }
          if (a.idIncapacidad < b.idIncapacidad) {
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

  ngOnInit(): void {}
}
