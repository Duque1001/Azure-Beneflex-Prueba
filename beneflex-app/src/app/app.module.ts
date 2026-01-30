/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// MSAL
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptor,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';

import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation
} from '@azure/msal-browser';

// Environment
import { environment } from '../environments/environment';

export function msalInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: `https://login.microsoftonline.com/${environment.msal.tenantId}`,
      redirectUri: window.location.origin
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  });
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['openid', 'profile', 'email']
    }
  };
}

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  // Todas las llamadas a tu API llevarán token
  //protectedResourceMap.set(environment.apiUrl, ['openid', 'profile', 'email']);
  protectedResourceMap.set(environment.functionsApiBaseUrl, ['openid', 'profile', 'email']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    //AppComponent,
    HeaderComponent,
    SidebarComponent,
    AuthLayoutComponent,
    VacacionesComponent,
    BenefitCardComponent,
    SolicitudModalComponent,
    MisSolicitudesComponent,
    //AprobarSolicitudesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MsalModule,
    AppComponent,
    FormsModule,
    CommonModule,
  ],
  providers: [
    // Providers MSAL
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: msalGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: msalInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,

    // Interceptor (Bearer token a API)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { AprobarSolicitudesComponent } from './pages/aprobar-solicitudes/aprobar-solicitudes.component';

import { BenefitCardComponent } from './shared/benefit-card/benefit-card.component';
import { SolicitudModalComponent } from './shared/solicitud-modal/solicitud-modal.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

// MSAL
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptor,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';

import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation
} from '@azure/msal-browser';

import { environment } from '../environments/environment';

export function msalInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: `https://login.microsoftonline.com/${environment.msal.tenantId}`,
      redirectUri: window.location.origin
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage
    }
  });
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['openid', 'profile', 'email']
    }
  };
}

export function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.functionsApiBaseUrl, ['openid', 'profile', 'email']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    AuthLayoutComponent,
    VacacionesComponent,
    BenefitCardComponent,
    SolicitudModalComponent,
    MisSolicitudesComponent,
    ConfirmDialogComponent,
    AprobarSolicitudesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MsalModule,

    AppComponent
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: msalInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: msalGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: msalInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
