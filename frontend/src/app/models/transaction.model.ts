import { LigneProduit } from "./ligneProduit.model";
import { Poste } from "./poste.model";
import { Produit } from "./produit.model";

export class Transaction {

    id: number | undefined;
    quantite: number | undefined;
    type: string | undefined;
    dateTransaction: Date | undefined;
    ligneProduits: LigneProduit[] | undefined;
    poste: Poste | undefined;
    prixTotal: number | undefined;


    constructor({
        id,
        quantite,
        type,
        dateTransaction,
        ligneProduits,
        poste,
        prixTotal
    }: {
        id?: number | undefined;
        quantite?: number | undefined;
        type?: string | undefined;
        dateTransaction?: Date | undefined;
        ligneProduits?: LigneProduit[] | undefined;
        poste?: Poste | undefined;
        prixTotal?: number | undefined;
    }) {
      this.id = id;
      this.quantite = quantite;
      this.type = type;
      this.dateTransaction = dateTransaction;
      this.ligneProduits = ligneProduits;
      this.poste = poste;
      this.prixTotal = prixTotal;

    }
}
