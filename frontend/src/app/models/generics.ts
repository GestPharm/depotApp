import { environment } from '../../environments/environment';

export class Generic {

}

export enum Sexe { HOMME, FEMME }

export interface ListIem {
    value: string;
    viewValue: string;
  }

  export const GenericConstants= {
    'BACKEND_HOST_URL':   environment.baseUrl
    //'BACKEND_HOST_URL': 'http://192.168.1.40:8080/tailorApp'

  }


  export enum TransactionType {
    entree = "Entrée",
    sortie = "Vente",
    retour = "Retour",


  }


