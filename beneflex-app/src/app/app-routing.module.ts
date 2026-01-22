import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { AprobarSolicitudesComponent } from './pages/aprobar-solicitudes/aprobar-solicitudes.component';

const routes: Routes = [
  { path: '', component: VacacionesComponent },
  {
    path: 'mis-solicitudes',
    component: MisSolicitudesComponent
  },
  { path: 'aprobaciones', component: AprobarSolicitudesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
