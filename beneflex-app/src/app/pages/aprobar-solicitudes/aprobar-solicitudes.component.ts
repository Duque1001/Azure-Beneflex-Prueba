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

/*import { Component, OnInit } from '@angular/core';
import { ApprovalRequestsService, PendingRequestApi } from '../../core/services/approval-requests.service';
import { NotificationService } from '../../shared/services/notification.service';

type PendingRequestUI = {
  id: number;
  employeeName: string;
  benefitName: string;
  requestedDays: number | null;
  startDateRaw: string | null;
  startDateUI: string; // dd-mm-aaaa
  status: string;
};

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})
export class AprobarSolicitudesComponent implements OnInit {

  cargando = false;
  solicitudes: PendingRequestUI[] = [];

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
      next: (data: PendingRequestApi[]) => {
        const arr = Array.isArray(data) ? data : [];

        this.solicitudes = arr.map((x) => ({
          id: x.id,
          employeeName: x.employee_name?.trim() || '—',
          benefitName: x.benefit_name?.trim() || '—',
          requestedDays: (x.requested_days ?? null),
          startDateRaw: x.start_date ?? null,
          startDateUI: this.toDDMMYYYY(x.start_date),
          status: (x.status || 'PENDING').toUpperCase(),
        }));

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

  // dd-mm-aaaa
  private toDDMMYYYY(iso?: string): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  get total(): number {
    return this.solicitudes.length;
  }

  get current(): PendingRequestUI | null {
    return this.total ? this.solicitudes[this.currentIndex] : null;
  }

  // Deshabilitar sin wrap-around
  get isFirst(): boolean {
    return this.currentIndex <= 0;
  }

  get isLast(): boolean {
    return this.total ? this.currentIndex >= this.total - 1 : true;
  }

  prev(): void {
    if (this.isFirst) return;
    this.currentIndex -= 1;
    this.comentario = '';
  }

  next(): void {
    if (this.isLast) return;
    this.currentIndex += 1;
    this.comentario = '';
  }

  aprobar(): void {
    const req = this.current;
    if (!req) return;

    // Demo (hasta que exista endpoint real)
    this.notify.success(`Aprobado (demo) - solicitud #${req.id}`);
  }

  rechazar(): void {
    const req = this.current;
    if (!req) return;

    // Demo (hasta que exista endpoint real)
    this.notify.success(`Rechazado (demo) - solicitud #${req.id}`);
  }
}*/

import { Component, OnInit } from '@angular/core';
import {
  ApprovalRequestsService,
  PendingRequestApi,
  UpdateRequestStatusPayload
} from '../../core/services/approval-requests.service';
import { NotificationService } from '../../shared/services/notification.service';
import { benefitIconSrc } from '../../shared/utils/benefit-icon.util';

type PendingRequestUI = {
  id: number;
  employeeName: string;
  benefitName: string;

  /** Ruta del icono para mostrar en UI */
  iconSrc: string | null;

  requestedDays: number | null;
  startDateRaw: string | null;
  startDateUI: string; // dd-mm-aaaa
  status: string;
};

type Decision = 'APPROVED' | 'REJECTED';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})
export class AprobarSolicitudesComponent implements OnInit {

  cargando = false;
  solicitudes: PendingRequestUI[] = [];

  currentIndex = 0;
  comentario = '';

  // Popup confirmación
  confirmVisible = false;
  pendingDecision: Decision | null = null;
  confirmText = '';

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
      next: (data: PendingRequestApi[]) => {
        const arr = Array.isArray(data) ? data : [];

        this.solicitudes = arr.map((x) => {
          const benefitName = x.benefit_name?.trim() || '—';

          return {
            id: Number(x.id),
            employeeName: x.employee_name?.trim() || '—',
            benefitName,
            iconSrc: benefitIconSrc(benefitName), // aquí queda el icono
            requestedDays: (x.requested_days ?? null),
            startDateRaw: x.start_date ?? null,
            startDateUI: this.toDDMMYYYY(x.start_date),
            status: (x.status || 'PENDING').toUpperCase(),
          };
        });

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

  iconSrcFor(benefitName?: string | null): string | null {
    return benefitIconSrc((benefitName ?? '').trim());
  }

  private toDDMMYYYY(iso?: string | null): string {
    if (!iso) return '—';

    // Caso común: "2026-02-03"
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    let d: Date;

    if (m) {
      const yyyy = Number(m[1]);
      const mm = Number(m[2]);
      const dd = Number(m[3]);
      d = new Date(yyyy, mm - 1, dd); // local, sin desfase por UTC
    } else {
      d = new Date(iso);
    }

    if (isNaN(d.getTime())) return '—';

    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  get total(): number {
    return this.solicitudes.length;
  }

  get current(): PendingRequestUI | null {
    if (!this.total) return null;
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= this.total) this.currentIndex = this.total - 1;
    return this.solicitudes[this.currentIndex];
  }

  get isFirst(): boolean {
    return this.currentIndex <= 0;
  }

  get isLast(): boolean {
    return this.total ? this.currentIndex >= this.total - 1 : true;
  }

  prev(): void {
    if (this.isFirst) return;
    this.currentIndex -= 1;
    this.comentario = '';
  }

  next(): void {
    if (this.isLast) return;
    this.currentIndex += 1;
    this.comentario = '';
  }

  // CONFIRM POPUP FLOW
  openConfirm(decision: Decision): void {
    const req = this.current;
    if (!req) return;

    this.pendingDecision = decision;
    this.confirmText =
      decision === 'APPROVED'
        ? '¿Estás seguro de APROBAR esta solicitud?'
        : '¿Estás seguro de RECHAZAR esta solicitud?';

    this.confirmVisible = true;
  }

  closeConfirm(): void {
    this.confirmVisible = false;
    this.pendingDecision = null;
    this.confirmText = '';
  }

  confirmYes(): void {
    const req = this.current;
    const decision = this.pendingDecision;

    if (!req || !decision) {
      this.closeConfirm();
      return;
    }

    const payload: UpdateRequestStatusPayload = {
      requestId: req.id,
      status: decision,
      comment: (this.comentario || '').trim()
    };

    this.cargando = true;

    this.service.updateRequestStatus(payload).subscribe({
      next: () => {
        this.cargando = false;
        this.closeConfirm();

        this.notify.success(
          decision === 'APPROVED'
            ? `Solicitud #${req.id} aprobada`
            : `Solicitud #${req.id} rechazada`
        );

        // Quitar de la lista y mantener índice consistente
        this.solicitudes.splice(this.currentIndex, 1);

        if (this.currentIndex >= this.solicitudes.length) {
          this.currentIndex = Math.max(0, this.solicitudes.length - 1);
        }

        this.comentario = '';
      },
      error: (err: any) => {
        console.error('Error actualizando estado', err);
        this.cargando = false;
        this.closeConfirm();
        this.notify.error('No se pudo actualizar el estado de la solicitud');
      }
    });
  }
}
