import { PaiementWithClientInfo } from "./PaiementWithClientInfo";

export interface EtatDeCaisseResponse {
    id: number;
    date: string;
    montantTotal: number;
    status: string;
    paiements: PaiementWithClientInfo[];
    agence: {
        intituleAgence: string;
        villeAgence: string;
      };
  }