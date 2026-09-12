export interface IValidator {
  validanTekst(tekst: string): boolean;
}

export const validator: IValidator = {
  validanTekst(tekst: string): boolean {
    return tekst.trim().length >= 2;
  },
};