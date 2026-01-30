import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApprovalRequestsService {

  private apiUrl = environment.approvalsApiUrl;

  constructor(private http: HttpClient) {}

  getPendientes() {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  updateStatus(id: number, status: 'APPROVED' | 'REJECTED') {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
}
