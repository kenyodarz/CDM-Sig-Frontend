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
import { DialogService } from 'primeng/dynamicdialog';

// Pipe
import { FileSizePipe } from './filesize.pipe';

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
import { VariosComponent } from './components/varios/varios.component';
import { EntregaComponent } from './components/entrega/entrega.component';
import { ItemsComponent } from './components/entrega/items/items.component';
import { EntregasByEmpleadoComponent } from './components/entrega/entregas-by-empleado/entregas-by-empleado.component';
import { VacacionesByEmpleadoComponent } from './components/vacaciones/vacaciones-by-empleado/vacaciones-by-empleado.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { VacacionesPendientesComponent } from './components/vacaciones/vacaciones-pendientes/vacaciones-pendientes.component';

@NgModule({
  declarations: [
    AppComponent,
    FileSizePipe,
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
    VariosComponent,
    EntregaComponent,
    ItemsComponent,
    EntregasByEmpleadoComponent,
    VacacionesByEmpleadoComponent,
    VacacionesComponent,
    VacacionesPendientesComponent,
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
  providers: [
    MessageService,
    ConfirmationService,
    authInterceptorProviders,
    DialogService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
