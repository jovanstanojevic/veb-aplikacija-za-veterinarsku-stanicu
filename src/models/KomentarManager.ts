export class KomentarManager {
  static sortirajPoDatumu<T extends { datum: string }>(
    komentari: T[],
    najnoviji: boolean
  ): T[] {
    return [...komentari].sort((a, b) => {
      const datumA = new Date(a.datum).getTime();
      const datumB = new Date(b.datum).getTime();

      return najnoviji
        ? datumB - datumA
        : datumA - datumB;
    });
  }

  static formatDatum(datum: string): string {
    const [godina, mesec, dan] = datum.split("-");
    return `${dan}.${mesec}.${godina}.`;
  }
}