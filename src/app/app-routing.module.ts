import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
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
