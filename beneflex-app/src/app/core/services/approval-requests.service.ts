/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type PendingRequest = {
  id: number;
  user_id?: number;
  benefit_id?: number;
  requested_days?: number;
  status?: string;
  created_at?: string;

  // por si el backend ya hace join
  user?: { nombre?: string; name?: string; email?: string };
  benefit?: { name?: string; title?: string };
};

@Injectable({ providedIn: 'root' })
export class ApprovalRequestsService {
  constructor(private http: HttpClient) {}

  // Endpoint
  getPendientes(): Observable<PendingRequest[]> {
    return this.http.get<PendingRequest[]>(environment.pendingRequestsApiUrl);
  }

  // endpoint para aprobar/rechazar

  // updateStatus(id: number, status: 'APPROVED' | 'REJECTED'): Observable<any> {
  //   return this.http.patch(environment.updateRequestStatusApiUrl, { id, status });
  // }

}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export type PendingRequestUI = {
  id: number;
  userName: string;
  benefitName: string;
  requestedDays: number;
  status: string;
  startDate: string | null;
  raw: any;
};

@Injectable({ providedIn: 'root' })
export class ApprovalRequestsService {
  constructor(private http: HttpClient) {}

  getPendientes(): Observable<PendingRequestUI[]> {
    return this.http.get<any>(environment.pendingRequestsApiUrl).pipe(
      map((resp) => {
        const arr = Array.isArray(resp) ? resp : (resp?.data ?? []);
        return (arr ?? []).map((r: any) => ({
          id: Number(r.id),
          userName: r.employee_name ?? '—',
          benefitName: r.benefit_name ?? '—',
          requestedDays: Number(r.requested_days ?? 0),
          status: String(r.status ?? 'PENDING'),
          startDate: r.start_date ?? null,
          raw: r,
        }));
      })
    );
  }
}


