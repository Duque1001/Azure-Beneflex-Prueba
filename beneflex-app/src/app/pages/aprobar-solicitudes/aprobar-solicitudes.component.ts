import { Component, OnInit } from '@angular/core';
import { BenefitRequestsService } from '../../core/services/benefit-requests.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-aprobar-solicitudes',
  standalone: false,
  templateUrl: './aprobar-solicitudes.component.html',
  styleUrl: './aprobar-solicitudes.component.css'
})


export class AprobarSolicitudesComponent implements OnInit {

  // EXISTE la propiedad usada en el HTML
  solicitudes: any[] = [];

  // constructor BIEN declarado, dentro de la clase
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

  /*aprobar(id: number) {
    this.service.updateStatus(id, 'APPROVED')
      .subscribe(() => this.cargarSolicitudes());
  }

  rechazar(id: number) {
    this.service.updateStatus(id, 'REJECTED')
      .subscribe(() => this.cargarSolicitudes());
  }*/

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

}
