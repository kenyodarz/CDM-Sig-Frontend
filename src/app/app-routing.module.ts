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
