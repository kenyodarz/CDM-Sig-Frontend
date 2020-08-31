// Angular
import { Component, OnInit } from '@angular/core';
// Services
import { ContratoService } from 'src/app/services/contrato.service';
import { IncapacidadService } from 'src/app/services/incapacidad.service';
// Modelos
import { Contrato } from 'src/app/models/Contrato';
import { Incapacidad } from 'src/app/models/Incapacidad';
// Utilidades
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-ausentismo',
  templateUrl: './ausentismo.component.html',
  styleUrls: ['./ausentismo.component.css'],
})
export class AusentismoComponent implements OnInit {
  contratos: Contrato[];
  incapacidades: Incapacidad[];
  data: any;
  es: any;
  promedioTrabajadores: number;
  fecha: Date;
  diasLaborables: number;
  diasLaborablesCalculados: number;
  diasFestivos: number;
  ausentismoXIncapacidad: number;
  displayGrafico = false;
  constructor(
    private incapacidadService: IncapacidadService,
    private contratoService: ContratoService
  ) {}

  async obtenerContratos(fecha: Date) {
    this.contratoService.getAll().subscribe(
      (result: Contrato[]) => {
        let contratosInicioMes: Contrato[] = [];
        let contratosFinalMes: Contrato[] = [];
        for (let index = 0; index < result.length; index++) {
          let e = result[index] as Contrato;
          if (new Date(e.fechaInicio).getFullYear() <= fecha.getFullYear()) {
            let validar = false;
            if (new Date(e.fechaInicio).getFullYear() < fecha.getFullYear()) {
              validar = true;
            }
            if (new Date(e.fechaInicio).getFullYear() === fecha.getFullYear()) {
              if (new Date(e.fechaInicio).getMonth() >= fecha.getMonth()) {
                validar = true;
              }
            }
            //trabajadores a Final de enero
            if (fecha.getMonth() === 0 && validar) {
              // console.log(e);
              if (
                new Date(e.fechaFin).getFullYear() >= fecha.getFullYear() - 1 ||
                e.fechaFin === null
              ) {
                if (
                  // Trabajadores del mes Actual
                  new Date(e.fechaFin).getMonth() === 11 ||
                  e.fechaFin === null
                ) {
                  contratosInicioMes.push(e);
                }
              }
              if (
                new Date(e.fechaFin).getFullYear() >= fecha.getFullYear() ||
                e.fechaFin === null
              ) {
                if (
                  // Trabajadores del mes Actual
                  new Date(e.fechaFin).getMonth() >= fecha.getMonth() ||
                  e.fechaFin === null
                ) {
                  contratosFinalMes.push(e);
                }
              }
            } else {
              // Nos Aseguramos que estemos en el mismo año
              if (
                new Date(e.fechaFin).getFullYear() >= fecha.getFullYear() ||
                e.fechaFin === null
              ) {
                // Buscamos los Trabajadores del mes anterior
                if (
                  new Date(e.fechaFin).getMonth() >= fecha.getMonth() - 1 ||
                  e.fechaFin === null
                ) {
                  contratosInicioMes.push(e);
                }
                if (
                  // Trabajadores del mes Actual
                  new Date(e.fechaFin).getMonth() >= fecha.getMonth() ||
                  e.fechaFin === null
                ) {
                  contratosFinalMes.push(e);
                }
              }
            }
          }
        }
        this.promedioTrabajadores =
          (contratosInicioMes.length + contratosFinalMes.length) / 2;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  obtenerIncapacidades(fechaInicial: Date, fechaFinal: Date) {
    console.log('fecha Inicial: ' + fechaInicial);
    console.log('fecha Final: ' + fechaFinal);
    this.incapacidadService.getAll().subscribe(
      (array: Incapacidad[]) => {
        let incapacidades: Incapacidad[] = [];
        let num = 0;
        let diasAusente = 0;
        for (let index = 0; index < array.length; index++) {
          let element = array[index] as Incapacidad;
          /** Los presentes comentarios son para guiarme atravez de la ejecucion
           * del codigo, favor no eliminar.
           */
          /** PRIMERO: determinamos si la incapacida esta desde el primer dia del mes
           * pero termina antes del final del mes
           */
          if (
            fechaInicial <= new Date(element.fechaInicio) &&
            fechaFinal >= new Date(element.fechaFin)
          ) {
            // console.log(element);
            // console.log('Esta Incapacidad ocurre dentro del mes');
            diasAusente += this.calcularDias(
              element.fechaInicio,
              element.fechaFin
            );
            num++;
            incapacidades.push(element);
            // console.log('contando ' + diasAusente);
          }
          /** SEGUNDO: Determinamos si la incapacidad ocurre entre el primer dia del mes
           * pero termina aun despues del fin del mes. se realiza una tercera validacion
           * asegurandose que el mes actual y el de la  incapacidad sean el mismo.
           */
          if (
            fechaInicial <= new Date(element.fechaInicio) &&
            fechaFinal <= new Date(element.fechaFin) &&
            fechaInicial.getMonth() === new Date(element.fechaInicio).getMonth()
          ) {
            // console.log(element);
            // console.log(
            //   'Esta Incapacidad ocurre dentro del mes, pero termina en el siguiente'
            // );
            diasAusente += this.calcularDias(element.fechaInicio, fechaFinal);
            num++;
            incapacidades.push(element);
            // console.log('contando ' + diasAusente);
          }
          /** TERCERO: determinamos si la incapacidad ocurre antes del inicio del mes
           * pero termina en en este mes.
           */
          if (
            fechaInicial >= new Date(element.fechaInicio) &&
            fechaFinal >= new Date(element.fechaFin) &&
            fechaFinal.getMonth() === new Date(element.fechaFin).getMonth()
          ) {
            // console.log(element);
            // console.log(
            //   'Esta Incapacidad ocurre antes del mes, pero termina en el actual'
            // );
            // console.log(this.calcularDias(fechaInicial, element.fechaFin));
            diasAusente += this.calcularDias(fechaInicial, element.fechaFin);
            // console.log(element);
            // console.log(element.fechaFin);
            incapacidades.push(element);
            // console.log('contando ' + diasAusente);
          }
          /** CUARTO: La incapacidad inicia antes del mes y a su vez termina despues del
           * mes actual
           */
          if (
            new Date(element.fechaInicio) <= fechaInicial &&
            new Date(element.fechaFin) >= fechaFinal
          ) {
            // console.log(element);
            // console.log(
            //   'Esta Incapacidad ocurre antes del mes, y termina en el siguiente'
            // );
            diasAusente += this.calcularDias(fechaInicial, fechaFinal);
            num++;
            incapacidades.push(element);
            // console.log('contando ' + diasAusente);
            // console.log(element.fechaFin);
          }
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
        this.ausentismoXIncapacidad = diasAusente;
        console.log(this.ausentismoXIncapacidad);
        console.log(this.incapacidades);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange() {
    console.log('cambio');
    this.promedioTrabajadores = 0;
    this.ausentismoXIncapacidad = 0;
  }

  buscarAusentismo() {
    this.obtenerContratos(this.fecha);
    this.diasMesActual(this.fecha);
    this.calcularDiasLaborales();
    this.generarGrafico();
  }
  diasMesActual(fecha: Date) {
    let primerDia = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    let ultimoDia = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    this.obtenerIncapacidades(primerDia, ultimoDia);
  }

  calcularDiasLaborales() {
    this.diasLaborablesCalculados =
      this.promedioTrabajadores * (this.diasLaborables - this.diasFestivos);
  }

  generarGrafico() {
    this.data = {
      labels: [
        'Dias Laborales ' + this.diasLaborablesCalculados,
        'Ausentismo Laboral ' + this.ausentismoXIncapacidad,
      ],
      datasets: [
        {
          data: [
            this.diasLaborablesCalculados - this.ausentismoXIncapacidad,
            this.ausentismoXIncapacidad,
          ],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        },
      ],
    };
  }

  calcularDias(inicio, fin: Date) {
    let inicioDate = new Date(inicio);
    let finDate = new Date(fin);
    let dif = finDate.getTime() - inicioDate.getTime();
    let dias = Math.round(dif / (1000 * 60 * 60 * 24));
    return dias;
  }

  ngOnInit(): void {
    this.diasLaborablesCalculados = 0;
    this.diasFestivos = 0;
    this.diasLaborables = 30;
    this.diasLaborablesCalculados = 0;
    this.fecha = new Date();
    this.obtenerContratos(this.fecha);
    this.diasMesActual(this.fecha);
    this.calcularDiasLaborales();
    this.generarGrafico();
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      today: 'Hoy',
      clear: 'Borrar',
    };
  }
  exportPdf() {
    let documento = document.getElementById('dt');
    let opciones = {
      margin: [2.54, 2.54, 2.54, 2.54],
      filename: 'Informe.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'cm',
        format: 'letter',
        orientation: 'landscape',
      },
    };
    html2pdf()
      .from(documento)
      .set(opciones)
      .toPdf()
      .get('pdf')
      .then(function (pdf) {
        // Colocamos en el Pie de Pagina # de la pagina
        var totalPages = pdf.internal.getNumberOfPages();
        for (let index = 0; index < totalPages; index++) {
          pdf.setPage(index);
          pdf.setFontSize(10);
          pdf.setTextColor(0);
          console.log(totalPages - index);
          pdf.text(
            'Pagina ' + (totalPages - index) + ' de ' + totalPages,
            pdf.internal.pageSize.getWidth() -
              pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() - 0.5
          );
        }
      })
      .save();
  }
}
