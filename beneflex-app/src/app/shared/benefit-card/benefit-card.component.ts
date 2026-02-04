import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-benefit-card',
  standalone: false,
  templateUrl: './benefit-card.component.html',
  styleUrl: './benefit-card.component.css'
})
export class BenefitCardComponent {
  /** Ruta del icono (ej: assets/benefits/Vacaciones.png). */
  @Input() iconSrc: string | null = null;

  @Input() title!: string;
  @Input() days!: number;

  @Output() solicitar = new EventEmitter<void>();

  onSolicitar() {
    this.solicitar.emit();
  }
}
