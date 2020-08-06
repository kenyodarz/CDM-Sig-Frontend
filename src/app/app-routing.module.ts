import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
