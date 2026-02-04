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

/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type PendingRequestApi = {
  id: number;
  employee_name?: string;
  benefit_name?: string;
  requested_days?: number;
  start_date?: string;
  status?: string;
};

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestsService {

  constructor(private http: HttpClient) {}

  getPendientes(): Observable<PendingRequestApi[]> {
    return this.http.get<PendingRequestApi[]>(environment.pendingRequestsApiUrl);
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type PendingRequestApi = {
  id: number;
  employee_name?: string;
  benefit_name?: string;
  requested_days?: number;
  start_date?: string;
  status?: string;
};

export type UpdateRequestStatusPayload = {
  requestId: number;
  status: 'APPROVED' | 'REJECTED';
  comment: string;
};

@Injectable({
  providedIn: 'root'
})
export class ApprovalRequestsService {
  constructor(private http: HttpClient) {}

  getPendientes(): Observable<PendingRequestApi[]> {
    return this.http.get<PendingRequestApi[]>(environment.pendingRequestsApiUrl);
  }

  // Llamar API para aprobar/rechazar
  updateRequestStatus(payload: UpdateRequestStatusPayload): Observable<any> {
    // POST para update.

    return this.http.post(environment.updateRequestStatusApiUrl, payload);
  }
}



