import { Injectable } from '@angular/core';
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
}
