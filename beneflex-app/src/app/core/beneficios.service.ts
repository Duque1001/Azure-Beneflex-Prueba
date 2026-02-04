/*import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BeneficioCard } from './models/beneficio-card.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {

  // Azure Function
  private benefitsApiUrl =
    'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-user-benefits';

  // API local para solicitudes
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getByUser(userId: number): Observable<BeneficioCard[]> {
    const params = new HttpParams().set('userId', String(userId));

    return this.http.get<any>(this.benefitsApiUrl, { params }).pipe(
      map((res: any) => {
        const arr: any[] = Array.isArray(res) ? res : (res?.data ?? res?.benefits ?? []);
        return arr.map(this.toBeneficioCard);
      })
    );
  }

  private toBeneficioCard(b: any): BeneficioCard {
    const id = Number(b?.id ?? b?.benefitId ?? 0);

    const title = String(
      b?.title ??
      b?.name ??
      b?.benefit_name ??
      'Beneficio'
    );

    const days = Number(
      b?.days ??
      b?.max_days_per_year ??
      b?.available_days ??
      0
    );

    return { id, title, days };
  }

  crearSolicitud(payload: {
    userId: number;
    benefitId: number;
    requestedDays: number;
    startDate: string;
    endDate?: string | null;
    comment?: string;
  }) {
    const url =
      'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/create-benefit-request';

    return this.http.post(url, payload);
  }
}*/ //Duque

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  // Obtiene los beneficios del usuario autenticado

  getBeneficios(): Observable<any> {
    const userId = this.userService.getUserId();

    if (!userId) {
      return throwError(() => new Error('Usuario no cargado aún'));
    }

    const url = `${environment.benefitsApiUrl}?userId=${userId}`;
    return this.http.get(url);
  }

  // Crear una nueva solicitud de beneficio

  crearSolicitud(data: any): Observable<any> {
    const userId = this.userService.getUserId();

    if (!userId) {
      return throwError(() => new Error('Usuario no cargado aún'));
    }

    return this.http.post(environment.createBenefitApiUrl, {
      userId,
      ...data
    });
  }
}

