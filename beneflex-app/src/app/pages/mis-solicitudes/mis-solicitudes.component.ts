/*import { Component, OnInit } from '@angular/core';
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

    // this.service.getByUser(userId).subscribe({
    //   next: (data: any) => {
    //     console.log('Solicitudes recibidas RAW:', data);

    //     // Por si el backend devuelve { data: [...] }
    //     this.solicitudes = Array.isArray(data) ? data : (data?.data ?? []);
    //   },
    //   error: (err: any) => {
    //     console.error('Error cargando solicitudes', err);
    //     this.notify.error('No se pudieron cargar tus solicitudes');
    //   }
    // });
    this.service.getMyRequests().subscribe({
      next: (data: any) => {
        console.log('Solicitudes recibidas RAW:', data);
        this.solicitudes = Array.isArray(data) ? data : (data?.data ?? []);
      },
      error: (err: any) => console.error('Error cargando solicitudes', err)
    });

  }
}*/

import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { MyRequest, RequestsService, RequestStatus } from '../../core/services/requests.service';
import { benefitIconSrc } from '../../shared/utils/benefit-icon.util';


@Component({
  selector: 'app-mis-solicitudes',
  standalone: false,
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.css'
})
export class MisSolicitudesComponent implements OnInit {

  cargando = false;
  solicitudes: MyRequest[] = [];

  // popup confirmación
  confirmVisible = false;
  confirmTitle = 'Confirmar cancelación';
  confirmMessage = '¿Estás seguro de que deseas cancelar esta solicitud?';

  private requestToCancel: MyRequest | null = null;

  constructor(
    private requestsService: RequestsService,
    private userService: UserService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    //const userId = this.userService.getUserId();
    const userId = this.userService.getUser()?.id;
    if (!userId) {
      this.notify.error('Aún no se ha cargado tu usuario. Intenta nuevamente en unos segundos.');
      return;
    }

    this.cargando = true;
    this.requestsService.getMyRequests(Number(userId)).subscribe({
      next: (data: MyRequest[]) => {
        const all = Array.isArray(data) ? data : [];

        this.solicitudes = all.filter( req => (req.status ?? 'PENDIENTE') === 'PENDIENTE');

        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error cargando mis solicitudes', err);
        this.cargando = false;
        this.notify.error('No se pudieron cargar tus solicitudes');
      }
    });
  }

  formatFechaLarga(dateStr?: string): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '—';

    return d.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  // icono según beneficio
  iconSrcFor(name?: string): string | null {
    return benefitIconSrc(name ?? '');
  }

  canCancel(req: MyRequest): boolean {
    // solo se cancela si está pendiente
    return (req.status || 'PENDIENTE') === 'PENDIENTE';
  }

  onClickCancel(req: MyRequest): void {
    if (!this.canCancel(req)) return;

    this.requestToCancel = req;
    this.confirmVisible = true;
  }

  onCancelPopup(): void {
    this.confirmVisible = false;
    this.requestToCancel = null;
  }

  onConfirmPopup(): void {
    if (!this.requestToCancel) return;

    const payload = {
      requestId: this.requestToCancel.id,
      status: 'CANCELLED' as RequestStatus,
      comment: ''
    };

    this.requestsService.updateRequestStatus(payload).subscribe({
      next: () => {
        this.notify.success('Solicitud cancelada correctamente');
        this.confirmVisible = false;
        this.requestToCancel = null;
        this.cargar(); // refresca lista
      },
      error: (err: any) => {
        console.error('Error cancelando solicitud', err);
        this.notify.error('No se pudo cancelar la solicitud');
        this.confirmVisible = false;
        this.requestToCancel = null;
      }
    });
  }
}


