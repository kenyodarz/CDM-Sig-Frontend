import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// PrimeNG
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
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
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  username: string;
  currentUser: any;
  appName = 'S.I.G.';

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
        icon: 'pi pi-users',
        command: () => this.router.navigateByUrl('/empleados'),
      },
      {
        label: 'Contratos',
        icon: 'pi pi-file',
        command: () => this.router.navigateByUrl('/contratos'),
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
    ];
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.name;
    }
  }
}
