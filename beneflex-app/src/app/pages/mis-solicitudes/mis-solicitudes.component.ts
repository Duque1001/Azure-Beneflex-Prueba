import { Component, OnInit } from '@angular/core';
import { BenefitRequestsService } from '../../core/services/benefit-requests.service';


@Component({
  selector: 'app-mis-solicitudes',
  standalone: false,
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent implements OnInit {

  solicitudes: any[] = [];
  userId = 1; // luego vendrá de auth

  constructor(private service: BenefitRequestsService) { }

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.service.getByUser(this.userId).subscribe({
      next: data => this.solicitudes = data,
      error: err => console.error('Error cargando solicitudes', err)
    });
  }
}
