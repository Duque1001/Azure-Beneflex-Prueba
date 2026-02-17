import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  constructor(
    private msal: MsalService,
    private router: Router,
    private userService: UserService
  ) {}

  /*logout(): void {
    // Limpia el usuario en memoria de tu app
    this.userService.setUser(null);

    // Cierra sesión en Microsoft (Entra ID) y vuelve a la landing
    this.msal.logoutRedirect({
      postLogoutRedirectUri: window.location.origin, // vuelve a la raíz: LandingComponent
    });

    // this.router.navigate(['/']);
  }*/
    logout(): void {
      // Limpiar usuario en memoria
      this.userService.setUser(null);

      // Limpiar almacenamiento local por seguridad
      localStorage.clear();
      sessionStorage.clear();

      // Cerrar sesión completamente en Microsoft
      this.msal.logoutRedirect({
        account: this.msal.instance.getActiveAccount() || undefined,
        postLogoutRedirectUri: window.location.origin, // vuelve a Landing ('/')
      });
    }

}

