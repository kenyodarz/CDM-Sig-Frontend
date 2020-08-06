// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

//Servicios
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[];
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        this.messageService.add({
          severity: 'success',
          summary: '¡¡¡Correcto!!!',
          detail: 'Se ha Logueado Correctamente',
        });
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed:',
          detail: this.errorMessage,
        });
      }
    );
  }

  reloadPage() {
    window.location.replace('#/home');
    window.location.reload();
  }
}
