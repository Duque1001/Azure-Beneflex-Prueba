import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { BenefitCardComponent } from './shared/benefit-card/benefit-card.component';
import { SolicitudModalComponent } from './shared/solicitud-modal/solicitud-modal.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { AprobarSolicitudesComponent } from './pages/aprobar-solicitudes/aprobar-solicitudes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    VacacionesComponent,
    BenefitCardComponent,
    SolicitudModalComponent,
    MisSolicitudesComponent,
    AprobarSolicitudesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
