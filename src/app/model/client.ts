import { LocalDate, LocalDateTime } from '@js-joda/core';
import { Paiement } from '../model/paiement';
import { Agence } from '../model/agence';

export interface Client {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  montant: number;
  typeClient: TypeClient;
  seancesPratiques: LocalDateTime[];
  seancesTheoriques: LocalDateTime[];
  dateNaissance: LocalDate;
  lieuNaissance: string;
  adresse: string;
  telephone: string;
  email: string;
  dateInscription: LocalDate;
  prixTotal: number;
  paiements: Paiement[];
  agence: Agence;
  listeAttente: boolean;
}

export enum TypeClient {
  TYPE1 = 'TYPE1',
  TYPE2 = 'TYPE2'
}
