import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Beneficio } from './models/beneficio.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.benefitsApiUrl;

  constructor(private http: HttpClient) { }

  //  Obtener beneficios
  getBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(`${this.baseUrl}/benefits`);
  }

  //  Crear solicitud
  crearSolicitud(payload: {
    benefitId: number;
    startDate: string;
    days: number;
    comment?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/benefit-requests`, payload);
  }
}
