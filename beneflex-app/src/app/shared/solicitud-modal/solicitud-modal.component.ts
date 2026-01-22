import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficio } from '../../core/models/beneficio.model';
import { BeneficioCard } from '../../core/models/beneficio-card.model';

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

  constructor(private fb: FormBuilder) { }

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
  }
}
