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
    if (this.form.invalid) return;

    this.confirmar.emit({
      ...this.form.value,
      beneficio: this.beneficio
    });

    this.form.reset();
  }*/ // Wilson


  import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { BeneficioCard } from '../../core/models/beneficio-card.model';
  import { NotificationService } from '../services/notification.service';

  @Component({
    selector: 'app-solicitud-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './solicitud-modal.component.html',
    styleUrls: ['./solicitud-modal.component.css'],
  })
  export class SolicitudModalComponent implements OnInit {
    @Input() beneficio!: BeneficioCard | null;
    @Input() visible = false;

    @Output() cerrar = new EventEmitter<void>();
    @Output() confirmar = new EventEmitter<any>();

    form!: FormGroup;

    constructor(private fb: FormBuilder, private notify: NotificationService) {}

    ngOnInit() {
      // ✅ Solo FECHA y DIAS obligatorios. Comentario NO.
      this.form = this.fb.group({
        fecha: ['', Validators.required],
        dias: [null, Validators.required],
        comentario: [''],
      });
    }

    onCerrar() {
      this.form.reset();
      this.cerrar.emit();
    }

    onConfirmar() {
      // ✅ Si está inválido, muestra mensaje y marca campos en rojo
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
      this.cerrar.emit(); // ✅ cierra el modal al confirmar
    }
  }
