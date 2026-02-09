/*import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
  styleUrls: ['./solicitud-modal.component.css']
})
export class SolicitudModalComponent implements OnInit {

  @Input() beneficio!: BeneficioCard | null;
  @Input() visible = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() confirmar = new EventEmitter<any>();

  form!: FormGroup;

  // minDate en formato YYYY-MM-DD (hoy)
  minDate = this.formatLocalDate(new Date());

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // Agregamos validador de día hábil + no fechas pasadas
      fecha: ['', [Validators.required, this.noPastDateValidator(), this.businessDayValidator()]],
      dias: [null, [Validators.required, Validators.min(0.5)]],
      comentario: ['']
    });

    // Cuando cambia la fecha, si es sábado/domingo limpiamos y mostramos mensaje
    this.form.get('fecha')?.valueChanges.subscribe((value) => {
      if (!value) return;

      // value viene como 'YYYY-MM-DD'
      const selected = this.parseLocalDate(value);
      if (!selected) return;

      const day = selected.getDay(); // 0=domingo, 6=sábado
      if (day === 0 || day === 6) {
        // Limpia el valor y marca touched para que aparezca el error rojo
        this.form.get('fecha')?.setValue('', { emitEvent: false });
        this.form.get('fecha')?.markAsTouched();
        this.form.get('fecha')?.updateValueAndValidity();

        this.notify.error('Debe seleccionar un día laboral hábil');
      }
    });
  }

  // Convierte Date a YYYY-MM-DD en hora local
  private formatLocalDate(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Convierte 'YYYY-MM-DD' a Date local (00:00)
  private parseLocalDate(value: string): Date | null {
    const parts = value.split('-').map(Number);
    if (parts.length !== 3) return null;
    const [y, m, d] = parts;
    const date = new Date(y, m - 1, d);
    date.setHours(0, 0, 0, 0);
    return isNaN(date.getTime()) ? null : date;
  }

  // permite HOY, bloquea SOLO fechas anteriores a hoy
  private noPastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value; // 'YYYY-MM-DD'
      if (!value) return null;

      const selected = this.parseLocalDate(value);
      if (!selected) return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selected < today ? { pastDate: true } : null;
    };
  }

  // bloquea sábado/domingo
  private businessDayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value; // 'YYYY-MM-DD'
      if (!value) return null;

      const selected = this.parseLocalDate(value);
      if (!selected) return null;

      const day = selected.getDay(); // 0=domingo, 6=sábado
      return (day === 0 || day === 6) ? { notBusinessDay: true } : null;
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
    // Marca todo para que salgan mensajes rojos
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      // Mensajes específicos
      if (this.form.get('fecha')?.errors?.['pastDate']) {
        this.notify.error('No se puede elegir fechas pasadas');
      } else if (this.form.get('fecha')?.errors?.['notBusinessDay']) {
        this.notify.error('Debe seleccionar un día laboral hábil');
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

