/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenefitRequestsService {

  private apiUrl = environment.benefitsApiUrl;

  constructor(private http: HttpClient) { }

  // getByUser(userId: number): Observable<any[]> {
  // return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  // } //Duque

  getByUser(userId: number) {
    return this.http.get(`${environment.benefitsApiUrl}?userId=${userId}`);
  }

  getPendientes() {
    return this.http.get<any[]>(
      `${this.apiUrl}/pending`
    );
  }

  updateStatus(id: number, status: 'APPROVED' | 'REJECTED') {
    return this.http.patch(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  }

}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenefitRequestsService {

  // API correcta para mis solicitudes (filtra por usuario logueado)
  private myRequestsUrl = environment.myRequestsApiUrl;

  constructor(private http: HttpClient) {}

  // ya no recibe userId: el backend filtra por token
  getMyRequests(): Observable<any[]> {
    return this.http.get<any[]>(this.myRequestsUrl);
  }
}

