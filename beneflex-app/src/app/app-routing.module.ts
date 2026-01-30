/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { AprobarSolicitudesComponent } from './pages/aprobar-solicitudes/aprobar-solicitudes.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  // Landing: pantalla morada, NO usa layout
  { path: '', component: LandingComponent },

  // App protegida: usa layout con header/sidebar
  {
    path: 'app',
    component: AuthLayoutComponent,
    canActivate: [MsalGuard],
    children: [
      { path: '', component: VacacionesComponent },
      { path: 'mis-solicitudes', component: MisSolicitudesComponent },
      { path: 'aprobaciones', component: AprobarSolicitudesComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}*/

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  // Landing: pantalla morada, NO usa layout
  { path: '', component: LandingComponent },

  // App protegida: usa layout con header/sidebar
  {
    path: 'app',
    component: AuthLayoutComponent,
    canActivate: [MsalGuard],
    children: [
      { path: '', component: VacacionesComponent },
      { path: 'mis-solicitudes', component: MisSolicitudesComponent },

      // Standalone: se carga con loadComponent
      {
        path: 'aprobaciones',
        loadComponent: () =>
          import('./pages/aprobar-solicitudes/aprobar-solicitudes.component')
            .then(m => m.AprobarSolicitudesComponent),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
