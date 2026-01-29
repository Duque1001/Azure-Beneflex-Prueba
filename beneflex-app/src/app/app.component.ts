/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'beneflex-app';
}*/ // wilson

/*import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private msal = inject(MsalService);

  async ngOnInit() {
    await this.msal.instance.initialize();
    const result = await this.msal.instance.handleRedirectPromise();

    if (result?.account) {
      this.msal.instance.setActiveAccount(result.account);
    } else {
      const accounts = this.msal.instance.getAllAccounts();
      if (accounts.length) this.msal.instance.setActiveAccount(accounts[0]);
    }
  }
}*/ //Duque

import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { UserService } from './core/services/user.service'; // ajusta ruta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private msal = inject(MsalService);
  private http = inject(HttpClient);
  private userService = inject(UserService);

  async ngOnInit() {
    // MSAL v3
    await this.msal.instance.initialize();

    // Si venimos de loginRedirect
    const result = await this.msal.instance.handleRedirectPromise();

    // Set active account
    if (result?.account) {
      this.msal.instance.setActiveAccount(result.account);
    } else {
      const accounts = this.msal.instance.getAllAccounts();
      if (accounts.length) this.msal.instance.setActiveAccount(accounts[0]);
    }

    // Ya con cuenta activa, llamamos al backend "get-me"
    // (si tu API está protegida por MSAL interceptor, aquí irá el token automáticamente)
    this.http
      .get('https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-me')
      .subscribe({
        next: (user: any) => {
          this.userService.setUser(user);
          console.log('Usuario cargado:', user);
        },
        error: (err) => {
          console.error('Error cargando usuario (/get-me):', err);
        }
      });
  }
}

