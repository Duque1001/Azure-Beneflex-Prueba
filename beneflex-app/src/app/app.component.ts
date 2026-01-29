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

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, filter, takeUntil } from 'rxjs';
import { InteractionStatus } from '@azure/msal-browser';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private msal = inject(MsalService);
  private msalBroadcast = inject(MsalBroadcastService);
  private http = inject(HttpClient);
  private userService = inject(UserService);

  private readonly destroy$ = new Subject<void>();
  private loadedMe = false;

  async ngOnInit() {
    await this.msal.instance.initialize();
    const result = await this.msal.instance.handleRedirectPromise();

    if (result?.account) {
      this.msal.instance.setActiveAccount(result.account);
    } else {
      const accounts = this.msal.instance.getAllAccounts();
      if (accounts.length) this.msal.instance.setActiveAccount(accounts[0]);
    }

    this.msalBroadcast.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const account = this.msal.instance.getActiveAccount();
        if (account && !this.loadedMe) {
          this.loadedMe = true;
          this.loadMe();
        }
      });
  }

  private loadMe() {
    this.http.get(environment.meApiUrl).subscribe({
      next: (user) => {
        this.userService.setUser(user);
        console.log('Usuario cargado:', user);
      },
      error: (err) => {
        console.error('Error cargando usuario (get-me):', err);
        this.loadedMe = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

