export interface PaiementWithClientInfo {
    id: number;
    clientId: number;
    clientNom: string;
    clientPrenom: string;
    clientCin: string;
    heurePaiement: string;
    montant: number;
  }