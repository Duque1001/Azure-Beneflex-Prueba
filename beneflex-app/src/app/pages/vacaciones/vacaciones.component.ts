import { Component, OnInit } from '@angular/core';
import { BeneficiosService } from '../../core/beneficios.service';
import { Beneficio } from '../../core/models/beneficio.model';
import { BeneficioCard } from '../../core/models/beneficio-card.model';
import { ApiService } from '../../core/api.service';
import { NotificationService } from '../../shared/services/notification.service';
import { BenefitRequestsService } from '../../../app/core/services/benefit-requests.service';


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
  userId = 1; // luego lo sacamos del login

  constructor(
    private beneficiosService: BeneficiosService,
    private benefitRequestsService: BenefitRequestsService,
    private notify: NotificationService
  ) { }


  ngOnInit(): void {
    this.cargarBeneficios();
  }

  cargarBeneficios() {
    this.beneficiosService.getByUser(1).subscribe({
      next: (data: any[]) => {
        console.log('Beneficios recibidos:', data);

        this.beneficios = data.map(b => ({
          id: b.id,
          title: b.title,
          days: b.days,
          allowsRange: b.allowsRange
        }));
      },
      error: (err: any) => {
        console.error('Error cargando beneficios', err);
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

    const request = {
      userId: Number(this.userId),
      benefitId: Number(this.beneficioSeleccionado.id),
      requestedDays: Number(payload.dias),
      startDate: payload.fecha,
      endDate: null,
      comment: payload.comentario
    };

    console.log('Request enviado:', request);

    //this.beneficiosService.crearSolicitud(request).subscribe({
      this.benefitRequestsService.crearSolicitud(request).subscribe({
      next: () => {
        this.modalVisible = false;
        this.beneficioSeleccionado = null;
        this.cargarBeneficios(); // refresca tarjetas
        this.notify.success('Solicitud creada correctamente');
      },
      error: err => {
        console.error('Error creando solicitud', err.error);
        this.notify.error('No se pudo crear la solicitud');
      }
    });
  }



}



/*export class VacacionesComponent implements OnInit {

  beneficios: Beneficio[] = [];
  beneficioSeleccionado: Beneficio | null = null;
  modalVisible = false;

  constructor(private beneficiosService: BeneficiosService) { }

  ngOnInit() {
    this.beneficios = this.beneficiosService.getBeneficios();
  }

  abrirModal(beneficio: Beneficio) {
    this.beneficioSeleccionado = beneficio;
    this.modalVisible = true;
  }

  onSolicitar(beneficio: Beneficio) {
    this.beneficioSeleccionado = beneficio;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.beneficioSeleccionado = null;
  }

  enviarSolicitud(data: any) {
    alert(
      `Solicitaste ${data.dias} día(s) de ${data.beneficio.title}
     para la fecha ${data.fecha}`
    );

    this.cerrarModal();
  }
}*/
