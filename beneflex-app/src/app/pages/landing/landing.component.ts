import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  standalone: false,
})
export class LandingComponent {
  constructor(private msal: MsalService, private router: Router) {}

  ingresar() {
    // Redirige a Microsoft Entra ID
    this.msal.loginRedirect({
      scopes: ['openid', 'profile', 'email'],
      redirectStartPage: window.location.origin + '/app',
    });
  }
}
