/*import { Component, OnInit } from '@angular/core';
import { BenefitRequestsService } from '../../core/services/benefit-requests.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})

export class AprobarSolicitudesComponent implements OnInit {

  // Existe la propiedad usada en el HTML
  solicitudes: any[] = [];

  // constructor
  constructor(private service: BenefitRequestsService) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.service.getPendientes().subscribe({
      next: data => {
        console.log('Solicitudes pendientes:', data);
        this.solicitudes = data;
      },
      error: err => {
        console.error('Error cargando pendientes', err);
      }
    });
  }

  // aprobar(id: number) {
  //   this.service.updateStatus(id, 'APPROVED')
  //     .subscribe(() => this.cargarSolicitudes());
  // }

  // rechazar(id: number) {
  //   this.service.updateStatus(id, 'REJECTED')
  //     .subscribe(() => this.cargarSolicitudes());
  // }

  aprobar(id: number) {
    this.service.updateStatus(id, 'APPROVED').subscribe(() => {
      this.cargarSolicitudes();
    });
  }

  rechazar(id: number) {
    this.service.updateStatus(id, 'REJECTED').subscribe(() => {
      this.cargarSolicitudes();
    });
  }

}*/

import { Component, OnInit } from '@angular/core';
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
}
