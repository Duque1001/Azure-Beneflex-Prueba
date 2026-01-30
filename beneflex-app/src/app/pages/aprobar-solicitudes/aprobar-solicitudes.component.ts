/*import { Component, OnInit } from '@angular/core';
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
}*/

import { Component, OnInit } from '@angular/core';
import { ApprovalRequestsService } from '../../core/services/approval-requests.service';
import { NotificationService } from '../../shared/services/notification.service';

type PendingRequest = {
  id: number;
  employee_name?: string;
  benefit_name?: string;
  requested_days?: number;
  start_date?: string;
  status?: string;
  comment?: string;
};

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})
export class AprobarSolicitudesComponent implements OnInit {

  cargando = false;
  solicitudes: PendingRequest[] = [];

  // navegación
  currentIndex = 0;

  // comentario del aprobador
  comentario = '';

  constructor(
    private service: ApprovalRequestsService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes(): void {
    this.cargando = true;

    this.service.getPendientes().subscribe({
      next: (data: any) => {
        // el API te devuelve array directo
        this.solicitudes = Array.isArray(data) ? data : (data?.data ?? []);
        this.currentIndex = 0;
        this.comentario = '';
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error cargando pendientes', err);
        this.cargando = false;
        this.notify.error('No se pudieron cargar las aprobaciones pendientes');
      }
    });
  }

  get total(): number {
    return this.solicitudes.length;
  }

  get current(): PendingRequest | null {
    if (!this.solicitudes.length) return null;
    return this.solicitudes[this.currentIndex] ?? null;
  }

  prev(): void {
    if (!this.total) return;
    this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
    this.comentario = '';
  }

  next(): void {
    if (!this.total) return;
    this.currentIndex = (this.currentIndex + 1) % this.total;
    this.comentario = '';
  }

  aprobar(): void {
    const req = this.current;
    if (!req) return;

    // endpoint real de aprobar/rechazar
    this.notify.success(`Aprobado (demo) - solicitud #${req.id}`);
    // cuando haya endpoint , aquí llamar al service y luego refrescar
    // this.service.updateStatus(req.id, 'APPROVED', this.comentario).subscribe(...)
  }

  rechazar(): void {
    const req = this.current;
    if (!req) return;

    this.notify.success(`Rechazado (demo) - solicitud #${req.id}`);
    // cuando tengas endpoint, llamar service y refrescar
  }
}


