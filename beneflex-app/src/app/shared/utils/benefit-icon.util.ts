function normalize(text: string): string {
  return (text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function benefitIconSrc(benefitName: string): string | null {
  const n = normalize(benefitName);

  // OJO: el orden importa (primero los más específicos)
  if (n.includes('vacacion')) return 'assets/benefits/Vacaciones.png';
  if (n.includes('cumple')) return 'assets/benefits/DiaCumpleaños.png';
  if (n.includes('prepara') || n.includes('prepara tu viaje') || (n.includes('viaje') && n.includes('prepara'))) {
    return 'assets/benefits/DiaPreparaTuViaje.png';
  }
  if (n.includes('medio') && n.includes('diligenc')) return 'assets/benefits/MedioDiaDiligencia.png';
  if (n.includes('medio') && n.includes('free')) return 'assets/benefits/MedioDiaFree.png';
  if (n.includes('medio') && n.includes('flex')) return 'assets/benefits/MedioDiaFlex.png';
  if (n.includes('familia')) return 'assets/benefits/DiaFamilia.png';
  if (n.includes('flex')) return 'assets/benefits/DiaFlex.png';

  return null;
}
