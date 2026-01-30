/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalRequestsService, PendingRequest } from '../../core/services/approval-requests.service';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css',
})
export class AprobarSolicitudesComponent implements OnInit {

  solicitudes: PendingRequest[] = [];
  cargando = false;
  errorMsg = '';

  constructor(private service: ApprovalRequestsService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes(): void {
    this.cargando = true;
    this.errorMsg = '';

    this.service.getPendientes().subscribe({
      next: (data: PendingRequest[]) => {
        console.log('Pendientes RAW:', data);
        this.solicitudes = Array.isArray(data) ? data : [];
        this.cargando = false;
      },
      error: (err: unknown) => {
        console.error('Error cargando pendientes', err);
        this.errorMsg = 'No se pudieron cargar las aprobaciones.';
        this.cargando = false;
      },
    });
  }

  // Solo si existe endpoint real en backend
  aprobar(id: number): void {
    console.warn('No existe endpoint para aprobar aún. id:', id);
    // this.service.updateStatus(id, 'APPROVED').subscribe(() => this.cargarPendientes());
  }

  rechazar(id: number): void {
    console.warn('No existe endpoint para rechazar aún. id:', id);
    // this.service.updateStatus(id, 'REJECTED').subscribe(() => this.cargarPendientes());
  }
}*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalRequestsService, PendingRequestUI } from '../../core/services/approval-requests.service';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css',
})
export class AprobarSolicitudesComponent implements OnInit {

  solicitudes: PendingRequestUI[] = [];
  cargando = false;

  constructor(private service: ApprovalRequestsService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes(): void {
    this.cargando = true;

    this.service.getPendientes().subscribe({
      next: (data) => {
        console.log('Pendientes UI:', data);
        this.solicitudes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando pendientes', err);
        this.cargando = false;
      }
    });
  }

  aprobar(id: number): void {
    console.warn('Falta endpoint aprobar. id:', id);
  }

  rechazar(id: number): void {
    console.warn('Falta endpoint rechazar. id:', id);
  }
}

