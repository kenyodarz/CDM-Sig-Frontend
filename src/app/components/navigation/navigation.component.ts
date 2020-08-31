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
  items: MenuItem[];
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  username: string;
  currentUser: any;
  calendarVisibleBar = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.name;
      this.items = [
        {
          label: 'Registros',
          icon: 'pi pi-users',
          items: [
            {
              label: 'RRHH',
              icon: 'pi pi-user',
              items: [
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
                  label: 'Entregas EPP y Dotacion',
                  icon: 'pi pi-list',
                  command: () => this.router.navigateByUrl('/entregas'),
                },
              ],
            },
            {
              label: 'Examenes',
              icon: 'pi pi-tags',
              items: [
                {
                  label: 'Registro Examen',
                  icon: 'pi pi-tag',
                  command: () => this.router.navigateByUrl('/examenes'),
                },
                {
                  label: 'Seguimiento Examen',
                  icon: 'pi pi-tag',
                  command: () => this.router.navigateByUrl('/recomendaciones'),
                },
              ],
            },
          ],
        },
        {
          label: 'Operaciones',
          icon: 'pi pi-user-edit',
          items: [
            {
              label: 'Registro',
              icon: 'pi pi-angle-double-right',
              items: [
                {
                  label: 'Capacitaciones',
                  icon: 'pi pi-angle-double-up',
                  command: () => this.router.navigateByUrl('/capacitaciones'),
                },
                {
                  label: 'Incapacidades',
                  icon: 'pi pi-angle-double-down',
                  command: () => this.router.navigateByUrl('/incapacidades'),
                },
              ],
            },
            { separator: true },
            {
              label: 'Vacaciones',
              icon: 'pi pi-star',
              items: [
                {
                  label: 'Vacaciones',
                  icon: 'pi pi-directions',
                  command: () => this.router.navigateByUrl('/vacaciones'),
                },
                {
                  label: 'Pendientes',
                  icon: 'pi pi-directions-alt',
                  command: () =>
                    this.router.navigateByUrl('/vacaciones/pendientes'),
                },
              ],
            },
            { separator: true },
            {
              label: 'Documentos',
              icon: 'pi pi-file',
              items: [
                {
                  label: 'Cargar Documentos',
                  icon: 'pi pi-upload',
                  command: () => this.router.navigateByUrl('/documentos'),
                },
                {
                  label: 'Documentos por Trabajador',
                  icon: 'pi pi-file-pdf',
                  command: () =>
                    this.router.navigateByUrl('/documentos/porempleado'),
                },
              ],
            },
            { separator: true },
            {
              label: 'Estadisticas',
              icon: 'pi pi-chart-line',
              items: [
                {
                  label: 'Ausentismo',
                  icon: 'pi pi-chart-bar',
                  command: () => this.router.navigateByUrl('/ausentismo'),
                },
              ],
            },
          ],
        },
        {
          label: 'Opciones',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Varios',
              icon: 'pi pi-ticket',
              command: () => this.router.navigateByUrl('/varios'),
            },
          ],
        },
      ];
    }
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
