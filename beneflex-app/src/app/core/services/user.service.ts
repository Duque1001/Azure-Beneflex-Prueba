import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: any;

  setUser(user: any) { this.user = user; }
  getUser() { return this.user; }

  getUserId(): number { return this.user?.id; }

  isLeader(): boolean {
    return this.user?.role === 'LEADER';
  }
}
