/*import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from '../../core/beneficios.service';
import { BeneficioCard } from '../../core/models/beneficio-card.model';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-vacaciones',
  standalone: false,
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent implements OnInit {

  beneficios: BeneficioCard[] = [];
  beneficioSeleccionado: BeneficioCard | null = null;

  modalVisible = false;

  constructor(
    private beneficiosService: BeneficiosService,
    private notify: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cargarBeneficios();
  }

  cargarBeneficios() {
    const userId = this.userService.getUserId();

    if (!userId) {
      // Esto pasa si aún no terminó el get-me
      console.warn('Usuario no cargado aún (get-me no ha terminado).');
      this.notify.error('Aún no se ha cargado tu usuario. Intenta nuevamente en unos segundos.');
      return;
    }

    // Si tu service ya tiene getBeneficios() (recomendado), usa esto:
    this.beneficiosService.getBeneficios().subscribe({
      next: (data: BeneficioCard[]) => {
        console.log('Beneficios recibidos:', data);
        this.beneficios = data;
      },
      error: (err: any) => {
        console.error('Error cargando beneficios', err);
        this.notify.error('No se pudieron cargar los beneficios');
      }
    });
  }

  abrirModal(beneficio: BeneficioCard) {
    this.beneficioSeleccionado = beneficio;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.beneficioSeleccionado = null;
  }

  enviarSolicitud(payload: any) {
    if (!this.beneficioSeleccionado) return;

    const userId = this.userService.getUserId();
    if (!userId) {
      this.notify.error('No se ha cargado tu usuario. Vuelve a intentar.');
      return;
    }

    const request = {
      userId: Number(userId),
      benefitId: Number(this.beneficioSeleccionado.id),
      requestedDays: Number(payload.dias),
      startDate: payload.fecha,
      endDate: null,
      comment: payload.comentario
    };

    console.log('Request enviado:', request);

    this.beneficiosService.crearSolicitud(request).subscribe({
      next: () => {
        this.modalVisible = false;
        this.beneficioSeleccionado = null;
        this.cargarBeneficios();
        this.notify.success('Solicitud creada correctamente');
      },
      error: (err: any) => {
        console.error('Error creando solicitud', err);
        if (err?.status === 0) this.notify.error('Bloqueado por CORS o red');
        else this.notify.error(`Error ${err?.status}: No se pudo crear la solicitud`);
      }
    });
  }
}*/ //Duque

import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from '../../core/beneficios.service';
import { BeneficioCard } from '../../core/models/beneficio-card.model';
import { NotificationService } from '../../shared/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { benefitIconSrc } from '../../shared/utils/benefit-icon.util';

@Component({
  selector: 'app-vacaciones',
  standalone: false,
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent implements OnInit {

  beneficios: BeneficioCard[] = [];
  beneficioSeleccionado: BeneficioCard | null = null;

  modalVisible = false;

  // evita loop infinito si el get-me nunca llega
  private readonly MAX_RETRIES = 20;
  private retries = 0;

  constructor(
    private beneficiosService: BeneficiosService,
    private notify: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cargarBeneficios();
  }

  cargarBeneficios(): void {
    //const userId = this.userService.getUserId();
    const userId = this.userService.getUser()?.id;

    // Reintenta hasta que el get-me haya cargado el usuario
    if (!userId) {
      this.retries++;

      if (this.retries > this.MAX_RETRIES) {
        console.error('No se pudo cargar el usuario (get-me). Se superó el límite de reintentos.');
        this.notify.error('No se pudo cargar tu usuario. Recarga la página e intenta de nuevo.');
        return;
      }

      console.warn(`Usuario no cargado aún (get-me no ha terminado). Reintentando... (${this.retries}/${this.MAX_RETRIES})`);
      setTimeout(() => this.cargarBeneficios(), 500);
      return;
    }

    // Reset retries si ya tenemos usuario
    this.retries = 0;

     const obs$ = (this.beneficiosService as any).getBeneficiosPorUsuario
      ? (this.beneficiosService as any).getBeneficiosPorUsuario(Number(userId))
      : this.beneficiosService.getBeneficios();

    obs$.subscribe({
      next: (data: any) => {
        console.log('Beneficios recibidos RAW:', data);

        const arr = Array.isArray(data) ? data : (data?.data ?? []);

        this.beneficios = arr.map((x: any) => {
          const title = String(x.name ?? '');
          return {
            id: Number(x.id),
            title,
            days: Number(x.available_days ?? 0),
            usedDays: Number(x.used_days ?? 0),
            iconSrc: benefitIconSrc(title)
          } as BeneficioCard;
        });

        console.log('Beneficios mapeados UI:', this.beneficios);
      },
      error: (err: any) => {
        console.error('Error cargando beneficios', err);
        this.notify.error('No se pudieron cargar los beneficios');
      }
    });
  }

  abrirModal(beneficio: BeneficioCard): void {
    this.beneficioSeleccionado = beneficio;
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.beneficioSeleccionado = null;
  }

  enviarSolicitud(payload: any): void {
    if (!this.beneficioSeleccionado) return;

    //const userId = this.userService.getUserId();
    const userId = this.userService.getUser()?.id;
    if (!userId) {
      this.notify.error('No se ha cargado tu usuario. Vuelve a intentar.');
      return;
    }

    const request = {
      userId: Number(userId),
      benefitId: Number(this.beneficioSeleccionado.id),
      requestedDays: Number(payload.dias),
      startDate: payload.fecha,
      endDate: null,
      comment: payload.comentario
    };

    console.log('Request enviado:', request);

    this.beneficiosService.crearSolicitud(request).subscribe({
      next: () => {
        this.modalVisible = false;
        this.beneficioSeleccionado = null;
        this.cargarBeneficios();
        this.notify.success('Solicitud creada correctamente');
      },
      error: (err: any) => {
        console.error('Error creando solicitud', err);
        if (err?.status === 0) this.notify.error('Bloqueado por CORS o red');
        else this.notify.error(`Error ${err?.status}: No se pudo crear la solicitud`);
      }
    });
  }
}


