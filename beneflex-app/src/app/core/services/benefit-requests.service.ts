import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BenefitRequestsService {

  private apiUrl = 'http://localhost:3000/benefit-requests';

  constructor(private http: HttpClient) { }

  getByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
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



}
