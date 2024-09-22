// export interface ClientProbable {
//   id: number;
//   fullName: string;
//   phoneNumber: string;
//   categorieDemandee: string;
//   dateVisite: string; 
//   heureVisite: string;
//   commentaire: string;
// }

export class ClientProbable {
  id?: number;  // Optional for new clients
  fullName: string = '';
  phoneNumber: string = '';
  categorieDemandee: string = '';
  dateVisite: Date = new Date();
  heureVisite: string = '';
  commentaire: string = '';
}
