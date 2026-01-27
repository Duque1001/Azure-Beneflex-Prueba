import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BenefitRequestsService {

  //private apiUrl = 'http://localhost:3000/benefit-requests';
  private apiUrl = `${environment.apiUrl}/benefit-requests`;

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

  crearSolicitud(request: any) {
    return this.http.post(`${this.apiUrl}`, request);
  }

}
