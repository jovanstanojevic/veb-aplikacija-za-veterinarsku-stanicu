export class TerminManager {
  static formatDatum(datum: string): string {
    const [godina, mesec, dan] = datum.split("-");
    return `${dan}.${mesec}.${godina}.`;
  }

  static terminJeZauzet(
    termini: { datum: string; vreme: string }[],
    datum: string,
    vreme: string
  ): boolean {
    return termini.some(
      (termin) =>
        termin.datum === datum &&
        termin.vreme === vreme
    );
  }
}