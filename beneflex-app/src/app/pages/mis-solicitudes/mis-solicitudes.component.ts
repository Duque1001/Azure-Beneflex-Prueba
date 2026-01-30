/*import { Component, OnInit } from '@angular/core';
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
}*/

import { Component, OnInit } from '@angular/core';
import { BenefitRequestsService } from '../../core/services/benefit-requests.service';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: false,
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent implements OnInit {

  solicitudes: any[] = [];

  constructor(
    private service: BenefitRequestsService,
    private userService: UserService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const userId = this.userService.getUserId();

    // Si el get-me aún no terminó, reintenta en 500ms
    if (!userId) {
      setTimeout(() => this.cargarSolicitudes(), 500);
      return;
    }

    /*this.service.getByUser(userId).subscribe({
      next: (data: any) => {
        console.log('Solicitudes recibidas RAW:', data);

        // Por si el backend devuelve { data: [...] }
        this.solicitudes = Array.isArray(data) ? data : (data?.data ?? []);
      },
      error: (err: any) => {
        console.error('Error cargando solicitudes', err);
        this.notify.error('No se pudieron cargar tus solicitudes');
      }
    });*/
    this.service.getMyRequests().subscribe({
      next: (data: any) => {
        console.log('Solicitudes recibidas RAW:', data);
        this.solicitudes = Array.isArray(data) ? data : (data?.data ?? []);
      },
      error: (err: any) => console.error('Error cargando solicitudes', err)
    });

  }
}

