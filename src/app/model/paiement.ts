import { LocalDate } from '@js-joda/core';

export interface Paiement {
  id: number;
  montant: number;
  datePaiement: LocalDate;
  modePaiement: string;
}
