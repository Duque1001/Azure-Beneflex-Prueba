/*import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: any;

  setUser(user: any) { this.user = user; }
  getUser() { return this.user; }

  getUserId(): number { return this.user?.id; }

  isLeader(): boolean {
    return this.user?.role === 'LIDER';
  }
}*/ //Duque

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userSubject = new BehaviorSubject<AppUser | null>(null);
  readonly user$ = this.userSubject.asObservable();

  setUser(user: AppUser | null) {
    this.userSubject.next(user);
  }

  getUser(): AppUser | null {
    return this.userSubject.value;
  }

  isLeader(): boolean {
    const role = (this.userSubject.value?.role ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();

    return role === 'LIDER';
  }
}


