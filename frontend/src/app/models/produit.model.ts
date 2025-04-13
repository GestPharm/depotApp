import { Transaction } from "./transaction.model";

export class Produit {

    id: number | undefined;
    dci: string | undefined;
    dosage: string | undefined;
    forme: string | undefined;
    reference: string | undefined;
    quantite: number | undefined;
    prix: number | undefined;
    seuilAlerte: number | undefined;



    constructor({
        id,
        dci,
        dosage,
        forme,
        reference,
        quantite,
        prix,
        seuilAlerte
    }: {
        id?: number | undefined;
        dci?: string | undefined;
        dosage?: string | undefined;
        forme?: string | undefined;
        reference?: string | undefined;
        quantite?: number | undefined;
        prix?: number | undefined;
        seuilAlerte?: number | undefined;

    }) {
      this.id = id;
      this.dci = dci;
      this.dosage = dosage;
      this.forme = forme;
      this.reference = reference;
      this.quantite = quantite;
      this.prix = prix;
      this.seuilAlerte = seuilAlerte;


    }
}
