/*import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficio } from '../../core/models/beneficio.model';
import { BeneficioCard } from '../../core/models/beneficio-card.model';
import { NotificationService } from '../../shared/services/notification.service';


@Component({
  selector: 'app-solicitud-modal',
  standalone: false,
  templateUrl: './solicitud-modal.component.html',
  styleUrl: './solicitud-modal.component.css'
})
export class SolicitudModalComponent implements OnInit {

  @Input() beneficio!: BeneficioCard | null;
  @Input() visible = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      dias: [null, [Validators.required, Validators.min(0.5)]],
      comentario: ['']
    });
  }

  get maxDias(): number {
    return this.beneficio?.days ?? 0;
  }

  get diasDisponibles(): number[] {
    if (!this.beneficio || this.beneficio.days <= 0) return [];

    const dias: number[] = [];

    const total = this.beneficio.days;

    // Si tiene medio día
    if (total % 1 !== 0) {
      dias.push(0.5);
    }

    // Días completos
    for (let i = 1; i <= Math.floor(total); i++) {
      dias.push(i);
    }

    return dias;
  }

  onCerrar() {
    this.form.reset();
    this.cerrar.emit();
  }

  onConfirmar() {
    // Si está inválido, muestra mensaje y marca campos en rojo
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.error('Debes completar toda la información obligatoria para confirmar la solicitud');
      return;
    }

    this.confirmar.emit({
      ...this.form.value,
      beneficio: this.beneficio,
    });

    this.form.reset();
    this.cerrar.emit(); // cierra el modal al confirmar
  }
}*/

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { BeneficioCard } from '../../core/models/beneficio-card.model';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-solicitud-modal',
  standalone: false,
  templateUrl: './solicitud-modal.component.html',
  styleUrl: './solicitud-modal.component.css'
})
export class SolicitudModalComponent implements OnInit {

  @Input() beneficio!: BeneficioCard | null;
  @Input() visible = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

  form!: FormGroup;

  // minDate en formato YYYY-MM-DD
  minDate = this.formatLocalDate(new Date());

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: ['', [Validators.required, this.noPastDateValidator()]],
      dias: [null, [Validators.required, Validators.min(0.5)]],
      comentario: ['']
    });
  }

  // Convierte Date a YYYY-MM-DD en hora local
  private formatLocalDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Validator: permite HOY, bloquea SOLO fechas anteriores a hoy
  private noPastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value; // 'YYYY-MM-DD'
      if (!value) return null;

      const [y, m, d] = value.split('-').map(Number);
      const selected = new Date(y, m - 1, d);
      selected.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Solo invalida si es estrictamente menor (hoy es válido)
      return selected < today ? { pastDate: true } : null;
    };
  }

  get maxDias(): number {
    return this.beneficio?.days ?? 0;
  }

  get diasDisponibles(): number[] {
    if (!this.beneficio || this.beneficio.days <= 0) return [];

    const dias: number[] = [];
    const total = this.beneficio.days;

    // Si tiene medio día
    if (total % 1 !== 0) {
      dias.push(0.5);
    }

    // Días completos
    for (let i = 1; i <= Math.floor(total); i++) {
      dias.push(i);
    }

    return dias;
  }

  onCerrar() {
    this.form.reset();
    this.cerrar.emit();
  }

  onConfirmar() {
    // Si está inválido, muestra mensaje y marca campos en rojo
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      if (this.form.get('fecha')?.errors?.['pastDate']) {
        this.notify.error('No se puede elegir fechas pasadas');
      } else {
        this.notify.error('Debes completar toda la información obligatoria para confirmar la solicitud');
      }
      return;
    }

    this.confirmar.emit({
      ...this.form.value,
      beneficio: this.beneficio,
    });

    this.form.reset();
    this.cerrar.emit(); // cierra el modal al confirmar
  }
}
