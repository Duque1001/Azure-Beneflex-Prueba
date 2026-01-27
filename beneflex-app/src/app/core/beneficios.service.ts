/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficio } from './models/beneficio.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/benefits/user/${userId}`);
  }

  crearSolicitud(payload: {
    userId: number;
    benefitId: number;
    requestedDays: number;
    startDate: string;
    endDate?: string | null;
    comment?: string;
  }) {
    return this.http.post(`${this.apiUrl}/benefit-requests`, payload);
  }
}*/ // Wilson

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Benefit {
  id: number;
  title: string;
  days: number;
  allowsRange: boolean;
}

@Injectable({ providedIn: 'root' })
export class BeneficiosService {
  private benefitsFnBase =
    'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  getByUser(userId: number): Observable<Benefit[]> {
    return this.http
      .get<any>(`${this.benefitsFnBase}/get-user-benefits?userId=${userId}`)
      .pipe(
        map((res) => {
          // Ajusta dependiendo de cómo responda tu Function:
          const items = Array.isArray(res) ? res : (res?.data ?? res?.items ?? []);
          return items.map((x: any, i: number) => ({
            id: Number(x.id ?? i + 1),
            title: String(x.title ?? x.name ?? x.benefit ?? 'Beneficio'),
            days: Number(x.days ?? x.available_days ?? x.availableDays ?? 0),
            allowsRange: Boolean(x.allowsRange ?? x.allows_range ?? true),
          }));
        })
      );
  }
}

