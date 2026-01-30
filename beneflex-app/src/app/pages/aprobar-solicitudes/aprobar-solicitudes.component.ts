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

  currentIndex = 0;
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

  // ✅ dd-MM-yyyy
  formatDateDDMMYYYY(value?: string): string {
    if (!value) return '—';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '—';

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  aprobar(): void {
    const req = this.current;
    if (!req) return;

    // Cuando exista endpoint real, aquí llamas el service con req.id y comentario
    this.notify.success(`Aprobado (demo) - solicitud #${req.id}`);
  }

  rechazar(): void {
    const req = this.current;
    if (!req) return;

    this.notify.success(`Rechazado (demo) - solicitud #${req.id}`);
  }
}


