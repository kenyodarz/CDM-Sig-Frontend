// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


// Modulos
import { AppRoutingModule } from './app-routing.module';
import { PrimengModule } from './primeng.module';

// Servicios
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NavigationComponent, EmpleadosComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
  ],
  providers: [MessageService, ConfirmationService, authInterceptorProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
