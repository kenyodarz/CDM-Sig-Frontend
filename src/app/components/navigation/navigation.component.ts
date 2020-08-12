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
  items: MenuItem[];
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
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
      {
        label: 'Angular Website',
        icon: 'pi pi-external-link',
        url: 'http://angular.io',
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload',
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
