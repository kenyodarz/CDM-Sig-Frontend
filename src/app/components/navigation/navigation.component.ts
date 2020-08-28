import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
// PrimeNG FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
// Servicios
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  itemsOperaciones: MenuItem[];
  itemsRegistros: MenuItem[];
  itemsReportes: MenuItem[];
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  username: string;
  currentUser: any;
  appName = 'S.I.G.';
  calendarVisibleBar = false;
  eventos: any[]; //Full Calendar
  opciones: any; // Full Calendar

  constructor(
    private tokenStorageService: TokenStorageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.itemsRegistros = [
      {
        label: 'Trabajadores',
        icon: 'pi pi-id-card',
        command: () => this.router.navigateByUrl('/empleados'),
      },
      {
        label: 'Contratos',
        icon: 'pi pi-file',
        command: () => this.router.navigateByUrl('/contratos'),
      },
      {
        label: 'Examenes',
        icon: 'pi pi-tag',
        command: () => this.router.navigateByUrl('/examenes'),
      },
      {
        label: 'Recomendaciones',
        icon: 'pi pi-tags',
        command: () => this.router.navigateByUrl('/recomendaciones'),
      },
      {
        label: 'Entregas EPP y Dotacion',
        icon: 'pi pi-list',
        command: () => this.router.navigateByUrl('/entregas'),
      },
    ];
    this.itemsOperaciones = [
      {
        label: 'Capacitaciones',
        icon: 'pi pi-angle-double-right',
        command: () => this.router.navigateByUrl('/capacitaciones'),
      },
      {
        label: 'Incapacidades',
        icon: 'pi pi-angle-double-down',
        command: () => this.router.navigateByUrl('/incapacidades'),
      },
      { separator: true },
      {
        label: 'Vacaciones',
        icon: 'pi pi-directions',
        command: () => this.router.navigateByUrl('/vacaciones'),
      },
      {
        label: 'Pendientes',
        icon: 'pi pi-directions-alt',
        command: () => this.router.navigateByUrl('/vacaciones/pendientes'),
      },
      { separator: true },
      {
        label: 'Cargar Documentos',
        icon: 'pi pi-upload',
        command: () => this.router.navigateByUrl('/documentos'),
      },
      {
        label: 'Documentos por Trabajador',
        icon: 'pi pi-file-pdf',
        command: () => this.router.navigateByUrl('/documentos/porempleado'),
      },
    ];
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.name;
    }
    this.opciones = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      locales: [esLocale],
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
    };
    this.eventos = [
      {
        title: 'Evento de Todo un dia',
        start: '2020-08-01',
      },
      {
        title: 'Evento Largo',
        start: '2020-08-07',
        end: '2020-08-10',
      },
      {
        id: 999,
        title: 'Repitiendo Evento',
        start: '2020-08-09T16:00:00',
      },
      {
        id: 999,
        title: 'Repitiendo Evento',
        start: '2020-08-16T16:00:00',
      },
      {
        title: 'Conferencia',
        start: '2020-08-11',
        end: '2020-08-13',
      },
      {
        title: 'Reunion',
        start: '2020-08-12T10:30:00',
        end: '2020-08-12T12:30:00',
      },
      {
        title: 'Almuerzo',
        start: '2020-08-12T12:30:00',
      },
      {
        title: 'Reunion',
        start: '2020-08-12T14:30:00',
      },
      {
        title: 'Hora Feliz',
        start: '2020-08-12T17:30:00',
      },
      {
        title: 'Cena',
        start: '2020-08-12T20:00:00',
      },
      {
        title: 'Fiesta de Cumpleaños',
        start: '2020-08-13T07:00:00',
      },
      {
        title: 'Click para ir a Google',
        url: 'http://google.com/',
        start: '2020-08-28',
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
}
