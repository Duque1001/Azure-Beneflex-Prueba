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
import { ApprovalRequestsService } from '../../core/services/approval-requests.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})
export class AprobarSolicitudesComponent implements OnInit {

  solicitudes: any[] = [];

  constructor(private service: ApprovalRequestsService) {}

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.service.getPendientes().subscribe({
      next: (data: any[]) => {
        this.solicitudes = data;
      },
      error: (err: unknown) => {
        console.error('Error cargando pendientes', err);
      }
    });
  }

  aprobar(id: number) {
    this.service.updateStatus(id, 'APPROVED').subscribe(() => {
      this.cargarPendientes();
    });
  }

  rechazar(id: number) {
    this.service.updateStatus(id, 'REJECTED').subscribe(() => {
      this.cargarPendientes();
    });
  }
}

