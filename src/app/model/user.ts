import { Agence } from "./agence";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  agence: Agence; 
}