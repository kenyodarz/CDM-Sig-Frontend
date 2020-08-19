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
import { ContratosComponent } from './components/contratos/contratos.component';
import { CapacitacionesComponent } from './components/capacitaciones/capacitaciones.component';
import { AsignarEmpleadosComponent } from './components/capacitaciones/asignar-empleados.component';
import { EliminarEmpleadosComponent } from './components/capacitaciones/eliminar-empleados.component';
import { ByempleadosComponent } from './components/capacitaciones/byempleados/byempleados.component';
import { IncapacidadesComponent } from './components/incapacidades/incapacidades.component';
import { IByempleadoComponent } from './components/incapacidades/i-byempleado/i-byempleado.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { EByempleadoComponent } from './components/examenes/e-byempleado/e-byempleado.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { DByempleadoComponent } from './components/documentos/d-byempleado/d-byempleado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    EmpleadosComponent,
    ContratosComponent,
    CapacitacionesComponent,
    AsignarEmpleadosComponent,
    EliminarEmpleadosComponent,
    ByempleadosComponent,
    IncapacidadesComponent,
    IByempleadoComponent,
    ExamenesComponent,
    EByempleadoComponent,
    DocumentosComponent,
    DByempleadoComponent,
  ],
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
