import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface MyRequest {
  id: number;
  benefit_name?: string;
  requested_days?: number;
  status?: RequestStatus;
  start_date?: string;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class RequestsService {
  constructor(private http: HttpClient) {}

  getMyRequests(userId: number): Observable<MyRequest[]> {
    const params = new HttpParams().set('userId', String(userId));
    return this.http.get<MyRequest[]>(environment.myRequestsApiUrl, { params });
  }

  updateRequestStatus(payload: { requestId: number; status: RequestStatus; comment?: string }): Observable<any> {
    // Endpoint POST
    return this.http.post(environment.updateRequestStatusApiUrl, payload);
  }
}
