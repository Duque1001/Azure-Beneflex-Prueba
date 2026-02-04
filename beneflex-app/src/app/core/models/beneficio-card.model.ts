export interface BeneficioCard {
  id: number;
  title: string;
  days: number;
  usedDays?: number;

  iconSrc: string | null;
}
