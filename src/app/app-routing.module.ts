import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
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
import { EntregasByEmpleadoComponent } from './components/entrega/entregas-by-empleado/entregas-by-empleado.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { VacacionesByEmpleadoComponent } from './components/vacaciones/vacaciones-by-empleado/vacaciones-by-empleado.component';
import { VacacionesPendientesComponent } from './components/vacaciones/vacaciones-pendientes/vacaciones-pendientes.component';
import { AusentismoComponent } from './components/ausentismo/ausentismo.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'capacitaciones', component: CapacitacionesComponent },
  {
    path: 'capacitaciones/asignar-empleados/:id',
    component: AsignarEmpleadosComponent,
  },
  {
    path: 'capacitaciones/eliminar-empleados/:id',
    component: EliminarEmpleadosComponent,
  },
  {
    path: 'capacitaciones/porempleado',
    component: ByempleadosComponent,
  },
  { path: 'incapacidades', component: IncapacidadesComponent },
  { path: 'incapacidades/porempleado', component: IByempleadoComponent },
  { path: 'examenes', component: ExamenesComponent },
  { path: 'examenes/porempleado', component: EByempleadoComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'documentos/porempleado', component: DByempleadoComponent },
  { path: 'varios', component: VariosComponent },
  { path: 'entregas', component: EntregaComponent },
  { path: 'entregas/porempleado', component: EntregasByEmpleadoComponent },
  { path: 'vacaciones', component: VacacionesComponent },
  { path: 'vacaciones/porempleado', component: VacacionesByEmpleadoComponent },
  { path: 'vacaciones/pendientes', component: VacacionesPendientesComponent },
  { path: 'ausentismo', component: AusentismoComponent },
  { path: 'recomendaciones', component: RecomendacionesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
